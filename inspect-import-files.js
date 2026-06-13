const fs = require("fs");

function decodeXml(value = "") {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function sharedStrings(base) {
  const file = `${base}/xl/sharedStrings.xml`;
  if (!fs.existsSync(file)) return [];
  const xml = fs.readFileSync(file, "utf8");
  return xml
    .split("<si>")
    .slice(1)
    .map((part) => {
      const si = part.split("</si>")[0];
      const pieces = si.match(/<t[^>]*>[\s\S]*?<\/t>/g) || [];
      return decodeXml(pieces.map((piece) => piece.replace(/^<t[^>]*>/, "").replace(/<\/t>$/, "")).join(""));
    });
}

function colIndex(ref) {
  const letters = (ref.match(/[A-Z]+/) || [""])[0];
  let value = 0;
  for (const letter of letters) value = value * 26 + letter.charCodeAt(0) - 64;
  return value - 1;
}

function readRows(base, limit = 15) {
  const strings = sharedStrings(base);
  const xml = fs.readFileSync(`${base}/xl/worksheets/sheet1.xml`, "utf8");
  const rows = [];
  for (const part of xml.split("<row").slice(1, limit + 1)) {
    const body = part.split("</row>")[0];
    const row = [];
    for (const cell of body.split("<c ").slice(1)) {
      const ref = (cell.match(/r="([A-Z]+\d+)"/) || [])[1];
      if (!ref) continue;
      const type = (cell.match(/t="([^"]+)"/) || [])[1];
      const raw = (cell.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
      const inline = (cell.match(/<t[^>]*>([\s\S]*?)<\/t>/) || [])[1];
      row[colIndex(ref)] = type === "s" ? strings[Number(raw)] || "" : decodeXml(inline ?? raw ?? "");
    }
    rows.push(row);
  }
  return rows;
}

for (const [name, base] of [
  ["population", "import_population_unpacked"],
  ["screening", "import_screening_unpacked"],
]) {
  const workbook = fs.readFileSync(`${base}/xl/workbook.xml`, "utf8");
  const sheets = workbook.match(/<sheet[^>]+/g) || [];
  console.log(`\n=== ${name} ===`);
  console.log(JSON.stringify({ sheets, rows: readRows(base) }, null, 2));
}
