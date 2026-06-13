const { meta } = window.SRR7_DATA;
let population = window.SRR7_DATA.population;
let records = window.SRR7_DATA.records;
let unscreened = window.SRR7_DATA.unscreened || [];
const villages = Array.from({ length: 12 }, (_, i) => String(i + 1));
const villageNames = {
  "1": "หมู่ 1 บ้านหัวสนาม",
  "2": "หมู่ 2 บ้านคำเจริญ",
  "3": "หมู่ 3 บ้านชัยศรี",
  "4": "หมู่ 4 บ้านนาดี",
  "5": "หมู่ 5 บ้านห้วยยาง",
  "6": "หมู่ 6 บ้านห้วยม่วง",
  "7": "หมู่ 7 บ้านคำใหญ่",
  "8": "หมู่ 8 บ้านคำถาวร",
  "9": "หมู่ 9 บ้านโพธิ์ทอง",
  "10": "หมู่ 10 บ้านโคกป่ากุง",
  "11": "หมู่ 11 บ้านคำใหญ่",
  "12": "หมู่ 12 บ้านคำเจริญ",
};
const resignedVhvs = new Set(["เจริญ สิทธิจันทร์", "เจริญ สิทธิ์จันทร์", "วิจัย เหล่าลาภะ", "บุญเรือง ศรีทองราช", "อุลา กันกำแหง", "ประยูร ทินแสง"]);
const canonicalVhvNames = new Map([["กรรณธร แสนกั้ง", "กรรณธร แสนกั้ง"]]);
const vhvVillageAssignments = new Map([["กรรณธร แสนกั้ง", "12"]]);
const colors = {
  normal: "#117553",
  risk: "#c9842b",
  dm: "#c54949",
  ht: "#376eb8",
  both: "#7a54c4",
  screened: "#128b96",
  waist: "#00aeca",
  amber: "#f1a51d",
};

const els = {
  sourceInfo: document.querySelector("#sourceInfo"),
  totalRecords: document.querySelector("#totalRecords"),
  populationTotal: document.querySelector("#populationTotal"),
  rangeMode: document.querySelector("#rangeMode"),
  startDate: document.querySelector("#startDate"),
  endDate: document.querySelector("#endDate"),
  populationImport: document.querySelector("#populationImport"),
  populationImportStatus: document.querySelector("#populationImportStatus"),
  screeningImport: document.querySelector("#screeningImport"),
  importStatus: document.querySelector("#importStatus"),
  importPanel: document.querySelector("#import"),
  importNav: document.querySelector("#importNav"),
  importControl: document.querySelector("#importControl"),
  importLockedNotice: document.querySelector("#importLockedNotice"),
  villageFilter: document.querySelector("#villageFilter"),
  mapVillageFilter: document.querySelector("#mapVillageFilter"),
  mapVolunteerFilter: document.querySelector("#mapVolunteerFilter"),
  householdMapCanvas: document.querySelector("#householdMapCanvas"),
  mapVolunteerLegend: document.querySelector("#mapVolunteerLegend"),
  householdMapStats: document.querySelector("#householdMapStats"),
  vhvRegistryTotal: document.querySelector("#vhvRegistryTotal"),
  vhvRegistryVillageFilter: document.querySelector("#vhvRegistryVillageFilter"),
  vhvRegistryRows: document.querySelector("#vhvRegistryRows"),
  activeRange: document.querySelector("#activeRange"),
  execNarrative: document.querySelector("#execNarrative"),
  execCoverage: document.querySelector("#execCoverage"),
  execCoverageDetail: document.querySelector("#execCoverageDetail"),
  execRemaining: document.querySelector("#execRemaining"),
  execRiskLoad: document.querySelector("#execRiskLoad"),
  execRiskDetail: document.querySelector("#execRiskDetail"),
  execBestVillage: document.querySelector("#execBestVillage"),
  execBestDetail: document.querySelector("#execBestDetail"),
  execUrgentVillage: document.querySelector("#execUrgentVillage"),
  execUrgentDetail: document.querySelector("#execUrgentDetail"),
  execUrgentList: document.querySelector("#execUrgentList"),
  boardCoverage: document.querySelector("#boardCoverage"),
  boardCoverageDetail: document.querySelector("#boardCoverageDetail"),
  boardRemaining: document.querySelector("#boardRemaining"),
  boardUrgentVillage: document.querySelector("#boardUrgentVillage"),
  boardUrgentDetail: document.querySelector("#boardUrgentDetail"),
  boardTopWorker: document.querySelector("#boardTopWorker"),
  boardTopWorkerDetail: document.querySelector("#boardTopWorkerDetail"),
  boardRiskLoad: document.querySelector("#boardRiskLoad"),
  boardRiskDetail: document.querySelector("#boardRiskDetail"),
  topVillages: document.querySelector("#topVillages"),
  villageCoverageRows: document.querySelector("#villageCoverageRows"),
  villageRows: document.querySelector("#villageRows"),
  riskTotalPeople: document.querySelector("#riskTotalPeople"),
  riskBmiHigh: document.querySelector("#riskBmiHigh"),
  riskWaistHigh: document.querySelector("#riskWaistHigh"),
  riskDtxHigh: document.querySelector("#riskDtxHigh"),
  riskSmoking: document.querySelector("#riskSmoking"),
  riskAlcohol: document.querySelector("#riskAlcohol"),
  riskSaltHigh: document.querySelector("#riskSaltHigh"),
  riskAnyHigh: document.querySelector("#riskAnyHigh"),
  metabolicRiskRows: document.querySelector("#metabolicRiskRows"),
  bodyAnalysisTotal: document.querySelector("#bodyAnalysisTotal"),
  bodyBmiCount: document.querySelector("#bodyBmiCount"),
  bodyBmiRate: document.querySelector("#bodyBmiRate"),
  bodyWaistCount: document.querySelector("#bodyWaistCount"),
  bodyWaistRate: document.querySelector("#bodyWaistRate"),
  bodyAnalysisRows: document.querySelector("#bodyAnalysisRows"),
  registrySubtitle: document.querySelector("#registrySubtitle"),
  followupSubtitle: document.querySelector("#followupSubtitle"),
  followupVillageFilter: document.querySelector("#followupVillageFilter"),
  followupTotal: document.querySelector("#followupTotal"),
  taskUnscreened: document.querySelector("#taskUnscreened"),
  taskHtRisk: document.querySelector("#taskHtRisk"),
  taskDmRisk: document.querySelector("#taskDmRisk"),
  taskWorkers: document.querySelector("#taskWorkers"),
  followupRows: document.querySelector("#followupRows"),
  qualitySubtitle: document.querySelector("#qualitySubtitle"),
  qualityTotal: document.querySelector("#qualityTotal"),
  qualityDuplicates: document.querySelector("#qualityDuplicates"),
  qualityBadHouse: document.querySelector("#qualityBadHouse"),
  qualityUnmatched: document.querySelector("#qualityUnmatched"),
  qualityNoWorker: document.querySelector("#qualityNoWorker"),
  qualityNoDate: document.querySelector("#qualityNoDate"),
  qualityIssueFilter: document.querySelector("#qualityIssueFilter"),
  qualityRows: document.querySelector("#qualityRows"),
  registryCount: document.querySelector("#registryCount"),
  registryRows: document.querySelector("#registryRows"),
  registryTabs: document.querySelectorAll(".registry-tab"),
  personDialog: document.querySelector("#personDialog"),
  personDialogTitle: document.querySelector("#personDialogTitle"),
  personDialogMeta: document.querySelector("#personDialogMeta"),
  personBp: document.querySelector("#personBp"),
  personBpStatus: document.querySelector("#personBpStatus"),
  personDtx: document.querySelector("#personDtx"),
  personDtxStatus: document.querySelector("#personDtxStatus"),
  personBmi: document.querySelector("#personBmi"),
  personBmiStatus: document.querySelector("#personBmiStatus"),
  personCvd: document.querySelector("#personCvd"),
  personHistoryRows: document.querySelector("#personHistoryRows"),
  measureDate: document.querySelector("#measureDate"),
  measureWeight: document.querySelector("#measureWeight"),
  measureHeight: document.querySelector("#measureHeight"),
  saveMeasure: document.querySelector("#saveMeasure"),
  measureMessage: document.querySelector("#measureMessage"),
  registryLogin: document.querySelector("#registryLogin"),
  registryLoginForm: document.querySelector("#registryLoginForm"),
  registryUsername: document.querySelector("#registryUsername"),
  registryPassword: document.querySelector("#registryPassword"),
  registryContent: document.querySelector("#registryContent"),
  registryActions: document.querySelector(".registry-actions"),
  registryAddressFilter: document.querySelector("#registryAddressFilter"),
  registryVolunteerFilter: document.querySelector("#registryVolunteerFilter"),
  clearRegistryFilters: document.querySelector("#clearRegistryFilters"),
  exportRegistry: document.querySelector("#exportRegistry"),
  exportVillageSheets: document.querySelector("#exportVillageSheets"),
  exportMeetingPack: document.querySelector("#exportMeetingPack"),
  printRegistry: document.querySelector("#printRegistry"),
  printFieldForm: document.querySelector("#printFieldForm"),
  logoutRegistry: document.querySelector("#logoutRegistry"),
  loginMessage: document.querySelector("#loginMessage"),
};

const REGISTRY_AUTH = { username: "admin", password: "srr7@2569" };
const FOLLOW_STATUSES = ["", "นัดแล้ว", "ไม่อยู่บ้าน", "ย้าย", "ปฏิเสธ", "คัดกรองแล้วรอนำเข้า"];
let charts = {};
let activeRegistry = "htRisk";
let registryUnlocked = sessionStorage.getItem("srr7-registry-auth") === "ok";
let selectedPersonKey = "";
let personCharts = {};
let currentRegistryRows = [];

Chart.defaults.font.family = '"Noto Sans Thai", "Segoe UI", Tahoma, sans-serif';
Chart.defaults.color = "#52615a";
Chart.defaults.plugins.tooltip.backgroundColor = "#10251f";
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 10;

function fmt(n) {
  return Number(n || 0).toLocaleString("th-TH");
}

function fmtDecimal(n, digits = 1) {
  return Number.isFinite(Number(n)) ? Number(n).toLocaleString("th-TH", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-";
}

function number(value) {
  const n = Number(String(value ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : null;
}

function village(value) {
  const text = String(value || "").trim();
  const n = Number(text);
  return Number.isFinite(n) && n > 0 ? String(n) : text;
}

function cleanName(value) {
  return String(value || "")
    .replace(/[.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function personKey(record) {
  return [cleanName(record.name), village(record.village), String(record.houseNo || "").replace(/,/g, "").trim()].join("|");
}

function keyToId(key) {
  return btoa(unescape(encodeURIComponent(key))).replace(/=+$/g, "");
}

function idToKey(id) {
  return decodeURIComponent(escape(atob(id)));
}

function parseThaiDateText(value) {
  if (!value) return null;
  const monthMap = {
    "ม.ค.": 1,
    "ก.พ.": 2,
    "มี.ค.": 3,
    "เม.ย.": 4,
    "พ.ค.": 5,
    "มิ.ย.": 6,
    "ก.ค.": 7,
    "ส.ค.": 8,
    "ก.ย.": 9,
    "ต.ค.": 10,
    "พ.ย.": 11,
    "ธ.ค.": 12,
  };
  const match = String(value).trim().match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = monthMap[match[2]];
  const year = Number(match[3]) - 543;
  if (!day || !month || !year) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDate(value) {
  return value ? new Date(`${value}T00:00:00+07:00`) : null;
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

function todayBangkok() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
}

function fiscalBounds(now = todayBangkok()) {
  const year = now.getMonth() + 1 >= 10 ? now.getFullYear() : now.getFullYear() - 1;
  return [new Date(year, 9, 1), new Date(year + 1, 8, 30)];
}

function weekBounds(now = todayBangkok()) {
  const start = new Date(now);
  const day = start.getDay() || 7;
  start.setDate(start.getDate() - day + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return [start, end];
}

function monthBounds(now = todayBangkok()) {
  return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)];
}

function currentRange() {
  const mode = els.rangeMode.value;
  const now = todayBangkok();
  if (mode === "all") return [null, null, "ทั้งหมด"];
  if (mode === "today") return [new Date(now.getFullYear(), now.getMonth(), now.getDate()), new Date(now.getFullYear(), now.getMonth(), now.getDate()), "วันนี้"];
  if (mode === "week") return [...weekBounds(now), "สัปดาห์นี้"];
  if (mode === "month") return [...monthBounds(now), "เดือนนี้"];
  if (mode === "fiscal") return [...fiscalBounds(now), "ปีงบประมาณ"];
  return [parseDate(els.startDate.value), parseDate(els.endDate.value), "กำหนดเอง"];
}

function inRange(record, start, end) {
  const date = parseDate(record.screenedDate);
  if (!date) return false;
  if (start && date < start) return false;
  if (end && date > end) return false;
  return true;
}

function currentVillage() {
  return els.villageFilter.value;
}

function filteredPopulation() {
  const village = currentVillage();
  return population.filter((record) => village === "all" || record.village === village);
}

function filteredRecords() {
  const [start, end] = currentRange();
  const village = currentVillage();
  return records.filter((record) => {
    if (village !== "all" && record.village !== village) return false;
    return inRange(record, start, end);
  });
}

function blankCounts() {
  return { target: 0, screened: 0, matchedScreened: 0, normal: 0, risk: 0, dm: 0, ht: 0, both: 0, controlled: 0, uncontrolled: 0 };
}

function summarize(screenedList, populationList) {
  const total = blankCounts();
  const byVillage = Object.fromEntries(villages.map((v) => [v, blankCounts()]));

  for (const person of populationList) {
    if (!byVillage[person.village]) continue;
    byVillage[person.village].target += 1;
    total.target += 1;
  }

  for (const record of screenedList) {
    const bucket = byVillage[record.village];
    if (!bucket) continue;
    bucket.screened += 1;
    total.screened += 1;
    if (record.populationId) bucket.matchedScreened += 1, total.matchedScreened += 1;
    if (record.group === "ปกติ") bucket.normal += 1, total.normal += 1;
    if (record.group === "เสี่ยง") bucket.risk += 1, total.risk += 1;
    if (record.group === "DM") bucket.dm += 1, total.dm += 1;
    if (record.group === "HT") bucket.ht += 1, total.ht += 1;
    if (record.group === "DM+HT") bucket.both += 1, total.both += 1;
    if (record.control === "ควบคุมได้") bucket.controlled += 1, total.controlled += 1;
    if (record.control === "ควบคุมไม่ได้") bucket.uncontrolled += 1, total.uncontrolled += 1;
  }
  return { total, byVillage };
}

function updateKpis(total) {
  document.querySelector("#kpiScreened").textContent = fmt(total.screened);
  document.querySelector("#kpiUnscreened").textContent = fmt(Math.max(total.target - total.matchedScreened, 0));
  document.querySelector("#kpiNormal").textContent = fmt(total.normal);
  document.querySelector("#kpiRisk").textContent = fmt(total.risk);
  document.querySelector("#kpiDm").textContent = fmt(total.dm);
  document.querySelector("#kpiHt").textContent = fmt(total.ht);
  document.querySelector("#kpiBoth").textContent = fmt(total.both);
  document.querySelector("#kpiControlled").textContent = fmt(total.controlled);
  document.querySelector("#kpiUncontrolled").textContent = fmt(total.uncontrolled);
}

function updateExecutiveSummary(total, byVillage) {
  const screened = total.matchedScreened;
  const target = total.target;
  const remaining = Math.max(target - screened, 0);
  const coverage = target ? (screened / target) * 100 : 0;
  const riskLoad = total.risk + total.dm + total.ht + total.both + total.uncontrolled;
  const riskRate = total.screened ? (riskLoad / total.screened) * 100 : 0;
  const villageLabel = currentVillage() === "all" ? "ตำบลคำใหญ่" : `หมู่ ${currentVillage()} ตำบลคำใหญ่`;
  const villageStats = villages
    .map((v) => {
      const c = byVillage[v];
      const villageRemaining = Math.max(c.target - c.matchedScreened, 0);
      const villageCoverage = c.target ? (c.matchedScreened / c.target) * 100 : 0;
      return { village: v, target: c.target, screened: c.matchedScreened, remaining: villageRemaining, coverage: villageCoverage };
    })
    .filter((item) => item.target > 0);
  const urgent = villageStats
    .slice()
    .sort((a, b) => b.remaining - a.remaining || a.coverage - b.coverage)
    .slice(0, 3);
  const best = villageStats.slice().sort((a, b) => b.coverage - a.coverage || b.screened - a.screened)[0];
  const primaryUrgent = urgent[0];

  els.execCoverage.textContent = `${coverage.toFixed(1)}%`;
  els.execCoverageDetail.textContent = `${fmt(screened)} จาก ${fmt(target)} คน`;
  els.execRemaining.textContent = fmt(remaining);
  els.execRiskLoad.textContent = fmt(riskLoad);
  els.execRiskDetail.textContent = `${riskRate.toFixed(1)}% ของผู้คัดกรอง`;
  els.execBestVillage.textContent = best ? `หมู่ ${best.village}` : "-";
  els.execBestDetail.textContent = best ? `คัดกรอง ${best.coverage.toFixed(1)}% | ${fmt(best.screened)} คน` : "-";
  els.execUrgentVillage.textContent = primaryUrgent ? `หมู่ ${primaryUrgent.village}` : "-";
  els.execUrgentDetail.textContent = primaryUrgent
    ? `เหลือ ${fmt(primaryUrgent.remaining)} คน | คัดกรอง ${primaryUrgent.coverage.toFixed(1)}%`
    : "-";
  els.execNarrative.textContent = `${villageLabel} คัดกรองแล้ว ${coverage.toFixed(1)}% เหลือผู้ที่ต้องติดตาม ${fmt(remaining)} คน และมีกลุ่มเสี่ยง/ป่วยที่ควรติดตาม ${fmt(riskLoad)} ราย`;
  els.execUrgentList.innerHTML = urgent.length
    ? urgent
        .map(
          (item, index) => `<div class="urgent-pill">
            <span>${index + 1}. หมู่ ${item.village}</span>
            <small>เหลือ ${fmt(item.remaining)} คน</small>
          </div>`
        )
        .join("")
    : `<div class="urgent-pill"><span>ไม่มีข้อมูล</span><small>-</small></div>`;
}

function topWorkerFrom(screenedList) {
  const counts = new Map();
  for (const record of screenedList) {
    const worker = workerName(record).trim();
    if (!worker) continue;
    if (!counts.has(worker)) counts.set(worker, { worker, count: 0, villages: new Set() });
    const item = counts.get(worker);
    item.count += 1;
    if (record.village) item.villages.add(record.village);
  }
  return Array.from(counts.values()).sort((a, b) => b.count - a.count || a.worker.localeCompare(b.worker, "th"))[0] || null;
}

function updateExecutiveBoard(total, byVillage, screenedList) {
  const screened = total.matchedScreened;
  const target = total.target;
  const remaining = Math.max(target - screened, 0);
  const coverage = target ? (screened / target) * 100 : 0;
  const riskLoad = total.risk + total.dm + total.ht + total.both + total.uncontrolled;
  const urgent = villages
    .map((v) => {
      const c = byVillage[v];
      const villageRemaining = Math.max(c.target - c.matchedScreened, 0);
      const villageCoverage = c.target ? (c.matchedScreened / c.target) * 100 : 0;
      return { village: v, target: c.target, screened: c.matchedScreened, remaining: villageRemaining, coverage: villageCoverage };
    })
    .filter((item) => item.target > 0)
    .sort((a, b) => b.remaining - a.remaining || a.coverage - b.coverage)[0];
  const topWorker = topWorkerFrom(screenedList);

  els.boardCoverage.textContent = `${coverage.toFixed(1)}%`;
  els.boardCoverageDetail.textContent = `${fmt(screened)} จาก ${fmt(target)} คน`;
  els.boardRemaining.textContent = fmt(remaining);
  els.boardUrgentVillage.textContent = urgent ? `หมู่ ${urgent.village}` : "-";
  els.boardUrgentDetail.textContent = urgent ? `เหลือ ${fmt(urgent.remaining)} คน | ${urgent.coverage.toFixed(1)}%` : "-";
  els.boardTopWorker.textContent = topWorker ? topWorker.worker : "-";
  els.boardTopWorkerDetail.textContent = topWorker ? `${fmt(topWorker.count)} ราย | ${Array.from(topWorker.villages).sort((a, b) => Number(a) - Number(b)).map((v) => `หมู่ ${v}`).join(", ")}` : "-";
  els.boardRiskLoad.textContent = fmt(riskLoad);
  els.boardRiskDetail.textContent = `เสี่ยง ${fmt(total.risk)} | DM/HT ${fmt(total.dm + total.ht + total.both)} | ควบคุมไม่ได้ ${fmt(total.uncontrolled)}`;
}

function updateTable(byVillage) {
  els.villageRows.innerHTML = villages
    .map((v) => {
      const c = byVillage[v];
      const percent = c.target ? (c.matchedScreened / c.target) * 100 : 0;
      const level = coverageLevel(percent);
      return `<tr>
        <td>หมู่ ${v}</td>
        <td>${fmt(c.target)}</td>
        <td>${fmt(c.screened)}</td>
        <td>
          <div class="coverage-cell summary-coverage">
            <strong>${percent.toFixed(1)}%</strong>
            <span class="coverage-track"><span style="width: ${Math.min(percent, 100).toFixed(1)}%"></span></span>
            <span class="coverage-badge ${level.tone}">${level.text}</span>
          </div>
        </td>
        <td>${fmt(Math.max(c.target - c.matchedScreened, 0))}</td>
        <td>${fmt(c.normal)}</td>
        <td>${fmt(c.risk)}</td>
        <td>${fmt(c.dm)}</td>
        <td>${fmt(c.ht)}</td>
        <td>${fmt(c.both)}</td>
        <td>${fmt(c.controlled)}</td>
        <td>${fmt(c.uncontrolled)}</td>
      </tr>`;
    })
    .join("");
}

function latestScreenedPeople(list) {
  const latest = new Map();
  list.forEach((record, index) => {
    const key = personKey(record) || `${record.name || "-"}|${record.village || "-"}|${index}`;
    const current = latest.get(key);
    const date = record.screenedDate || "";
    const currentDate = current?.screenedDate || "";
    if (!current || date > currentDate || (!date && !currentDate && index > current.index)) {
      latest.set(key, { ...record, index });
    }
  });
  return Array.from(latest.values());
}

function isBmiHigh(record) {
  return record.bmi != null && record.bmi >= 25;
}

function isWaistHigh(record) {
  if (record.waist == null) return false;
  const sex = String(record.sex || "");
  if (sex.includes("ชาย")) return record.waist >= 36;
  if (sex.includes("หญิง")) return record.waist >= 32;
  return record.waist >= 35;
}

function isDtxHigh(record) {
  return record.dtx != null && record.dtx >= 100;
}

function hasRiskBehavior(value, keywords) {
  const text = String(value || "").trim().toLowerCase();
  if (!text || text === "-" || text === "0") return false;
  if (["ไม่", "ไม่สูบ", "ไม่ดื่ม", "ไม่มี", "no", "none"].some((word) => text === word || text.startsWith(word))) return false;
  return ["ใช่", "1", "yes", "y", ...keywords].some((word) => text.includes(word));
}

function isSmokingRisk(record) {
  return hasRiskBehavior(record.smoking, ["สูบ", "บุหรี่", "ยาสูบ", "smoke"]);
}

function isAlcoholRisk(record) {
  return hasRiskBehavior(record.alcohol, ["ดื่ม", "สุรา", "แอลกอฮอล์", "เหล้า", "alcohol"]);
}

function isSaltRisk(record) {
  const text = String(record.saltLevel || record.salt || "").trim().toLowerCase();
  if (!text || text === "-" || text === "0") return false;
  if (["ไม่", "ไม่เค็ม", "จืด", "ต่ำ", "น้อย", "low", "normal"].some((word) => text === word || text.startsWith(word))) return false;
  return ["เค็ม", "เกลือ", "โซเดียม", "ปานกลาง", "สูง", "มาก", "salt", "sodium", "high"].some((word) => text.includes(word));
}

function blankRiskCounts() {
  return { screened: 0, bmiHigh: 0, waistHigh: 0, dtxHigh: 0, smoking: 0, alcohol: 0, saltHigh: 0, anyHigh: 0 };
}

function metabolicRiskByVillage(screenedList) {
  const people = latestScreenedPeople(screenedList);
  const byVillage = Object.fromEntries(villages.map((v) => [v, blankRiskCounts()]));
  const total = blankRiskCounts();

  people.forEach((record) => {
    const bucket = byVillage[record.village];
    if (!bucket) return;
    const bmiHigh = isBmiHigh(record);
    const waistHigh = isWaistHigh(record);
    const dtxHigh = isDtxHigh(record);
    const smoking = isSmokingRisk(record);
    const alcohol = isAlcoholRisk(record);
    const saltHigh = isSaltRisk(record);
    bucket.screened += 1;
    total.screened += 1;
    if (bmiHigh) bucket.bmiHigh += 1, total.bmiHigh += 1;
    if (waistHigh) bucket.waistHigh += 1, total.waistHigh += 1;
    if (dtxHigh) bucket.dtxHigh += 1, total.dtxHigh += 1;
    if (smoking) bucket.smoking += 1, total.smoking += 1;
    if (alcohol) bucket.alcohol += 1, total.alcohol += 1;
    if (saltHigh) bucket.saltHigh += 1, total.saltHigh += 1;
    if (bmiHigh || waistHigh || dtxHigh || smoking || alcohol || saltHigh) bucket.anyHigh += 1, total.anyHigh += 1;
  });

  return { total, byVillage, people };
}

function mainRiskLabel(row) {
  const risks = [
    { label: "DTX", value: row.dtxHigh },
    { label: "BMI", value: row.bmiHigh },
    { label: "รอบเอว", value: row.waistHigh },
    { label: "ยาสูบ", value: row.smoking },
    { label: "สุรา", value: row.alcohol },
    { label: "อาหารเค็ม", value: row.saltHigh },
  ].sort((a, b) => b.value - a.value);
  return risks[0].value ? `${risks[0].label} (${fmt(risks[0].value)} คน)` : "-";
}

function updateMetabolicRiskDashboard(screenedList) {
  const { total, byVillage } = metabolicRiskByVillage(screenedList);
  els.riskTotalPeople.textContent = `${fmt(total.screened)} คน`;
  els.riskBmiHigh.textContent = fmt(total.bmiHigh);
  els.riskWaistHigh.textContent = fmt(total.waistHigh);
  els.riskDtxHigh.textContent = fmt(total.dtxHigh);
  els.riskSmoking.textContent = fmt(total.smoking);
  els.riskAlcohol.textContent = fmt(total.alcohol);
  els.riskSaltHigh.textContent = fmt(total.saltHigh);
  els.riskAnyHigh.textContent = fmt(total.anyHigh);

  els.metabolicRiskRows.innerHTML = villages
    .map((v) => {
      const row = byVillage[v];
      return `<tr>
        <td>หมู่ ${v}</td>
        <td>${fmt(row.screened)}</td>
        <td>${fmt(row.bmiHigh)}</td>
        <td>${fmt(row.waistHigh)}</td>
        <td>${fmt(row.dtxHigh)}</td>
        <td>${fmt(row.smoking)}</td>
        <td>${fmt(row.alcohol)}</td>
        <td>${fmt(row.saltHigh)}</td>
        <td>${fmt(row.anyHigh)}</td>
        <td><span class="status-badge ${row.anyHigh ? "warning" : "success"}">${escapeHtml(mainRiskLabel(row))}</span></td>
      </tr>`;
    })
    .join("");

  return { total, byVillage };
}

function bodyAnalysisNote(row) {
  const bmiRate = row.screened ? (row.bmiHigh / row.screened) * 100 : 0;
  const waistRate = row.screened ? (row.waistHigh / row.screened) * 100 : 0;
  if (!row.screened) return { text: "ยังไม่มีข้อมูลคัดกรอง", tone: "neutral" };
  if (bmiRate >= 30 && waistRate >= 30) return { text: "เร่งกิจกรรมลดน้ำหนักและลดพุง", tone: "danger" };
  if (bmiRate >= waistRate && bmiRate >= 20) return { text: "เน้นติดตาม BMI เกิน", tone: "warning" };
  if (waistRate > bmiRate && waistRate >= 20) return { text: "เน้นติดตามรอบเอวเกิน", tone: "warning" };
  return { text: "เฝ้าระวังต่อเนื่อง", tone: "success" };
}

function updateBodyAnalysisDashboard(screenedList) {
  const { total, byVillage } = metabolicRiskByVillage(screenedList);
  const bmiRate = total.screened ? (total.bmiHigh / total.screened) * 100 : 0;
  const waistRate = total.screened ? (total.waistHigh / total.screened) * 100 : 0;

  els.bodyAnalysisTotal.textContent = `${fmt(total.screened)} คน`;
  els.bodyBmiCount.textContent = fmt(total.bmiHigh);
  els.bodyBmiRate.textContent = `${bmiRate.toFixed(1)}%`;
  els.bodyWaistCount.textContent = fmt(total.waistHigh);
  els.bodyWaistRate.textContent = `${waistRate.toFixed(1)}%`;

  els.bodyAnalysisRows.innerHTML = villages
    .map((v) => {
      const row = byVillage[v];
      const villageBmiRate = row.screened ? (row.bmiHigh / row.screened) * 100 : 0;
      const villageWaistRate = row.screened ? (row.waistHigh / row.screened) * 100 : 0;
      const note = bodyAnalysisNote(row);
      return `<tr>
        <td>หมู่ ${v}</td>
        <td>${fmt(row.screened)}</td>
        <td>${fmt(row.bmiHigh)}</td>
        <td>
          <div class="coverage-cell compact-rate">
            <strong>${villageBmiRate.toFixed(1)}%</strong>
            <span class="coverage-track"><span style="width: ${Math.min(villageBmiRate, 100).toFixed(1)}%"></span></span>
          </div>
        </td>
        <td>${fmt(row.waistHigh)}</td>
        <td>
          <div class="coverage-cell compact-rate">
            <strong>${villageWaistRate.toFixed(1)}%</strong>
            <span class="coverage-track waist-track"><span style="width: ${Math.min(villageWaistRate, 100).toFixed(1)}%"></span></span>
          </div>
        </td>
        <td><span class="status-badge ${note.tone}">${escapeHtml(note.text)}</span></td>
      </tr>`;
    })
    .join("");
}

function mapVillageValue() {
  const value = els.mapVillageFilter.value;
  return value === "sync" ? currentVillage() : value;
}

function volunteerColor(name) {
  const palette = ["#00b875", "#00aeca", "#2b93ff", "#f1a51d", "#e04f5f", "#7a54c4", "#10a37f", "#ef7d32", "#4c8bf5", "#d946ef", "#14b8a6", "#84cc16"];
  const text = String(name || "ไม่ระบุ อสม.");
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

function householdKey(person) {
  const villageId = person.village || "-";
  const volunteer = workerName(person) || "ไม่ระบุ อสม.";
  const houseNo = String(person.houseNo || "").replace(/,/g, "").trim() || "-";
  return `${villageId}|${volunteer}|${houseNo}`;
}

function uniqueHouseholds(list) {
  const map = new Map();
  list.forEach((person) => {
    const key = householdKey(person);
    if (!map.has(key)) {
      map.set(key, { ...person, householdMembers: 0 });
    }
    map.get(key).householdMembers += 1;
  });
  return Array.from(map.values());
}

function mapHouseholds() {
  const selectedVillage = mapVillageValue();
  const selectedVolunteer = els.mapVolunteerFilter.value;
  const filtered = population
    .filter((person) => selectedVillage === "all" || person.village === selectedVillage)
    .filter((person) => selectedVolunteer === "all" || workerName(person) === selectedVolunteer);
  return uniqueHouseholds(filtered)
    .sort((a, b) => Number(a.village) - Number(b.village) || String(a.houseNo).localeCompare(String(b.houseNo), "th", { numeric: true }));
}

function updateMapVolunteerOptions() {
  const selectedVillage = mapVillageValue();
  const current = els.mapVolunteerFilter.value;
  const nameSet = new Set(
    population
      .filter((person) => selectedVillage === "all" || person.village === selectedVillage)
      .map(workerName)
      .filter(Boolean)
  );
  vhvVillageAssignments.forEach((villageId, name) => {
    if (selectedVillage === "all" || selectedVillage === villageId) nameSet.add(name);
  });
  const names = Array.from(nameSet).sort((a, b) => a.localeCompare(b, "th"));
  els.mapVolunteerFilter.innerHTML = `<option value="all">ทุก อสม.</option>${names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}`;
  els.mapVolunteerFilter.value = names.includes(current) ? current : "all";
}

function renderHouseholdMap() {
  updateMapVolunteerOptions();
  const households = mapHouseholds();
  const byVillage = new Map(villages.map((v) => [v, []]));
  households.forEach((person) => {
    if (byVillage.has(person.village)) byVillage.get(person.village).push(person);
  });
  const visibleVillages = villages.filter((v) => mapVillageValue() === "all" || mapVillageValue() === v);
  const volunteers = Array.from(new Set(households.map(workerName).filter(Boolean))).sort((a, b) => a.localeCompare(b, "th"));

  els.householdMapStats.textContent = `${fmt(households.length)} หลังคาเรือน`;
  els.householdMapCanvas.innerHTML = visibleVillages
    .map((v, villageIndex) => {
      const homes = byVillage.get(v) || [];
      const homeNodes = homes
        .slice(0, 180)
        .map((person, index) => {
          const cols = 9;
          const col = index % cols;
          const row = Math.floor(index / cols);
          const left = 8 + col * 10 + ((row % 2) * 3);
          const top = 28 + row * 13;
          const color = volunteerColor(workerName(person));
          return `<span class="house-pin" style="left:${left}%;top:${top}%;" title="บ้านเลขที่ ${escapeHtml(person.houseNo || "-")} | ${escapeHtml(workerName(person) || "ไม่ระบุ อสม.")} | สมาชิก ${fmt(person.householdMembers || 1)} คน">
            <i style="background:${color}"></i><b>${escapeHtml(person.houseNo || "-")}</b>
          </span>`;
        })
        .join("");
      const overflow = homes.length > 180 ? `<span class="map-overflow">+${fmt(homes.length - 180)} หลัง</span>` : "";
      return `<article class="village-zone village-zone-${(villageIndex % 6) + 1}">
        <div class="village-zone-head">
          <strong>${escapeHtml(villageNames[v] || `หมู่ ${v}`)}</strong>
          <small>${fmt(homes.length)} หลังคาเรือน</small>
        </div>
        <div class="village-road road-a"></div>
        <div class="village-road road-b"></div>
        ${homeNodes || `<div class="empty-map-zone">ไม่พบข้อมูลบ้านในเงื่อนไขนี้</div>`}
        ${overflow}
      </article>`;
    })
    .join("");

  els.mapVolunteerLegend.innerHTML = volunteers.length
    ? volunteers
        .map((name) => {
          const count = households.filter((person) => workerName(person) === name).length;
          return `<div class="legend-item"><span style="background:${volunteerColor(name)}"></span><strong>${escapeHtml(name)}</strong><small>${fmt(count)} หลัง</small></div>`;
        })
        .join("")
    : `<div class="empty-map-zone">ไม่พบรายชื่อ อสม. ในเงื่อนไขนี้</div>`;
}

function vhvRegistryVillageValue() {
  const value = els.vhvRegistryVillageFilter.value;
  return value === "sync" ? currentVillage() : value;
}

function vhvRegistryRows() {
  const selectedVillage = vhvRegistryVillageValue();
  const groups = new Map();
  const households = uniqueHouseholds(population.filter((person) => selectedVillage === "all" || person.village === selectedVillage));
  households.forEach((person) => {
      const villageId = person.village || "-";
      const volunteer = workerName(person) || "ไม่ระบุ อสม.";
      const key = `${villageId}|${volunteer}`;
      if (!groups.has(key)) groups.set(key, { village: villageId, volunteer, homes: [] });
      groups.get(key).homes.push(person);
    });
  vhvVillageAssignments.forEach((villageId, volunteer) => {
    if (selectedVillage !== "all" && selectedVillage !== villageId) return;
    const key = `${villageId}|${volunteer}`;
    if (!groups.has(key)) groups.set(key, { village: villageId, volunteer, homes: [] });
  });
  return Array.from(groups.values()).sort((a, b) => Number(a.village) - Number(b.village) || b.homes.length - a.homes.length || a.volunteer.localeCompare(b.volunteer, "th"));
}

function renderVhvRegistry() {
  const rows = vhvRegistryRows();
  els.vhvRegistryTotal.textContent = `${fmt(rows.length)} อสม.`;
  if (!rows.length) {
    els.vhvRegistryRows.innerHTML = `<tr><td class="empty-row" colspan="5">ไม่พบข้อมูล อสม. ในเงื่อนไขนี้</td></tr>`;
    return;
  }
  els.vhvRegistryRows.innerHTML = rows
    .map((row) => {
      const homeNumbers = row.homes
        .slice()
        .sort((a, b) => String(a.houseNo).localeCompare(String(b.houseNo), "th", { numeric: true }))
        .map((person) => ({ houseNo: person.houseNo || "-", members: person.householdMembers || 1 }));
      const chips = homeNumbers
        .slice(0, 60)
        .map((house) => `<span class="house-chip" title="สมาชิก ${fmt(house.members)} คน">${escapeHtml(house.houseNo)}</span>`)
        .join("");
      const more = homeNumbers.length > 60 ? `<span class="house-chip more">+${fmt(homeNumbers.length - 60)}</span>` : "";
      return `<tr>
        <td><strong>${escapeHtml(villageNames[row.village] || `หมู่ ${row.village}`)}</strong></td>
        <td><span class="legend-inline"><i style="background:${volunteerColor(row.volunteer)}"></i>${escapeHtml(row.volunteer)}</span></td>
        <td>${fmt(row.homes.length)}</td>
        <td><div class="house-chip-list">${chips}${more}</div></td>
        <td><button class="inline-action map-focus" type="button" data-village="${escapeHtml(row.village)}" data-volunteer="${escapeHtml(row.volunteer)}">ดูบนแผนที่</button></td>
      </tr>`;
    })
    .join("");
}

function updateLeaderboard(byVillage) {
  const leaders = villages
    .map((v) => {
      const c = byVillage[v];
      const unscreened = Math.max(c.target - c.matchedScreened, 0);
      const percent = c.target ? (c.matchedScreened / c.target) * 100 : 0;
      return { village: v, screened: c.matchedScreened, target: c.target, unscreened, percent };
    })
    .filter((item) => item.target > 0)
    .sort((a, b) => b.percent - a.percent || b.screened - a.screened)
    .slice(0, 3);

  els.topVillages.innerHTML = leaders
    .map((item, index) => {
      const stars = "★".repeat(3 - index);
      return `<article class="leader-card">
        <div class="leader-rank">
          <span>อันดับ ${index + 1}</span>
          <span class="leader-stars">${stars}</span>
        </div>
        <div class="leader-title">หมู่ ${item.village}</div>
        <div class="leader-percent">${item.percent.toFixed(1)}%</div>
        <div class="leader-meta">คัดกรอง ${fmt(item.screened)} จาก ${fmt(item.target)} คน | เหลือ ${fmt(item.unscreened)} คน</div>
      </article>`;
    })
    .join("");
}

function coverageLevel(percent) {
  if (percent >= 90) return { text: "ดีเยี่ยม", tone: "excellent" };
  if (percent >= 80) return { text: "ดีมาก", tone: "great" };
  if (percent >= 70) return { text: "ดี", tone: "good" };
  if (percent >= 60) return { text: "กำลังดี", tone: "steady" };
  return { text: "ให้กำลังใจ สู้ๆครับ", tone: "encourage" };
}

function updateVillageCoverageRanking(byVillage) {
  const rows = villages
    .map((v) => {
      const c = byVillage[v];
      const percent = c.target ? (c.matchedScreened / c.target) * 100 : 0;
      return {
        village: v,
        screened: c.matchedScreened,
        target: c.target,
        remaining: Math.max(c.target - c.matchedScreened, 0),
        percent,
        level: coverageLevel(percent),
      };
    })
    .filter((row) => row.target > 0)
    .sort((a, b) => b.percent - a.percent || b.screened - a.screened || Number(a.village) - Number(b.village));

  if (!rows.length) {
    els.villageCoverageRows.innerHTML = `<tr><td class="empty-row" colspan="7">ไม่พบข้อมูลหมู่บ้านในเงื่อนไขนี้</td></tr>`;
    return;
  }

  els.villageCoverageRows.innerHTML = rows
    .map(
      (row, index) => `<tr>
        <td><span class="rank-badge">${index + 1}</span></td>
        <td><strong>หมู่ ${row.village}</strong></td>
        <td>
          <div class="coverage-cell">
            <strong>${row.percent.toFixed(1)}%</strong>
            <span class="coverage-track"><span style="width: ${Math.min(row.percent, 100).toFixed(1)}%"></span></span>
          </div>
        </td>
        <td>${fmt(row.screened)}</td>
        <td>${fmt(row.target)}</td>
        <td>${fmt(row.remaining)}</td>
        <td><span class="coverage-badge ${row.level.tone}">${row.level.text}</span></td>
      </tr>`
    )
    .join("");
}

function currentUnscreenedList() {
  const village = currentFollowupVillage();
  return (unscreened || []).filter((record) => village === "all" || record.village === village);
}

function currentFollowupVillage() {
  const value = els.followupVillageFilter.value;
  return value === "sync" ? currentVillage() : value;
}

function responsibleWorker(record) {
  return workerName(record).trim() || "ไม่ระบุ อสม.";
}

function addFollowupTask(map, record, type) {
  const key = `${record.village || "-"}|${responsibleWorker(record)}`;
  if (!map.has(key)) {
    map.set(key, {
      village: record.village || "-",
      worker: responsibleWorker(record),
      unscreened: 0,
      htRisk: 0,
      dmRisk: 0,
    });
  }
  map.get(key)[type] += 1;
}

function updateFollowupPlan(screenedList) {
  const tasks = new Map();
  const followupVillage = currentFollowupVillage();
  const scopedScreenedList = screenedList.filter((record) => followupVillage === "all" || record.village === followupVillage);
  const unscreenedList = currentUnscreenedList();
  const htRiskList = scopedScreenedList.filter(isHtRisk);
  const dmRiskList = scopedScreenedList.filter(isDmRisk);

  unscreenedList.forEach((record) => addFollowupTask(tasks, record, "unscreened"));
  htRiskList.forEach((record) => addFollowupTask(tasks, record, "htRisk"));
  dmRiskList.forEach((record) => addFollowupTask(tasks, record, "dmRisk"));

  const rows = Array.from(tasks.values())
    .map((row) => ({ ...row, total: row.unscreened + row.htRisk + row.dmRisk }))
    .sort((a, b) => Number(a.village) - Number(b.village) || b.total - a.total || a.worker.localeCompare(b.worker, "th"));

  const totals = rows.reduce(
    (sum, row) => {
      sum.unscreened += row.unscreened;
      sum.htRisk += row.htRisk;
      sum.dmRisk += row.dmRisk;
      sum.total += row.total;
      return sum;
    },
    { unscreened: 0, htRisk: 0, dmRisk: 0, total: 0 }
  );

  els.taskUnscreened.textContent = fmt(totals.unscreened);
  els.taskHtRisk.textContent = fmt(totals.htRisk);
  els.taskDmRisk.textContent = fmt(totals.dmRisk);
  els.taskWorkers.textContent = fmt(rows.length);
  els.followupTotal.textContent = `${fmt(totals.total)} งาน`;
  els.followupSubtitle.textContent = followupVillage === "all" ? "รวมงานติดตามทุกหมู่บ้าน แยกตาม อสม./ผู้รับผิดชอบ" : `งานติดตามหมู่ ${followupVillage} แยกตาม อสม./ผู้รับผิดชอบ`;

  if (!rows.length) {
    els.followupRows.innerHTML = `<tr><td class="empty-row" colspan="8">ไม่พบงานติดตามในเงื่อนไขนี้</td></tr>`;
    return;
  }

  els.followupRows.innerHTML = rows
    .map((row) => {
      const todayTasks = [];
      if (row.unscreened) todayTasks.push(`<span class="task-badge unscreened">ตามคัดกรอง ${fmt(row.unscreened)}</span>`);
      if (row.htRisk) todayTasks.push(`<span class="task-badge ht">นัดวัด BP ซ้ำ ${fmt(row.htRisk)}</span>`);
      if (row.dmRisk) todayTasks.push(`<span class="task-badge dm">นัดตรวจ DTX ซ้ำ ${fmt(row.dmRisk)}</span>`);
      return `<tr>
        <td>หมู่ ${escapeHtml(row.village)}</td>
        <td>${escapeHtml(row.worker)}</td>
        <td>${fmt(row.total)}</td>
        <td>${fmt(row.unscreened)}</td>
        <td>${fmt(row.htRisk)}</td>
        <td>${fmt(row.dmRisk)}</td>
        <td>${fmt(row.total)}</td>
        <td><div class="task-badges">${todayTasks.join("")}</div></td>
      </tr>`;
    })
    .join("");
}

function qualityScoped(list) {
  const selectedVillage = currentVillage();
  return list.filter((record) => selectedVillage === "all" || record.village === selectedVillage);
}

function normalizedHouseNo(record) {
  return String(record.houseNo || "")
    .replace(/,/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function hasBadHouseNo(record) {
  const house = normalizedHouseNo(record);
  if (!house || house === "-" || house === "0") return true;
  return !/[0-9]/.test(house);
}

function qualityIssue(type, source, record, advice) {
  const labels = {
    duplicate: "ชื่อ/บุคคลซ้ำ",
    badHouse: "บ้านเลขที่ผิด/ว่าง",
    unmatched: "จับคู่ประชากรไม่ได้",
    noWorker: "ไม่มี อสม.",
    noDate: "ไม่มีวันที่คัดกรอง",
  };
  return { type, label: labels[type], source, record, advice };
}

function addDuplicateIssues(issues, source, list, options = {}) {
  const groups = new Map();
  list.forEach((record) => {
    const name = cleanName(record.name);
    if (!name) return;
    const parts = [name, village(record.village), normalizedHouseNo(record)];
    if (options.includeScreenedDate) parts.push(record.screenedDate || "");
    const key = parts.join("|");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  });

  groups.forEach((items) => {
    if (items.length < 2) return;
    items.forEach((record) => {
      const advice = options.includeScreenedDate
        ? "ตรวจสอบรายการวันเดียวกันว่าเป็นการบันทึกซ้ำหรือไม่ หากคนละวันถือเป็นการติดตามปกติ"
        : "ตรวจสอบว่าบันทึกซ้ำหรือเป็นคนละรายที่บ้านเลขที่เดียวกัน";
      issues.push(qualityIssue("duplicate", source, record, advice));
    });
  });
}

function buildQualityIssues() {
  const issues = [];
  const populationList = qualityScoped(population || []);
  const recordList = qualityScoped(records || []);

  addDuplicateIssues(issues, "ประชากร", populationList);
  addDuplicateIssues(issues, "คัดกรอง SRR7", recordList, { includeScreenedDate: true });

  populationList.forEach((record) => {
    if (hasBadHouseNo(record)) issues.push(qualityIssue("badHouse", "ประชากร", record, "เติม/แก้ไขบ้านเลขที่ในไฟล์ประชากร"));
    if (!workerName(record).trim()) issues.push(qualityIssue("noWorker", "ประชากร", record, "ระบุ อสม.ประจำบ้าน เพื่อมอบหมายงานติดตาม"));
  });

  recordList.forEach((record) => {
    if (hasBadHouseNo(record)) issues.push(qualityIssue("badHouse", "คัดกรอง SRR7", record, "แก้ไขบ้านเลขที่ให้ตรงกับทะเบียนประชากร"));
    if (!record.populationId) issues.push(qualityIssue("unmatched", "คัดกรอง SRR7", record, "ตรวจชื่อ บ้านเลขที่ และหมู่ ให้ตรงกับไฟล์ประชากร"));
    if (!workerName(record).trim()) issues.push(qualityIssue("noWorker", "คัดกรอง SRR7", record, "ระบุผู้บันทึกข้อมูล/อสม. เพื่อใช้แบ่งงาน"));
    if (!record.screenedDate) issues.push(qualityIssue("noDate", "คัดกรอง SRR7", record, "เติมวันที่คัดกรองล่าสุดก่อนสรุปผลประเมิน"));
  });

  return issues.sort((a, b) => {
    const order = { unmatched: 1, noDate: 2, duplicate: 3, badHouse: 4, noWorker: 5 };
    return order[a.type] - order[b.type] || Number(a.record.village) - Number(b.record.village) || String(a.record.name).localeCompare(String(b.record.name), "th");
  });
}

function qualityBadgeTone(type) {
  if (type === "unmatched" || type === "noDate") return "danger";
  if (type === "duplicate" || type === "badHouse") return "warning";
  return "info";
}

function updateDataQuality() {
  const issues = buildQualityIssues();
  const counts = issues.reduce(
    (sum, issue) => {
      sum[issue.type] += 1;
      return sum;
    },
    { duplicate: 0, badHouse: 0, unmatched: 0, noWorker: 0, noDate: 0 }
  );
  const selectedType = els.qualityIssueFilter.value;
  const filtered = selectedType === "all" ? issues : issues.filter((issue) => issue.type === selectedType);
  const villageText = currentVillage() === "all" ? "ทุกหมู่บ้าน" : `หมู่ ${currentVillage()}`;

  els.qualityDuplicates.textContent = fmt(counts.duplicate);
  els.qualityBadHouse.textContent = fmt(counts.badHouse);
  els.qualityUnmatched.textContent = fmt(counts.unmatched);
  els.qualityNoWorker.textContent = fmt(counts.noWorker);
  els.qualityNoDate.textContent = fmt(counts.noDate);
  els.qualityTotal.textContent = `${fmt(issues.length)} จุด`;
  els.qualitySubtitle.textContent = `ตรวจคุณภาพข้อมูล ${villageText} จากไฟล์ประชากรและไฟล์คัดกรอง SRR7 เพื่อแก้ไขก่อนประเมิน`;

  if (!filtered.length) {
    els.qualityRows.innerHTML = `<tr><td class="empty-row" colspan="8">ไม่พบปัญหาคุณภาพข้อมูลในเงื่อนไขนี้</td></tr>`;
    return;
  }

  els.qualityRows.innerHTML = filtered
    .map((issue) => {
      const record = issue.record;
      return `<tr>
        <td><span class="status-badge ${qualityBadgeTone(issue.type)}">${escapeHtml(issue.label)}</span></td>
        <td>${escapeHtml(issue.source)}</td>
        <td><strong>${escapeHtml(record.name || "-")}</strong></td>
        <td>${escapeHtml(record.houseNo || "-")}</td>
        <td>${escapeHtml(record.village || "-")}</td>
        <td>${escapeHtml(workerName(record) || "-")}</td>
        <td>${escapeHtml(record.screenedDate || "-")}</td>
        <td class="quality-advice">${escapeHtml(issue.advice)}</td>
      </tr>`;
    })
    .join("");
}

function isHtRisk(record) {
  if (record.diagnosedHt) return false;
  const sbp = record.sbp ?? 0;
  const dbp = record.dbp ?? 0;
  return (sbp >= 130 && sbp <= 139) || (dbp >= 80 && dbp <= 89);
}

function isDmRisk(record) {
  if (record.diagnosedDm) return false;
  const dtx = record.dtx ?? 0;
  return dtx >= 100 && dtx <= 125;
}

function screeningRisk(record) {
  const preHt = isHtRisk(record);
  const preDm = isDmRisk(record);
  const waistRisk = record.waist != null && ((record.sex === "ชาย" && record.waist >= 36) || (record.sex === "หญิง" && record.waist >= 32));
  const bmiRisk = record.bmi != null && record.bmi >= 25;
  return preHt || preDm || waistRisk || bmiRisk;
}

function recordGroup(record) {
  if (record.diagnosedDm && record.diagnosedHt) return "DM+HT";
  if (record.diagnosedDm) return "DM";
  if (record.diagnosedHt) return "HT";
  return screeningRisk(record) ? "เสี่ยง" : "ปกติ";
}

function controlStatus(record) {
  if (!record.diagnosedDm && !record.diagnosedHt) return "";
  const dmOk = !record.diagnosedDm || (record.dtx != null && record.dtx < 130);
  const htOk = !record.diagnosedHt || (record.sbp != null && record.dbp != null && record.sbp < 140 && record.dbp < 90);
  return dmOk && htOk ? "ควบคุมได้" : "ควบคุมไม่ได้";
}

function registryVillageFilter(list) {
  const village = currentVillage();
  return list.filter((record) => village === "all" || record.village === village);
}

function normalizeVhvName(value) {
  return cleanName(value)
    .replace(/^(นาย|นาง|นางสาว|น\.ส\.)\s*/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function workerName(record) {
  const name = record.recorder || record.volunteer || "";
  const normalized = normalizeVhvName(name);
  if (resignedVhvs.has(normalized)) return "";
  return canonicalVhvNames.get(normalized) || name;
}

function addressText(record) {
  return [`บ้านเลขที่ ${record.houseNo || ""}`, `หมู่ ${record.village || ""}`, record.houseNo || "", record.village || ""].join(" ").toLowerCase();
}

function registrySort(a, b) {
  return Number(a.village) - Number(b.village) || String(a.name).localeCompare(String(b.name), "th");
}

function populationRegistryItems() {
  const latestByKey = new Map();
  records.forEach((record) => {
    const key = personKey(record);
    const current = latestByKey.get(key);
    const date = record.screenedDate || "";
    const currentDate = current?.screenedDate || "";
    if (!current || date > currentDate) latestByKey.set(key, record);
  });
  return registryVillageFilter(population).map((person) => {
    const matched = latestByKey.get(personKey(person));
    const record = matched
      ? {
          ...person,
          ...matched,
          volunteer: person.volunteer || matched.volunteer,
          recorder: matched.recorder || person.volunteer,
          populationId: person.id,
        }
      : {
          ...person,
          sbp: null,
          dbp: null,
          dtx: null,
          bmi: null,
          waist: null,
          screenedDate: null,
          screenedDateText: "",
          populationId: person.id,
        };
    return { ...record, registryPopulationStatus: matched ? "คัดกรองแล้ว" : "ยังไม่คัดกรอง", group: matched ? recordGroup(record) : recordGroup(person), control: matched ? controlStatus(record) : "" };
  });
}

function registryItems(screenedList) {
  let list;
  if (activeRegistry === "htRisk") list = registryVillageFilter(screenedList.filter(isHtRisk));
  else if (activeRegistry === "dmRisk") list = registryVillageFilter(screenedList.filter(isDmRisk));
  else if (activeRegistry === "bmiHigh") list = registryVillageFilter(screenedList.filter(isBmiHigh));
  else if (activeRegistry === "waistHigh") list = registryVillageFilter(screenedList.filter(isWaistHigh));
  else if (activeRegistry === "population") list = populationRegistryItems();
  else list = registryVillageFilter(unscreened || []);

  const addressQuery = els.registryAddressFilter.value.trim().toLowerCase();
  const volunteer = els.registryVolunteerFilter.value;
  if (addressQuery) list = list.filter((record) => addressText(record).includes(addressQuery));
  if (volunteer !== "all") list = list.filter((record) => workerName(record) === volunteer);
  return list.sort(registrySort);
}

function baseRegistryItems(screenedList) {
  if (activeRegistry === "htRisk") return registryVillageFilter(screenedList.filter(isHtRisk));
  if (activeRegistry === "dmRisk") return registryVillageFilter(screenedList.filter(isDmRisk));
  if (activeRegistry === "bmiHigh") return registryVillageFilter(screenedList.filter(isBmiHigh));
  if (activeRegistry === "waistHigh") return registryVillageFilter(screenedList.filter(isWaistHigh));
  if (activeRegistry === "population") return populationRegistryItems();
  return registryVillageFilter(unscreened || []);
}

function updateVolunteerOptions(screenedList) {
  const current = els.registryVolunteerFilter.value;
  const names = Array.from(new Set(baseRegistryItems(screenedList).map(workerName).filter(Boolean))).sort((a, b) => a.localeCompare(b, "th"));
  const village = currentVillage();
  const allLabel = village === "all" ? "ทุก อสม. / ผู้บันทึก" : `ทุก อสม. / ผู้บันทึกในหมู่ ${village}`;
  els.registryVolunteerFilter.innerHTML = `<option value="all">${allLabel}</option>${names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}`;
  els.registryVolunteerFilter.value = names.includes(current) ? current : "all";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function registryInfo() {
  if (activeRegistry === "htRisk") {
    return { title: "ทะเบียนกลุ่มเสี่ยงโรคความดันโลหิตสูง", note: "SBP 130-139 หรือ DBP 80-89 และยังไม่เป็นผู้ป่วย HT เดิม" };
  }
  if (activeRegistry === "dmRisk") {
    return { title: "ทะเบียนกลุ่มเสี่ยงโรคเบาหวาน", note: "DTX 100-125 และยังไม่เป็นผู้ป่วย DM เดิม" };
  }
  if (activeRegistry === "bmiHigh") {
    return { title: "ทะเบียนรายชื่อ BMI เกินมาตรฐาน", note: "BMI ≥ 25 ใช้ติดตามดูแลเรื่องน้ำหนัก โภชนาการ และกิจกรรมทางกาย" };
  }
  if (activeRegistry === "waistHigh") {
    return { title: "ทะเบียนรายชื่อรอบเอวเกินมาตรฐาน", note: "ชาย ≥36 นิ้ว / หญิง ≥32 นิ้ว ใช้ติดตามลดพุงและพฤติกรรมเสี่ยง NCDs" };
  }
  if (activeRegistry === "population") {
    return { title: "ทะเบียนประชากรกลุ่มเป้าหมาย ≥35 ปี", note: "ใช้ตรวจสอบฐานประชากรกับทะเบียนคัดกรองล่าสุด แสดงสถานะคัดกรองแล้ว/ยังไม่คัดกรอง" };
  }
  return { title: "ทะเบียนรายชื่อผู้ยังไม่ได้รับการคัดกรอง", note: "รายชื่อจากฐานประชากรที่ยังไม่พบผลคัดกรองในไฟล์คัดกรอง" };
}

function registryRemark(record) {
  if (activeRegistry === "htRisk") return "เสี่ยง HT";
  if (activeRegistry === "dmRisk") return "เสี่ยง DM";
  if (activeRegistry === "bmiHigh") return "BMI เกิน";
  if (activeRegistry === "waistHigh") return "รอบเอวเกิน";
  if (activeRegistry === "population") return record.registryPopulationStatus || "ทะเบียนประชากร";
  const disease = [];
  if (record.diagnosedDm) disease.push("DM เดิม");
  if (record.diagnosedHt) disease.push("HT เดิม");
  return disease.join(" / ") || "ยังไม่คัดกรอง";
}

function statusBadges(record) {
  const badges = [];
  const follow = followStatus(record);
  if (activeRegistry === "htRisk") badges.push({ text: "เสี่ยง HT", tone: "warning" });
  if (activeRegistry === "dmRisk") badges.push({ text: "เสี่ยง DM", tone: "warning" });
  if (activeRegistry === "bmiHigh") badges.push({ text: "BMI เกิน", tone: "warning" });
  if (activeRegistry === "waistHigh") badges.push({ text: "รอบเอวเกิน", tone: "warning" });
  if (activeRegistry === "population") badges.push({ text: record.registryPopulationStatus || "ทะเบียนประชากร", tone: record.registryPopulationStatus === "คัดกรองแล้ว" ? "success" : "neutral" });
  if (activeRegistry === "unscreened") badges.push({ text: "ยังไม่คัดกรอง", tone: "neutral" });
  if (follow) badges.push({ text: follow, tone: follow === "คัดกรองแล้วรอนำเข้า" ? "success" : "info" });
  if (record.group === "DM") badges.push({ text: "DM", tone: "danger" });
  if (record.group === "HT") badges.push({ text: "HT", tone: "info" });
  if (record.group === "DM+HT") badges.push({ text: "DM+HT", tone: "danger" });
  if (record.control === "ควบคุมไม่ได้") badges.push({ text: "ควบคุมไม่ได้", tone: "danger" });
  if (record.control === "ควบคุมได้") badges.push({ text: "ควบคุมได้", tone: "success" });
  if (!badges.length) badges.push({ text: registryRemark(record), tone: "neutral" });
  return badges
    .map((badge) => `<span class="status-badge ${badge.tone}">${escapeHtml(badge.text)}</span>`)
    .join("");
}

function followStore() {
  try {
    return JSON.parse(localStorage.getItem("srr7-follow-status") || "{}");
  } catch {
    return {};
  }
}

function saveFollowStore(store) {
  localStorage.setItem("srr7-follow-status", JSON.stringify(store));
}

function followStatus(record) {
  return followStore()[personKey(record)] || "";
}

function setFollowStatus(recordKey, status) {
  const store = followStore();
  if (status) store[recordKey] = status;
  else delete store[recordKey];
  saveFollowStore(store);
}

function followStatusControl(record) {
  const key = keyToId(personKey(record));
  const current = followStatus(record);
  return `<select class="follow-status-select" data-person="${key}">
    ${FOLLOW_STATUSES.map((status) => `<option value="${escapeHtml(status)}"${status === current ? " selected" : ""}>${status || "ยังไม่ระบุ"}</option>`).join("")}
  </select>`;
}

function updateRegistry(screenedList) {
  updateRegistryLockState();
  if (!registryUnlocked) {
    els.registrySubtitle.textContent = "กรุณาเข้าสู่ระบบเพื่อดูทะเบียนรายชื่อ";
    els.registryCount.textContent = "ล็อก";
    els.registryRows.innerHTML = "";
    return;
  }
  updateVolunteerOptions(screenedList);
  const items = registryItems(screenedList);
  currentRegistryRows = items;
  const info = registryInfo();
  const villageText = currentVillage() === "all" ? "หมู่ 1-12" : `หมู่ ${currentVillage()}`;
  els.registrySubtitle.textContent = `${info.title} | ${villageText} | ${info.note}`;
  els.registryCount.textContent = `${fmt(items.length)} ราย`;
  if (!items.length) {
    els.registryRows.innerHTML = `<tr><td class="empty-row" colspan="12">ไม่พบรายชื่อในเงื่อนไขนี้</td></tr>`;
    return;
  }
  els.registryRows.innerHTML = items
    .map((record, index) => {
      const bp = record.sbp != null || record.dbp != null ? `${record.sbp ?? "-"} / ${record.dbp ?? "-"}` : "-";
      const dtx = record.dtx != null ? fmt(record.dtx) : "-";
      const worker = workerName(record) || "-";
      const personId = keyToId(personKey(record));
      return `<tr>
        <td>${fmt(index + 1)}</td>
        <td>${escapeHtml(record.name || "-")}</td>
        <td>${escapeHtml(record.sex || "-")}</td>
        <td>${escapeHtml(record.houseNo || "-")}</td>
        <td>หมู่ ${escapeHtml(record.village || "-")}</td>
        <td>${escapeHtml(worker)}</td>
        <td>${bp}</td>
        <td>${dtx}</td>
        <td>${escapeHtml(record.screenedDateText || "-")}</td>
        <td><div class="status-badges">${statusBadges(record)}</div></td>
        <td>${followStatusControl(record)}</td>
        <td><button class="inline-action person-open" type="button" data-person="${personId}">ดู/บันทึก</button></td>
      </tr>`;
    })
    .join("");
}

function parseScreeningRows(rows) {
  const headers = rows[2] || [];
  const saltIndex = headers.findIndex((header) => /เค็ม|เกลือ|โซเดียม|salt|sodium/i.test(String(header || "")));
  const dataRows = rows.slice(3).filter((row) => row.some((cell) => cell !== undefined && cell !== null && String(cell).trim() !== ""));
  const popByKey = new Map(population.map((person) => [personKey(person), person]));
  const parsed = dataRows.map((row, index) => {
    const base = {
      id: index + 1,
      name: cleanName(row[0]),
      sex: row[1] || "",
      houseNo: String(row[2] || "").replace(/,/g, "").trim(),
      village: village(row[3]),
      subdistrict: row[4] || "",
      recorder: row[5] || "",
      sbp: number(row[6]),
      dbp: number(row[7]),
      dtx: number(row[8]),
      bmi: number(row[9]),
      waist: number(row[10]),
      smoking: row[11] || "",
      alcohol: row[12] || "",
      screenedDateText: row[13] || "",
      screenedDate: parseThaiDateText(row[13] || ""),
      saltLevel: saltIndex >= 0 ? row[saltIndex] || "" : row[14] || "",
    };
    const pop = popByKey.get(personKey(base));
    const record = {
      ...base,
      populationId: pop?.id || null,
      diagnosedDm: pop?.diagnosedDm || false,
      diagnosedHt: pop?.diagnosedHt || false,
    };
    return { ...record, group: recordGroup(record), control: controlStatus(record) };
  });
  return parsed;
}

function yes(value) {
  return String(value || "").trim() === "ใช่";
}

function parsePopulationRows(rows) {
  return rows
    .slice(3)
    .filter((row) => row.some((cell) => cell !== undefined && cell !== null && String(cell).trim() !== ""))
    .map((row, index) => ({
      id: index + 1,
      name: cleanName(row[0]),
      sex: row[1] || "",
      houseNo: String(row[2] || "").replace(/,/g, "").trim(),
      village: village(row[3]),
      subdistrict: row[4] || "",
      volunteer: row[5] || "",
      diagnosedDm: yes(row[6]),
      diagnosedHt: yes(row[7]),
    }));
}

function rematchScreeningWithPopulation() {
  const popByKey = new Map(population.map((person) => [personKey(person), person]));
  records = records.map((record, index) => {
    const pop = popByKey.get(personKey(record));
    const rematched = {
      ...record,
      id: index + 1,
      populationId: pop?.id || null,
      diagnosedDm: pop?.diagnosedDm || false,
      diagnosedHt: pop?.diagnosedHt || false,
    };
    return { ...rematched, group: recordGroup(rematched), control: controlStatus(rematched) };
  });
}

function rebuildUnscreened() {
  const screenedKeys = new Set(records.map(personKey));
  unscreened = population
    .filter((person) => !screenedKeys.has(personKey(person)))
    .map((person) => {
      const record = {
        ...person,
        sbp: null,
        dbp: null,
        dtx: null,
        bmi: null,
        waist: null,
        screenedDate: null,
        screenedDateText: "",
      };
      return { ...record, group: recordGroup(record), control: "" };
    });
}

function setImportStatus(message, type = "") {
  els.importStatus.textContent = message;
  els.importStatus.className = type;
}

function setPopulationImportStatus(message, type = "") {
  els.populationImportStatus.textContent = message;
  els.populationImportStatus.className = type;
}

function registryExportRows() {
  return currentRegistryRows.map((record, index) => ({
    "ลำดับ": index + 1,
    "ชื่อ - สกุล": record.name || "",
    "เพศ": record.sex || "",
    "บ้านเลขที่": record.houseNo || "",
    "หมู่": record.village || "",
    "อสม. / ผู้บันทึก": workerName(record) || "",
    "SBP/DBP": record.sbp != null || record.dbp != null ? `${record.sbp ?? "-"} / ${record.dbp ?? "-"}` : "",
    "DTX": record.dtx ?? "",
    "BMI": record.bmi ?? "",
    "รอบเอว": record.waist ?? "",
    "วันที่คัดกรอง": record.screenedDateText || "",
    "สถานะ": registryRemark(record),
    "สถานะติดตาม": followStatus(record),
  }));
}

function registryFileBaseName() {
  const info = registryInfo();
  const village = currentVillage() === "all" ? "ทุกหมู่" : `หมู่${currentVillage()}`;
  return `${info.title}_${village}`.replace(/[\\/:*?"<>|]/g, "_");
}

function exportRegistryExcel() {
  if (!registryUnlocked) return;
  const rows = registryExportRows();
  if (!rows.length) {
    alert("ไม่มีข้อมูลสำหรับส่งออก");
    return;
  }
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "registry");
    XLSX.writeFile(workbook, `${registryFileBaseName()}.xlsx`);
    return;
  }
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${registryFileBaseName()}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportRegistryByVillageSheets() {
  if (!registryUnlocked) return;
  const rows = registryExportRows();
  if (!rows.length) {
    alert("ไม่มีข้อมูลสำหรับส่งออก");
    return;
  }
  if (!window.XLSX) {
    alert("ไม่พบไลบรารี Excel กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้า");
    return;
  }
  const workbook = XLSX.utils.book_new();
  let sheetCount = 0;
  for (const v of villages) {
    const villageRows = rows.filter((row) => String(row["หมู่"]) === v);
    if (!villageRows.length) continue;
    const worksheet = XLSX.utils.json_to_sheet(villageRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, `หมู่ ${v}`);
    sheetCount += 1;
  }
  if (!sheetCount) {
    alert("ไม่มีข้อมูลแยกตามหมู่สำหรับส่งออก");
    return;
  }
  XLSX.writeFile(workbook, `${registryFileBaseName()}_แยกหมู่.xlsx`);
}

function meetingPersonRows(list, label) {
  return list.slice().sort(registrySort).map((record, index) => ({
    "ลำดับ": index + 1,
    "ประเภท": label,
    "ชื่อ - สกุล": record.name || "",
    "เพศ": record.sex || "",
    "บ้านเลขที่": record.houseNo || "",
    "หมู่": record.village || "",
    "อสม. / ผู้รับผิดชอบ": workerName(record) || "",
    "SBP/DBP": record.sbp != null || record.dbp != null ? `${record.sbp ?? "-"} / ${record.dbp ?? "-"}` : "",
    "DTX": record.dtx ?? "",
    "BMI": record.bmi ?? "",
    "รอบเอว": record.waist ?? "",
    "วันที่คัดกรอง": record.screenedDateText || "",
    "สถานะติดตาม": followStatus(record),
  }));
}

function meetingFollowupRows(screenedList) {
  const tasks = new Map();
  registryVillageFilter(unscreened || []).forEach((record) => addFollowupTask(tasks, record, "unscreened"));
  registryVillageFilter(screenedList.filter(isHtRisk)).forEach((record) => addFollowupTask(tasks, record, "htRisk"));
  registryVillageFilter(screenedList.filter(isDmRisk)).forEach((record) => addFollowupTask(tasks, record, "dmRisk"));
  return Array.from(tasks.values())
    .map((row, index) => ({
      "ลำดับ": index + 1,
      "หมู่": row.village,
      "อสม. / ผู้รับผิดชอบ": row.worker,
      "ยังไม่คัดกรอง": row.unscreened,
      "เสี่ยง HT": row.htRisk,
      "เสี่ยง DM": row.dmRisk,
      "รวมงานติดตาม": row.unscreened + row.htRisk + row.dmRisk,
      "งานที่ควรทำ": [
        row.unscreened ? `ตามคัดกรอง ${row.unscreened} ราย` : "",
        row.htRisk ? `นัดวัด BP ซ้ำ ${row.htRisk} ราย` : "",
        row.dmRisk ? `นัดตรวจ DTX ซ้ำ ${row.dmRisk} ราย` : "",
      ].filter(Boolean).join(" | "),
    }))
    .sort((a, b) => Number(a["หมู่"]) - Number(b["หมู่"]) || b["รวมงานติดตาม"] - a["รวมงานติดตาม"]);
}

function meetingVillageRankingRows(byVillage) {
  return villages
    .map((v) => {
      const row = byVillage[v];
      const coverage = row.target ? (row.matchedScreened / row.target) * 100 : 0;
      return {
        "หมู่": v,
        "เป้าหมาย": row.target,
        "คัดกรองแล้ว": row.matchedScreened,
        "ความครอบคลุม (%)": Number(coverage.toFixed(1)),
        "ยังไม่คัดกรอง": Math.max(row.target - row.matchedScreened, 0),
        "ระดับผลงาน": coverageLevel(coverage).text,
      };
    })
    .filter((row) => row["เป้าหมาย"] > 0)
    .sort((a, b) => b["ความครอบคลุม (%)"] - a["ความครอบคลุม (%)"] || b["คัดกรองแล้ว"] - a["คัดกรองแล้ว"]);
}

function appendJsonSheet(workbook, rows, name) {
  const worksheet = XLSX.utils.json_to_sheet(rows.length ? rows : [{ "ข้อมูล": "ไม่พบข้อมูล" }]);
  XLSX.utils.book_append_sheet(workbook, worksheet, name.slice(0, 31));
}

function exportMeetingPack() {
  if (!registryUnlocked) {
    alert("กรุณา login admin ก่อน Export ชุดเอกสารประชุม เนื่องจากมีรายชื่อบุคคล");
    location.hash = "#registry";
    return;
  }
  if (!window.XLSX) {
    alert("ไม่พบไลบรารี Excel กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้า");
    return;
  }

  const screenedList = filteredRecords();
  const popList = filteredPopulation();
  const { total, byVillage } = summarize(screenedList, popList);
  const rankingRows = meetingVillageRankingRows(byVillage);
  const coverage = total.target ? (total.matchedScreened / total.target) * 100 : 0;
  const riskLoad = total.risk + total.dm + total.ht + total.both + total.uncontrolled;
  const urgent = rankingRows.slice().sort((a, b) => b["ยังไม่คัดกรอง"] - a["ยังไม่คัดกรอง"] || a["ความครอบคลุม (%)"] - b["ความครอบคลุม (%)"])[0];
  const best = rankingRows[0];
  const [start, end, rangeName] = currentRange();
  const summaryRows = [
    { "หัวข้อ": "พื้นที่", "ค่า": currentVillage() === "all" ? "ตำบลคำใหญ่ หมู่ 1-12" : `ตำบลคำใหญ่ หมู่ ${currentVillage()}` },
    { "หัวข้อ": "ช่วงข้อมูล", "ค่า": dateLabel(start, end, rangeName) },
    { "หัวข้อ": "เป้าหมาย ≥35 ปี", "ค่า": total.target },
    { "หัวข้อ": "คัดกรองแล้ว", "ค่า": total.matchedScreened },
    { "หัวข้อ": "ความครอบคลุม (%)", "ค่า": Number(coverage.toFixed(1)) },
    { "หัวข้อ": "ยังไม่คัดกรอง", "ค่า": Math.max(total.target - total.matchedScreened, 0) },
    { "หัวข้อ": "กลุ่มเสี่ยง/ป่วยที่ควรติดตาม", "ค่า": riskLoad },
    { "หัวข้อ": "หมู่ผลงานดีที่สุด", "ค่า": best ? `หมู่ ${best["หมู่"]} (${best["ความครอบคลุม (%)"]}%)` : "-" },
    { "หัวข้อ": "หมู่เร่งติดตาม", "ค่า": urgent ? `หมู่ ${urgent["หมู่"]} เหลือ ${urgent["ยังไม่คัดกรอง"]} ราย` : "-" },
    { "หัวข้อ": "Export เมื่อ", "ค่า": new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date()) },
  ];

  const workbook = XLSX.utils.book_new();
  appendJsonSheet(workbook, summaryRows, "สรุปผู้บริหาร");
  appendJsonSheet(workbook, rankingRows.map((row, index) => ({ "อันดับ": index + 1, ...row })), "อันดับหมู่บ้าน");
  appendJsonSheet(workbook, meetingFollowupRows(screenedList), "แผนติดตามงาน");

  for (const v of villages) {
    const rows = meetingPersonRows((unscreened || []).filter((record) => record.village === v && (currentVillage() === "all" || currentVillage() === v)), "ยังไม่คัดกรอง");
    if (rows.length) appendJsonSheet(workbook, rows, `ยังไม่คัด ม.${v}`);
  }

  appendJsonSheet(workbook, meetingPersonRows(registryVillageFilter(screenedList.filter(isHtRisk)), "เสี่ยง HT"), "รายชื่อเสี่ยง HT");
  appendJsonSheet(workbook, meetingPersonRows(registryVillageFilter(screenedList.filter(isDmRisk)), "เสี่ยง DM"), "รายชื่อเสี่ยง DM");

  const villageName = currentVillage() === "all" ? "ทุกหมู่" : `หมู่${currentVillage()}`;
  XLSX.writeFile(workbook, `ชุดเอกสารประชุม_NCD_${villageName}.xlsx`);
}

function printRegistryList() {
  if (!registryUnlocked) return;
  const rows = registryExportRows();
  if (!rows.length) {
    alert("ไม่มีข้อมูลสำหรับพิมพ์");
    return;
  }
  const info = registryInfo();
  const villageText = currentVillage() === "all" ? "หมู่ 1-12" : `หมู่ ${currentVillage()}`;
  const workerText = els.registryVolunteerFilter.value === "all" ? "ทุก อสม./ผู้บันทึก" : els.registryVolunteerFilter.value;
  const printedAt = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date());
  const html = `<!doctype html><html lang="th"><head><meta charset="utf-8"><title>${escapeHtml(info.title)}</title>
    <style>
      body{font-family:"Noto Sans Thai","Segoe UI",sans-serif;margin:24px;color:#17211d}
      h1{font-size:20px;margin:0 0 6px} p{margin:0 0 12px;color:#5f6b65}
      table{width:100%;border-collapse:collapse;font-size:12px} th,td{border:1px solid #d7e2dc;padding:6px;text-align:left}
      th{background:#f0f7f4} .meta{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px}
      @media print{button{display:none} body{margin:12mm}}
    </style></head><body>
    <button onclick="window.print()">พิมพ์</button>
    <h1>${escapeHtml(info.title)}</h1>
    <div class="meta"><p>${escapeHtml(villageText)}</p><p>อสม./ผู้รับผิดชอบ: ${escapeHtml(workerText)}</p><p>จำนวน ${fmt(rows.length)} ราย</p><p>พิมพ์เมื่อ ${escapeHtml(printedAt)}</p></div>
    <table><thead><tr>${Object.keys(rows[0]).map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((row) => `<tr>${Object.values(row).map((value) => `<td>${escapeHtml(value)}</td>`).join("")}</tr>`).join("")}</tbody></table>
    </body></html>`;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
}

function printFieldWorkForm() {
  if (!registryUnlocked) return;
  const rows = currentRegistryRows;
  if (!rows.length) {
    alert("ไม่มีข้อมูลสำหรับพิมพ์แบบฟอร์มสนาม");
    return;
  }
  const info = registryInfo();
  const printedAt = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date());
  const groups = new Map();
  for (const record of rows) {
    const key = `${record.village || "-"}|${workerName(record) || "ไม่ระบุ อสม."}`;
    if (!groups.has(key)) groups.set(key, { village: record.village || "-", worker: workerName(record) || "ไม่ระบุ อสม.", records: [] });
    groups.get(key).records.push(record);
  }
  const sections = Array.from(groups.values())
    .sort((a, b) => Number(a.village) - Number(b.village) || a.worker.localeCompare(b.worker, "th"))
    .map((group) => {
      const body = group.records
        .map(
          (record, index) => `<tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(record.name || "-")}</td>
            <td>${escapeHtml(record.sex || "-")}</td>
            <td>${escapeHtml(record.houseNo || "-")}</td>
            <td>${escapeHtml(followStatus(record) || "")}</td>
            <td class="check">□ นัดแล้ว<br>□ ไม่อยู่บ้าน<br>□ ย้าย<br>□ ปฏิเสธ<br>□ คัดกรองแล้ว</td>
            <td class="write"></td>
            <td class="write"></td>
            <td class="write"></td>
            <td class="write"></td>
            <td class="write wide"></td>
            <td class="sign"></td>
          </tr>`
        )
        .join("");
      return `<section class="page">
        <h2>${escapeHtml(info.title)}</h2>
        <div class="meta">
          <span>หมู่ ${escapeHtml(group.village)}</span>
          <span>อสม./ผู้รับผิดชอบ: ${escapeHtml(group.worker)}</span>
          <span>จำนวน ${fmt(group.records.length)} ราย</span>
          <span>พิมพ์เมื่อ ${escapeHtml(printedAt)}</span>
        </div>
        <table>
          <thead><tr>
            <th>ลำดับ</th><th>ชื่อ - สกุล</th><th>เพศ</th><th>บ้านเลขที่</th><th>สถานะเดิม</th>
            <th>สถานะติดตาม</th><th>BP</th><th>DTX</th><th>น้ำหนัก</th><th>ส่วนสูง</th><th>หมายเหตุ</th><th>ลายเซ็น</th>
          </tr></thead>
          <tbody>${body}</tbody>
        </table>
        <div class="footer-sign">
          <span>ลงชื่อ อสม. ___________________________</span>
          <span>ลงชื่อ ผู้ตรวจทาน ___________________________</span>
          <span>วันที่ ______ / ______ / ______</span>
        </div>
      </section>`;
    })
    .join("");
  const html = `<!doctype html><html lang="th"><head><meta charset="utf-8"><title>แบบฟอร์มภาคสนาม</title>
    <style>
      body{font-family:"Noto Sans Thai","Segoe UI",sans-serif;margin:0;color:#17211d}
      .page{padding:12mm;page-break-after:always} h2{font-size:18px;margin:0 0 6px}
      .meta{display:flex;gap:12px;flex-wrap:wrap;margin:0 0 10px;color:#53615b;font-size:12px}
      table{width:100%;border-collapse:collapse;font-size:11px} th,td{border:1px solid #9fb0a8;padding:5px;vertical-align:top}
      th{background:#eef7f3}.check{line-height:1.75}.write{height:42px}.wide{min-width:120px}.sign{min-width:88px}
      .footer-sign{display:flex;justify-content:space-between;gap:12px;margin-top:14px;font-size:12px}
      button{margin:10px 12mm;padding:8px 14px}
      @media print{button{display:none}.page{page-break-after:always}}
    </style></head><body>
    <button onclick="window.print()">พิมพ์แบบฟอร์ม</button>${sections}</body></html>`;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
}

async function importScreeningFile(file) {
  if (!registryUnlocked) {
    setImportStatus("กรุณา login admin ก่อนนำเข้าไฟล์คัดกรองจาก SRR7", "error");
    return;
  }
  if (!window.XLSX) {
    setImportStatus("ไม่พบไลบรารีอ่าน Excel กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้า", "error");
    return;
  }
  try {
    setImportStatus("กำลังอ่านไฟล์...");
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    const imported = parseScreeningRows(rows);
    if (!imported.length) throw new Error("empty");
    records = imported;
    rebuildUnscreened();
    els.totalRecords.textContent = fmt(records.length);
    setImportStatus(`นำเข้า ${file.name} สำเร็จ: ${fmt(records.length)} รายการ`, "success");
    render();
  } catch (error) {
    setImportStatus("นำเข้าไฟล์ไม่สำเร็จ กรุณาตรวจสอบว่าเป็นไฟล์คัดกรองจาก SRR7", "error");
  }
}

async function importPopulationFile(file) {
  if (!registryUnlocked) {
    setPopulationImportStatus("กรุณา login admin ก่อนนำเข้าไฟล์ประชากรจาก SRR7", "error");
    return;
  }
  if (!window.XLSX) {
    setPopulationImportStatus("ไม่พบไลบรารีอ่าน Excel กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้า", "error");
    return;
  }
  try {
    setPopulationImportStatus("กำลังอ่านไฟล์ประชากร...");
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    const imported = parsePopulationRows(rows);
    if (!imported.length) throw new Error("empty");
    population = imported;
    rematchScreeningWithPopulation();
    rebuildUnscreened();
    els.populationTotal.textContent = fmt(population.length);
    setPopulationImportStatus(`นำเข้า ${file.name} สำเร็จ: ${fmt(population.length)} รายการ`, "success");
    render();
  } catch (error) {
    setPopulationImportStatus("นำเข้าข้อมูลประชากรไม่สำเร็จ กรุณาตรวจสอบว่าเป็นไฟล์ประชากรจาก SRR7", "error");
  }
}

function updateRegistryLockState() {
  els.registryLogin.classList.toggle("unlocked", registryUnlocked);
  els.registryContent.classList.toggle("locked", !registryUnlocked);
  els.registryActions.classList.toggle("locked", !registryUnlocked);
  els.importControl.classList.toggle("locked", !registryUnlocked);
  els.importPanel.classList.toggle("import-unlocked", registryUnlocked);
  els.importLockedNotice.classList.toggle("unlocked", registryUnlocked);
  els.populationImport.disabled = !registryUnlocked;
  els.screeningImport.disabled = !registryUnlocked;
  els.populationImport.setAttribute("aria-disabled", String(!registryUnlocked));
  els.screeningImport.setAttribute("aria-disabled", String(!registryUnlocked));
  if (registryUnlocked) {
    els.populationImportStatus.textContent ||= "พร้อมนำเข้าข้อมูลประชากรจาก SRR7";
    els.importStatus.textContent ||= "พร้อมนำเข้าข้อมูลคัดกรองจาก SRR7";
  }
}

function measureStore() {
  try {
    return JSON.parse(localStorage.getItem("srr7-person-measures") || "{}");
  } catch {
    return {};
  }
}

function saveMeasureStore(store) {
  localStorage.setItem("srr7-person-measures", JSON.stringify(store));
}

function personMeasures(key) {
  return (measureStore()[key] || []).sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function findPerson(key) {
  return records.find((record) => personKey(record) === key) || unscreened.find((record) => personKey(record) === key) || population.find((record) => personKey(record) === key);
}

function bmiFromMeasure(measure) {
  const weight = Number(measure.weight);
  const heightM = Number(measure.height) / 100;
  return weight && heightM ? weight / (heightM * heightM) : null;
}

function bmiStatus(bmi) {
  if (!Number.isFinite(Number(bmi))) return "-";
  if (bmi >= 25) return "เสี่ยง";
  if (bmi >= 18.5) return "ปกติ";
  return "ต่ำกว่าเกณฑ์";
}

function bpStatus(record) {
  if (record?.sbp == null && record?.dbp == null) return "-";
  return (record.sbp ?? 0) >= 140 || (record.dbp ?? 0) >= 90 ? "เสี่ยง" : "ปกติ";
}

function dtxStatus(record) {
  if (record?.dtx == null) return "-";
  return record.dtx >= 126 ? "เสี่ยง" : record.dtx >= 100 ? "เฝ้าระวัง" : "ปกติ";
}

function thaiTodayIso() {
  return iso(todayBangkok());
}

function latestMeasure(key) {
  const list = personMeasures(key);
  return list[list.length - 1] || null;
}

function historyStatus(row) {
  const bmi = Number(row.bmi);
  const dtx = Number(row.dtx);
  let sbp = null;
  let dbp = null;
  if (typeof row.bp === "string" && row.bp.includes("/")) {
    const parts = row.bp.split("/").map((part) => Number(part.trim()));
    sbp = Number.isFinite(parts[0]) ? parts[0] : null;
    dbp = Number.isFinite(parts[1]) ? parts[1] : null;
  }
  const danger = (sbp != null && sbp >= 140) || (dbp != null && dbp >= 90) || dtx >= 126 || bmi >= 30;
  const warning = (sbp != null && sbp >= 130) || (dbp != null && dbp >= 80) || dtx >= 100 || bmi >= 25;
  if (danger) return { text: "เสี่ยง", tone: "danger" };
  if (warning) return { text: "เฝ้าระวัง", tone: "warning" };
  return { text: "ปกติ", tone: "success" };
}

function historyRows(person, key) {
  const rows = [];
  const measures = personMeasures(key);
  for (const measure of measures) {
    const bmi = bmiFromMeasure(measure);
    rows.push({
      date: measure.date,
      weight: measure.weight,
      height: measure.height,
      bmi,
      bp: "-",
      dtx: "-",
      smoking: "-",
      alcohol: "-",
      follow: followStatus(person),
    });
  }
  if (person?.screenedDate || person?.screenedDateText) {
    rows.push({
      date: person.screenedDate || person.screenedDateText,
      weight: "-",
      height: "-",
      bmi: person.bmi,
      bp: person.sbp != null || person.dbp != null ? `${person.sbp ?? "-"} / ${person.dbp ?? "-"}` : "-",
      dtx: person.dtx ?? "-",
      smoking: person.smoking || "-",
      alcohol: person.alcohol || "-",
      follow: followStatus(person),
    });
  }
  return rows.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function renderPersonCharts(person, key) {
  for (const chart of Object.values(personCharts)) chart.destroy();
  personCharts = {};
  const rows = historyRows(person, key).slice().reverse();
  const labels = rows.map((row) => row.date);
  personCharts.bp = new Chart(document.querySelector("#personBpChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "SBP", data: rows.map((row) => (typeof row.bp === "string" && row.bp.includes("/") ? Number(row.bp.split("/")[0]) : null)), borderColor: colors.ht, tension: 0.35 },
        { label: "DBP", data: rows.map((row) => (typeof row.bp === "string" && row.bp.includes("/") ? Number(row.bp.split("/")[1]) : null)), borderColor: "#e0527f", tension: 0.35 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false } } },
  });
  personCharts.metabolic = new Chart(document.querySelector("#personMetabolicChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "DTX", data: rows.map((row) => Number(row.dtx) || null), borderColor: colors.screened, tension: 0.35 },
        { label: "BMI", data: rows.map((row) => Number(row.bmi) || null), borderColor: colors.risk, tension: 0.35 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false } } },
  });
}

function openPersonDialog(key) {
  if (!registryUnlocked) return;
  const person = findPerson(key);
  if (!person) return;
  selectedPersonKey = key;
  const measure = latestMeasure(key);
  const latestBmi = measure ? bmiFromMeasure(measure) : person.bmi;
  els.personDialogTitle.textContent = `${person.name || "-"} (${person.sex || "-"}, cid: -)`;
  els.personDialogMeta.textContent = `บ้านเลขที่ ${person.houseNo || "-"} | หมู่ ${person.village || "-"} | ${workerName(person) || "ไม่ระบุ อสม./ผู้บันทึก"}`;
  els.personBp.textContent = person.sbp != null || person.dbp != null ? `${person.sbp ?? "-"} / ${person.dbp ?? "-"}` : "-";
  els.personBpStatus.textContent = bpStatus(person);
  els.personDtx.textContent = person.dtx != null ? fmt(person.dtx) : "-";
  els.personDtxStatus.textContent = dtxStatus(person);
  els.personBmi.textContent = latestBmi ? fmtDecimal(latestBmi, 2) : "-";
  els.personBmiStatus.textContent = bmiStatus(latestBmi);
  els.personCvd.textContent = "0.00%";
  els.measureDate.value = thaiTodayIso();
  els.measureWeight.value = "";
  els.measureHeight.value = "";
  els.measureMessage.textContent = "";
  renderPersonHistory(person, key);
  if (!els.personDialog.open) els.personDialog.showModal();
  setTimeout(() => renderPersonCharts(person, key), 0);
}

function renderPersonHistory(person, key) {
  const rows = historyRows(person, key);
  if (!rows.length) {
    els.personHistoryRows.innerHTML = `<tr><td class="empty-row" colspan="9">ยังไม่มีประวัติ</td></tr>`;
    return;
  }
  els.personHistoryRows.innerHTML = rows
    .map((row) => {
      const status = historyStatus(row);
      const follow = row.follow ? `<span class="status-badge info">${escapeHtml(row.follow)}</span>` : "";
      return `<tr>
        <td>${escapeHtml(row.date || "-")}</td>
        <td>${row.weight === "-" ? "-" : fmtDecimal(row.weight, 1)}</td>
        <td>${row.height === "-" ? "-" : fmtDecimal(row.height, 1)}</td>
        <td>${row.bmi ? fmtDecimal(row.bmi, 2) : "-"}</td>
        <td>${escapeHtml(row.bp || "-")}</td>
        <td>${escapeHtml(row.dtx || "-")}</td>
        <td>${escapeHtml(row.smoking || "-")}</td>
        <td>${escapeHtml(row.alcohol || "-")}</td>
        <td><div class="status-badges"><span class="status-badge ${status.tone}">${escapeHtml(status.text)}</span>${follow}</div></td>
      </tr>`;
    })
    .join("");
}

function saveCurrentMeasure() {
  if (!selectedPersonKey) return;
  const weight = Number(els.measureWeight.value);
  const height = Number(els.measureHeight.value);
  const date = els.measureDate.value;
  if (!date || !weight || !height) {
    els.measureMessage.textContent = "กรุณากรอกวันที่ น้ำหนัก และส่วนสูง";
    return;
  }
  const store = measureStore();
  store[selectedPersonKey] = store[selectedPersonKey] || [];
  const existingIndex = store[selectedPersonKey].findIndex((item) => item.date === date);
  const entry = { date, weight, height, savedAt: new Date().toISOString() };
  if (existingIndex >= 0) store[selectedPersonKey][existingIndex] = entry;
  else store[selectedPersonKey].push(entry);
  saveMeasureStore(store);
  openPersonDialog(selectedPersonKey);
  els.measureMessage.textContent = "บันทึกสำเร็จ";
}

function chart(id, type, data, options = {}) {
  if (charts[id]) charts[id].destroy();
  charts[id] = new Chart(document.querySelector(`#${id}`), {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true } },
      },
      scales:
        type === "doughnut"
          ? undefined
          : {
              x: { grid: { display: false }, border: { display: false } },
              y: { beginAtZero: true, ticks: { precision: 0 }, border: { display: false }, grid: { color: "rgba(22,33,29,.08)" } },
            },
      ...options,
    },
  });
}

function monthKey(record) {
  return record.screenedDate ? record.screenedDate.slice(0, 7) : null;
}

function updateCharts(list, byVillage, total) {
  const labels = villages.map((v) => `หมู่ ${v}`);
  chart("patientsBar", "bar", {
    labels,
    datasets: [
      {
        label: "ผู้รับการคัดกรองกลุ่ม DM / HT / DM+HT",
        data: villages.map((v) => byVillage[v].dm + byVillage[v].ht + byVillage[v].both),
        backgroundColor: colors.dm,
        borderRadius: 10,
        maxBarThickness: 36,
      },
    ],
  });

  chart(
    "riskDoughnut",
    "doughnut",
    {
      labels: ["ปกติ", "เสี่ยง", "DM", "HT", "DM+HT"],
      datasets: [
        {
          data: [total.normal, total.risk, total.dm, total.ht, total.both],
          backgroundColor: [colors.normal, colors.risk, colors.dm, colors.ht, colors.both],
          borderWidth: 4,
          borderColor: "#ffffff",
        },
      ],
    },
    { cutout: "68%" }
  );

  const monthly = {};
  for (const record of list) {
    const key = monthKey(record);
    if (key) monthly[key] = (monthly[key] || 0) + 1;
  }
  const monthLabels = Object.keys(monthly).sort();
  chart("monthlyLine", "line", {
    labels: monthLabels,
    datasets: [
      {
        label: "คัดกรอง",
        data: monthLabels.map((m) => monthly[m]),
        borderColor: colors.screened,
        backgroundColor: "rgba(18,139,150,.16)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: colors.screened,
        pointRadius: 4,
        fill: true,
        tension: 0.35,
      },
    ],
  });

  chart(
    "stackedVillage",
    "bar",
    {
      labels,
      datasets: [
        { label: "DM", data: villages.map((v) => byVillage[v].dm), backgroundColor: colors.dm, borderRadius: 8 },
        { label: "HT", data: villages.map((v) => byVillage[v].ht), backgroundColor: colors.ht, borderRadius: 8 },
        { label: "DM+HT", data: villages.map((v) => byVillage[v].both), backgroundColor: colors.both, borderRadius: 8 },
      ],
    },
    { scales: { x: { stacked: true, grid: { display: false }, border: { display: false } }, y: { stacked: true, beginAtZero: true, ticks: { precision: 0 }, border: { display: false }, grid: { color: "rgba(22,33,29,.08)" } } } }
  );

  const metabolicRisk = metabolicRiskByVillage(list);
  chart(
    "metabolicRiskVillage",
    "bar",
    {
      labels,
      datasets: [
        { label: "BMI ≥ 25", data: villages.map((v) => metabolicRisk.byVillage[v].bmiHigh), backgroundColor: colors.risk, borderRadius: 8 },
        { label: "รอบเอวเกิน", data: villages.map((v) => metabolicRisk.byVillage[v].waistHigh), backgroundColor: colors.waist, borderRadius: 8 },
        { label: "DTX ≥ 100", data: villages.map((v) => metabolicRisk.byVillage[v].dtxHigh), backgroundColor: colors.dm, borderRadius: 8 },
      ],
    },
    { scales: { x: { stacked: true, grid: { display: false }, border: { display: false } }, y: { stacked: true, beginAtZero: true, ticks: { precision: 0 }, border: { display: false }, grid: { color: "rgba(22,33,29,.08)" } } } }
  );

  chart(
    "substanceRiskVillage",
    "bar",
    {
      labels,
      datasets: [
        { label: "ยาสูบ", data: villages.map((v) => metabolicRisk.byVillage[v].smoking), backgroundColor: "#52615a", borderRadius: 8 },
        { label: "สุรา", data: villages.map((v) => metabolicRisk.byVillage[v].alcohol), backgroundColor: colors.amber || colors.risk, borderRadius: 8 },
      ],
    },
    { scales: { x: { stacked: true, grid: { display: false }, border: { display: false } }, y: { stacked: true, beginAtZero: true, ticks: { precision: 0 }, border: { display: false }, grid: { color: "rgba(22,33,29,.08)" } } } }
  );

  chart("saltRiskVillage", "bar", {
    labels,
    datasets: [
      {
        label: "อาหารเค็ม / โซเดียมสูง",
        data: villages.map((v) => metabolicRisk.byVillage[v].saltHigh),
        backgroundColor: colors.amber,
        borderRadius: 10,
        maxBarThickness: 36,
      },
    ],
  });

  chart("bmiAnalysisVillage", "bar", {
    labels,
    datasets: [
      {
        label: "BMI เกิน",
        data: villages.map((v) => metabolicRisk.byVillage[v].bmiHigh),
        backgroundColor: colors.risk,
        borderRadius: 10,
        maxBarThickness: 34,
      },
    ],
  });

  chart("waistAnalysisVillage", "bar", {
    labels,
    datasets: [
      {
        label: "รอบเอวเกิน",
        data: villages.map((v) => metabolicRisk.byVillage[v].waistHigh),
        backgroundColor: colors.waist,
        borderRadius: 10,
        maxBarThickness: 34,
      },
    ],
  });
}

function dateLabel(start, end, name) {
  if (!start && !end) return name;
  const th = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" });
  return `${name}: ${start ? th.format(start) : "-"} ถึง ${end ? th.format(end) : "-"}`;
}

function render() {
  const screenedList = filteredRecords();
  const popList = filteredPopulation();
  const { total, byVillage } = summarize(screenedList, popList);
  const [start, end, name] = currentRange();
  updateKpis(total);
  updateExecutiveSummary(total, byVillage);
  updateExecutiveBoard(total, byVillage, screenedList);
  updateTable(byVillage);
  updateLeaderboard(byVillage);
  updateVillageCoverageRanking(byVillage);
  updateMetabolicRiskDashboard(screenedList);
  updateBodyAnalysisDashboard(screenedList);
  renderHouseholdMap();
  renderVhvRegistry();
  updateFollowupPlan(screenedList);
  updateDataQuality();
  updateCharts(screenedList, byVillage, total);
  updateRegistry(screenedList);
  els.activeRange.textContent = dateLabel(start, end, name);
  document.querySelectorAll(".custom-date").forEach((node) => {
    node.style.display = els.rangeMode.value === "custom" ? "grid" : "none";
  });
}

function init() {
  els.sourceInfo.textContent = `${meta.populationSourceFile} (${meta.populationExportedAt}) + ${meta.screenedSourceFile} (${meta.screenedExportedAt})`;
  els.totalRecords.textContent = fmt(records.length);
  els.populationTotal.textContent = fmt(population.length);
  for (const v of villages) {
    els.villageFilter.insertAdjacentHTML("beforeend", `<option value="${v}">หมู่ ${v}</option>`);
    els.followupVillageFilter.insertAdjacentHTML("beforeend", `<option value="${v}">หมู่ ${v}</option>`);
    els.mapVillageFilter.insertAdjacentHTML("beforeend", `<option value="${v}">${villageNames[v]}</option>`);
    els.vhvRegistryVillageFilter.insertAdjacentHTML("beforeend", `<option value="${v}">${villageNames[v]}</option>`);
  }
  const [fyStart, fyEnd] = fiscalBounds();
  els.startDate.value = iso(fyStart);
  els.endDate.value = iso(fyEnd);
  render();
}

els.rangeMode.addEventListener("change", render);
els.startDate.addEventListener("change", render);
els.endDate.addEventListener("change", render);
els.populationImport.addEventListener("change", () => {
  if (!registryUnlocked) {
    alert("กรุณา login admin ก่อนนำเข้าไฟล์ประชากรจาก SRR7");
    els.populationImport.value = "";
    return;
  }
  const file = els.populationImport.files?.[0];
  if (file) importPopulationFile(file);
});
els.screeningImport.addEventListener("change", () => {
  if (!registryUnlocked) {
    alert("กรุณา login admin ก่อนนำเข้าไฟล์คัดกรองจาก SRR7");
    els.screeningImport.value = "";
    return;
  }
  const file = els.screeningImport.files?.[0];
  if (file) importScreeningFile(file);
});
els.followupVillageFilter.addEventListener("change", render);
els.qualityIssueFilter.addEventListener("change", render);
els.mapVillageFilter.addEventListener("change", render);
els.mapVolunteerFilter.addEventListener("change", render);
els.vhvRegistryVillageFilter.addEventListener("change", render);
els.vhvRegistryRows.addEventListener("click", (event) => {
  const button = event.target.closest(".map-focus");
  if (!button) return;
  els.mapVillageFilter.value = button.dataset.village;
  render();
  els.mapVolunteerFilter.value = button.dataset.volunteer;
  renderHouseholdMap();
  location.hash = "#household-map";
});
els.villageFilter.addEventListener("change", () => {
  els.registryVolunteerFilter.value = "all";
  render();
});
els.registryAddressFilter.addEventListener("input", render);
els.registryVolunteerFilter.addEventListener("change", render);
els.clearRegistryFilters.addEventListener("click", () => {
  els.registryAddressFilter.value = "";
  els.registryVolunteerFilter.value = "all";
  render();
});
els.exportRegistry.addEventListener("click", exportRegistryExcel);
els.exportVillageSheets.addEventListener("click", exportRegistryByVillageSheets);
els.exportMeetingPack.addEventListener("click", exportMeetingPack);
els.printRegistry.addEventListener("click", printRegistryList);
els.printFieldForm.addEventListener("click", printFieldWorkForm);
els.registryRows.addEventListener("click", (event) => {
  const button = event.target.closest(".person-open");
  if (!button) return;
  openPersonDialog(idToKey(button.dataset.person));
});
els.registryRows.addEventListener("change", (event) => {
  const select = event.target.closest(".follow-status-select");
  if (!select) return;
  setFollowStatus(idToKey(select.dataset.person), select.value);
  render();
});
els.saveMeasure.addEventListener("click", saveCurrentMeasure);
els.personDialog.addEventListener("close", () => {
  for (const chart of Object.values(personCharts)) chart.destroy();
  personCharts = {};
});
els.registryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeRegistry = tab.dataset.registry;
    els.registryAddressFilter.value = "";
    els.registryVolunteerFilter.value = "all";
    els.registryTabs.forEach((item) => item.classList.toggle("active", item === tab));
    render();
  });
});
els.registryLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = els.registryUsername.value.trim();
  const password = els.registryPassword.value;
  if (username === REGISTRY_AUTH.username && password === REGISTRY_AUTH.password) {
    registryUnlocked = true;
    sessionStorage.setItem("srr7-registry-auth", "ok");
    els.registryPassword.value = "";
    els.loginMessage.textContent = "";
    render();
    return;
  }
  els.loginMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
});
els.logoutRegistry.addEventListener("click", () => {
  registryUnlocked = false;
  sessionStorage.removeItem("srr7-registry-auth");
  els.registryUsername.value = "";
  els.registryPassword.value = "";
  render();
});

init();
