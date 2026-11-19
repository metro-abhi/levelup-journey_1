/* Slide content, taken from the squads' own slides in DC_FY26_Level_Up_Template (deck slide numbers in `src`).
   Wording is kept as the squads wrote it; only spelling slips are corrected.
   Section keys: succ = Successes, harm = Harmonization, basics = Fixing the basics, proj = Projects, next = FY26/27 next, say, ask.
   Items: "text" | "text ¦ to confirm" | { t: bold lead, s: status line, sub: [..], f: to confirm, go: slide id }. */
const SCENES = [
  { name: "Arrival", view: "The store from outside" }, { name: "Join", view: "Customer service desk" }, { name: "Discover", view: "The promo hall" },
  { name: "Find & choose", view: "First person, down the aisle" }, { name: "Order · pay · receive", view: "Checkout and loading dock" },
  { name: "In the customer's pocket", view: "First person, the app in hand" }, { name: "Beyond the shop", view: "The campus" },
  { name: "The engine room", view: "Under the shop floor" }, { name: "One platform", view: "The map" }, { name: "Next steps", view: "The climb from the roof" }
];

const KEYS = {
  succ: { label: "Successes", icon: "trophy", col: "#FFB81C", txt: "#7A5200", on: "#003D7C" },
  harm: { label: "Harmonization", icon: "harmonize", col: "#003D7C", txt: "#003D7C", on: "#FFD84A" },
  basics: { label: "Fixing the basics", icon: "fix", col: "#1F6FD1", txt: "#1F6FD1", on: "#FFFFFF" },
  proj: { label: "Projects", icon: "launch", col: "#00A3E0", txt: "#0A6FA0", on: "#FFFFFF" },
  next: { label: "FY26/27 next", icon: "roadmap", col: "#5AA2FF", txt: "#1F5AA8", on: "#003D7C" },
  say: { label: "Tareq says", icon: "bubble", col: "#FFB81C", txt: "#7A5200", on: "#003D7C" },
  ask: { label: "Asks", icon: "question", col: "#E58A00", txt: "#8A5200", on: "#FFFFFF" }
};

const T = ["Tareq Sewail", "Digital Commerce"], CS = ["Cosmin Stefanescu", "Digital Commerce Report"];
const lead = (squad, name, note) => name ? [name, squad, 0, note] : ["Squad lead", squad, 1];

const SLIDES = [
  { id: "cover", scene: 0, type: "cover", title: "Level Up", sub: "Digital Commerce · FY26 review & FY26/27 outlook",
    tag: "Digital Commerce · FY25/26 milestones · FY26/27 next", meta: "Yearly meeting with Matthias · 23.11.2026 · 09:30 · DE DUS 01.08.77" },

  /* ---------------- 0 · ARRIVAL ---------------- */
  { id: "report", icon: "report", scene: 0, type: "report", tag: "Opening · 01 Digital Commerce Report", title: "Digital Commerce Report", sub: "One stop overview of platform KPIs", src: "4", link: ["Open the live report", "https://datastudio.google.com/s/pD0svjA69mQ"],
    who: [T, CS],
    ticks: ["Digital Sales increased by 23% vs. PY, reaching a share of 16.1%", "The number of active buying digital identities increased by almost 30%", "We reached 5.4M Companion users"],
    kpis: [
      { id: "ds", h: "Digital Sales", v: 16.1, u: "%", d: 1, g: "+21.6%", m: { val: 16.1, max: 20, tgt: 17.2, lab: "share of sales · 1.1 pp below target" } },
      { id: "fsd", icon: "delivery", h: "FSD Digital Sales", v: 4.0, u: "bn €", d: 1, g: "+23.3%", split: [["M.Shop & local solutions", 67.5, "2.7bn €", "+15.5%"], ["Companion", 32.5, "1.3bn €", "+43.4%"]] },
      { id: "pde", h: "PDEs", v: 606.1, u: "m", d: 1, g: "+23.8%", m: { val: 108.2, max: 120, tgt: 100, lab: "108.2% target achievement" } },
      { id: "abi", h: "Active buying digital identities", v: 4.5, u: "m", d: 1, g: "+29.2%", m: { val: 34, max: 100, lab: "34.0% of all buying customers · +35.5%" } },
      { id: "cu", h: "Companion users", v: 5.4, u: "m", d: 1, g: "+34.8%", m: { val: 76.7, max: 100, lab: "76.7% of them buying · −2.8%" } }
    ],
    shots: [["report", "Digital Commerce Report · Platform KPIs · FY26"]] },

  { id: "dash1", icon: "app", scene: 0, type: "dash", view: "sales", tag: "Opening · M.Companion dashboard", title: "M.Companion dashboard · Sales", sub: "1 Oct 2025 – 30 Sept 2026 · all countries, all CTGs", src: "M.Companion dashboard (screenshot 18.11.2026)", who: [T],
    total: ["Total Sales (Digital and Store)", 1.5, "bn €", 1, "51.9%"],
    branches: [
      { n: ["Digital Sales", 1.4, "bn €", 1, "53.5%"], leaves: [["FSD", 1.3, "bn €", 1, "52.4%", "Report slide: Companion 1.3bn € +43.4% · Companion slide: 1.35bn € · +4.6% ¦ three different growth figures for the same sales: align the comparison period"], ["Metro Markets", 38.9, "m €", 1, "104.0%"]] },
      { n: ["Store Sales", 135.5, "m €", 1, "37.3%"], leaves: [["Shopping allowance", 103.3, "m €", 1, "48.3%"], ["Scan & Go", 32.2, "m €", 1, "10.7%"]] }],
    ctg: { h: "Total sales CTG share", parts: [["HoReCa", 92, "#F0B13C"], ["SCO + Trader", 8, "#9FC3EE"]], note: "Only the HoReCa share (92%) is labelled on the dashboard; SCO and Trader are shown together here" },
    shots: [["dash-sales", "M.Companion dashboard · Sales, with the daily trend"]] },

  { id: "dash2", icon: "app", scene: 0, type: "dash", view: "cust", tag: "Opening · M.Companion dashboard", title: "M.Companion dashboard · Customers", sub: "1 Oct 2025 – 30 Sept 2026 · all countries, all CTGs", src: "M.Companion dashboard (screenshot 18.11.2026)", who: [T],
    tiles: [["Active Customers", 4.6, "m", 1, "34.3%"], ["App Penetration of buying customers", 31.2, "%", 1, "23.8%"], ["# of FSD customers ordering", 88.9, "k", 1, "27.9%"], ["# of MM customers ordering", 84.2, "k", 1, "70.2%"]],
    ctg: { h: "Active customer CTG share", parts: [["SCO", 76.8, "#BFD8F5"], ["HoReCa", 17.7, "#F0B13C"], ["Trader", 5.5, "#12306B"]] },
    shots: [["dash-cust", "M.Companion dashboard · Customers, with the daily trend"]] },

  { id: "dash3", icon: "app", scene: 0, type: "dash", view: "pde", tag: "Opening · M.Companion dashboard", title: "M.Companion dashboard · Purchase driving events (PDEs)", sub: "1 Oct 2025 – 30 Sept 2026 · all countries, all CTGs", src: "M.Companion dashboard (screenshot 18.11.2026)", who: [T],
    pde: [195.9, "m", "PDE Events", "Matches the Companion squad slide: +41.4% PDEs (195m)"],
    events: [["articleDetails_feature", 59.7], ["assortmentSearch_search", 52.8], ["mShopBasket_addToBasket", 45.8], ["eCatalogs_feature", 17.2], ["mShopBasket_feature", 10.2], ["personalLists_addToList", 4.7], ["standard_login_success", 3.4], ["pwless_login_success", 0.5], ["add_card_success", 0.5], ["personalLists_createList", 0.3]],
    evnote: "Bar lengths traced from the dashboard chart (axis 0–60m); exact values are in the dashboard",
    shots: [["dash-pde", "M.Companion dashboard · PDEs, with the daily trend"]] },

  { id: "o2o", icon: "markets", scene: 0, type: "o2o", tag: "Opening · O2O sales report", title: "O2O · Online to Offline sales", sub: "O2O sales report", src: "9",
    who: [T],
    nums: [["148m €", "Total O2O sales", "▲ +35% vs. FY24/25"], ["85m €", "HoReCa O2O sales", "▲ +20% vs. FY24/25"], ["500K", "Buying customers", "▲ +21% vs. FY24/25"], ["44%", "Purchase within the same day", "▲ +1% vs. FY24/25"]],
    split: [["M.Companion", 66, "+31m € (+45%)"], ["M.Shop", 33, "+7.2m € (+17,3%)"], ["Catalogues · NextCMS", 1, "+47k € · +40k €"]],
    secs: [{ k: "succ", h: "How it developed vs PY", items: [
      "NextCMS has contributed to sales by 40k € (+22%)",
      "Digital catalogues have driven sales by 47k € (+18%) and are contributing via dynamic catalogues and product interactions",
      "33% was the contribution of M.Shop on sales with an uplift of 7.2m € (+17,3%)",
      "M.Companion attributed sales increased by 31m € (+45%). This represents 66% of the O2O sales."] }],
    shots: [["o2o-store", "From screen to store"]] },

  { id: "map", icon: "direction", scene: 0, type: "route", tag: "Agenda · Who presents", title: "Agenda: who presents what", sub: "Six parts · tap a part to jump to it", who: [T],
    route: [[1, "Digital Commerce Report", "Tareq Sewail · Cosmin Stefanescu"], [2, "Strategic Projects", "Punchout · AtP: Mikhail · B2B2C · AI.OC: Derya · AI Document validation: Christoph · AI PDLC: Annette · Harmonization: Cosmin · Juliet: Stefan · WSM: Bastian"],
      [3, "Fixing the basics", "Annkathrin Heinze · Chloe Lim"], [4, "Milestones & looking ahead", "Every squad shares its part"], [5, "Tech: under the hood", "Saghi"], [6, "Summary & asks", "Tareq Sewail"]] },

  /* ---------------- 1 · JOIN ---------------- */
  { id: "css1", icon: "service", scene: 1, squad: "Customer Self Service", period: "FY25/26 milestones", src: "100–103", who: [lead("Customer Self Service", "Christoph Franke")],
    nums: [["+13%", "Amount of SignUps compared to last FY", "Onboarding · September 2026"], ["+21%", "Amount of Business Registrations compared to last FY", "Onboarding · September 2026"], ["+24%", "Invited Cardholders compared to last FY", "Onboarding · September 2026"]],
    secs: [
      { k: "harm", h: "Harmonization", items: ["AT-GoLive", "HR - Metro Markets GoLive"] },
      { k: "succ", h: "Improvements CSS", items: [
        { t: "Personalized Account overview", s: "Activated in all countries", sub: ["Problem: Users might be lost or confused and they don’t know what features/service are available they might can benefit on."] },
        { t: "Asking for missing/outdated contact data + consent", s: "Activated in all countries", sub: ["Problem: Contact data plus marketing consent might be outdated in our customer master data. Therefore we ask the customer in case the data is missing or not had been updated for a longer time."] }] }],
    shots: [["css-account", "Personalized Account overview"], ["css-consent", "Missing/outdated contact data + consent"]] },

  { id: "css2", icon: "service", scene: 1, squad: "Customer Self Service", period: "FY25/26 milestones", src: "104–107", who: [lead("Customer Self Service", "Christoph Franke")],
    secs: [{ k: "succ", h: "Improvements CSS", items: [
      { t: "Verification of Email addresses and mobile numbers", s: "Email Verification live in 14 countries. Activation ongoing. Mobile activation starts soon.", sub: ["Problem: Unverified contact data can lead to legal GDPR cases and to a bad customer master data quality."] },
      { t: "Display of license information", s: "Activated in all countries using licenses", sub: ["Problem: As a METRO customer, certain purchases (e.g., alcohol, tobacco) require valid licenses. Customers needs to visit the store in order to get information about licenses they provided to METRO."] },
      { t: "More integrations... (Freshdesk, Dish)", s: "Activated in all countries", sub: ["Problem: As a METRO Customer I want to get easy access to Faq, help and support.", "As a METRO Customer I want to be informed about additional services."] },
      { t: "PoC AI Document Validation", s: "PoC testing in progress - Further iterations needed", sub: ["Problem: Validation of new Business Registrations are taking too long. Employee capacity is occupied by the validation activity."] }] }],
    shots: [["css-verify", "Verification of Email addresses and mobile numbers"], ["css-licence", "Display of license information"], ["css-menu", "More integrations (Freshdesk, Dish)"], ["css-done", "Business Registration"]] },

  { id: "css3", icon: "service", scene: 1, squad: "Customer Self Service", period: "FY26/27 next", src: "108", who: [lead("Customer Self Service", "Christoph Franke")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: ["Navigation Improvements – Flyout / FSD / Employee view", "Credit Assignment / Management", "Message Center"] },
      { k: "proj", h: "Projects", items: ["PoC AI Document Validation / Grace Period", "Migration to new Consent Management Platform", "Project Juliet Netherlands", "Digital Limited Shopping Permission (LSD)"] }] },

  /* ---------------- 2 · DISCOVER ---------------- */
  { id: "we1", icon: "web", scene: 2, squad: "Web Experience", period: "FY25/26 milestones", src: "50–51", who: [lead("Web Experience", "Stefan Trasca")],
    nums: [["+34%", "CTR*", "Personalised CCOV homepage · *KPIs measured in Germany (pilot country)"], ["+10%", "Login Rate*", "*KPIs measured in Germany (pilot country)"], ["12", "Countries rolled out"]],
    secs: [
      { k: "harm", h: "Harmonization · +11 core journeys", items: ["AT – CCOV, FSD, New customer registration", "CZ, SK, TR - Cash & Carry", "HR - Metro Markets", "KZ, HU, SK, CZ - OneShop"] },
      { k: "succ", h: "Personalised CCOV homepage", items: [{ t: "Fully personalised CCOV homepage based on:", sub: ["CTG (+45% more traffic to M.Shop)", "Customer Tier", "App usage (+10% more traffic to App page)", "Is FSD"] }] }],
    shots: [["web-home", "Web harmonization"], ["web-horeca", "HoReCa customer"], ["web-trader", "Trader customer"]] },

  { id: "we2", icon: "web", scene: 2, squad: "Web Experience", period: "FY25/26 milestones", src: "52–54", who: [lead("Web Experience", "Stefan Trasca")],
    nums: [["225K €", "O2O increased by 22% compared to FY25", "FY26 data covering all eligible countries"], ["1.13m €", "WSM Supplier media spend on M.WEB", "FY26 data covering all eligible countries"]],
    lanes: { h: "Add to Cart", cols: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR"], rows: [{ k: "succ", items: [["DEV DONE", 0, 2], ["DE Go-live", 2, 1], ["+17 countries live", 3, 1], ["TR", 4, 1], ["Country workshop", 5, 1], ["Roll-out inspiration & commerce pages", 7, 2]] }] },
    secs: [{ k: "succ", h: "Security & reliability", items: ["Upgrade of Sitecore Managed Cloud to 10.4 (latest version) to extend continuous support", "Migrated backend Single Sign-On to Entra ID", "Migrated APIs to Apigee (Integration Factory)", "Resolved over 30 high & critical security vulnerabilities", { t: "11/12 months of Availability over Platinum SLA", s: "Sitecore 10.4 migration: 2h 30m of intermittent downtime" }] }],
    shots: [["web-cart", "Add to Cart"], ["web-avail", "Availability · FY25/26"]] },

  { id: "we2b", icon: "web", scene: 2, squad: "Web Experience", period: "FY25/26 · Fix the basics", src: "45–47", who: [lead("Web Experience", "Stefan Trasca")],
    secs: [
      { k: "basics", h: "Contextual Geolocation", ch: 1, items: ["We request (geo)location only in context, and with clear reasoning that explains the benefit for customers.", "INT – FY25/26"] },
      { k: "basics", h: "Search store via MAPS API", ch: 1, items: ["We added intelligence to the Store search to match store data not only based on simple text search but rather via leveraging google maps API. This also unlocks search by customer’s zip code.", "It also sorts results based on distance from the identified Point of Interest", "INT – FY25/26"] },
      { k: "basics", h: "Pricing Display", ch: 1, items: [{ t: "Price / unit measurement & price / piece", s: "We started displaying price / unit measurement and price / piece" }, "Coherent experience with M.Shop and MM.", "INT – FY25/26"] }],
    shots: [["we-geo", "Contextual Geolocation"], ["we-maps", "Search store via MAPS API"], ["we-price", "Pricing Display"]] },

  { id: "we3", icon: "web", scene: 2, squad: "Web Experience", period: "FY26/27 next", src: "55", who: [lead("Web Experience", "Stefan Trasca")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [
        { t: "M.Web as a place where customers start buying", sub: ["IN PROGRESS · Flexible Hero Carousel which Inspires, Engages and Starts transactions", "Availability to promise, personal lists, store lists", "IN PROGRESS · Curated transactional pages for CTGs"] },
        { t: "Year of the customer", sub: ["Become a Customer rework", "Tier3 customers that did not buy"] },
        { t: "Legal", sub: ["IN PROGRESS · Save prospects in forms compliantly to smoothen the journey prospect to customer", "Bring energy labels to M.Web for both M.Shop and MM Product"] },
        "Propose long-term CMS strategy (Sitecore vs Storyblok)"] },
      { k: "proj", h: "Projects", items: [
        { t: "Consent Management Platform", s: "Implement OneTrust for Cookies & Privacy notice first in 3 pilot countries and then throughout" },
        { t: "New Header and Search experience", s: "Research and start a reworked experience across web touchpoints" },
        { t: "Juliet - NL", s: "Support NL to open up their new horeca focused metro brand" }] }] },

  { id: "cat1", icon: "catalogue", scene: 2, squad: "Digital Catalogues", period: "FY25/26 milestones", src: "86–87", who: [lead("Digital Catalogues", "Alessio Pace")],
    nums: [["+9", "Dynamic Catalogues", "in DE with a scalable and semi-automated process"], ["4.8m", "PDE", "+7% vs TGT thanks to enhancement of PDP UI"], ["~0.3m €", "O2O", "increased by 18% compared to FY25"], ["0.43m €", "WSM", "Supplier media spend on Catalogs"]],
    secs: [
      { k: "succ", h: "Customer experience", items: [{ t: "Dynamic Catalogues", s: "+9 in DE with a scalable and semi-automated process.", sub: ["BG, HR, HU, MD, RO and NL - Nov 26", "PL, PT, RS, TR, UA and CZ - Jan27", "AT SK HR - Feb27"] }, { t: "4.8m PDE", s: "+7% vs TGT thanks to enhancement of PDP UI." }, { t: "Add to cart and AtP", s: "FSD customers can add products to cart and stock is based on AtP in DE, IT, FR and ES" }] },
      { k: "succ", h: "Business impact", items: ["~0.3m € · O2O increased by 18% compared to FY25", "0.43m € · WSM Supplier media spend on Catalogs.", "+3 WSM placements were implemented. Two are placed based on catalogue length"] }],
    shots: [["cat", "Digital catalogue"]] },

  { id: "cat2", icon: "catalogue", scene: 2, squad: "Digital Catalogues", period: "FY26/27 next", src: "88", who: [lead("Digital Catalogues", "Alessio Pace")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "Integration of digital catalogues dashboard", s: "HBR1" }, { t: "IDAM to Entra ID migration", s: "HBR1" }, { t: "Performance Increase & Stability", s: "HBR1&2" }] },
      { k: "proj", h: "Projects", items: [{ t: "Juliet – METRO NL Digital catalogues", s: "HBR1&2 – Enable digital catalogues for NL METRO store" }, { t: "Roll out of Dynamic Catalogues", s: "HBR1 5 Countries – HBR2 5 countries" }, { t: "Shopping experience enhanced", s: "HBR1 Add to Cart rollout – HBR2 New UI Catalog View Launch" }] }] },

  /* ---------------- 3 · FIND & CHOOSE ---------------- */
  { id: "s1", icon: "search", scene: 3, squad: "Search", period: "FY25/26 milestones", src: "72–73",
    shots: [{ a: ["s-old", "Old design"], b: ["s-new", "New design · delivery address"] }], who: [lead("Search", "Bee Peng (Chloe) Lim")],
    nums: [["+4.3M", "In Revenue for FBT carousel in SRP", "All market · Q1 and Q2 FY 2026"], ["+0.7M", "WSM display banner campaign spend in M.SHOP Search and Category pages", "All market · FY2026"], ["3", "Improvements done", "All market · FY2026"]],
    secs: [
      { k: "succ", h: "Customer journey", items: ["All countries: Display FSD customer delivery address.", "RO: Different default assortments.", "CZ & SK: Display biggest bundle first."] },
      { k: "succ", h: "Stability", items: [{ t: "Fort Knox initiatives", sub: ["Closed 143 vulnerability tickets.", "Migrated 36 endpoints and 6 services from Clojure to Kotlin.", "Migrated from Harbor to GCP Artifact Registry."] }, { t: "Integration Factory initiatives", sub: ["Completed Apigee migration for M.SHOP Public API."] }] }] },

  { id: "s2", icon: "search", scene: 3, squad: "Search", period: "Customer journey improvement (FY25/26)", src: "73–75", who: [lead("Search", "Bee Peng (Chloe) Lim")], hint: "Tap a card to turn from problem to status",
    cards: [
      { k: "succ", h: "Customer delivery address", img: ["s-old", "Old design"], img2: ["s-new", "New design"], p: "Customers only see the delivery store and not their actual delivery addresses. This creates confusion on customers on which delivery address they have selected for their purchases.", st: "Display customer delivery address instead of Metro store. Went live on 05.08.2026 for 20 M.SHOP countries." },
      { k: "succ", h: "Different default assortments", img: ["s-ro", "RO assortments"], p: "In RO market, trader customers rely on both Metro delivery and dropshipment assortments to fulfill their supply needs. Due to drop shipment products are excluded from the default pre-selection, RO customers has reduced catalog visibility and a degraded purchasing experience.", st: "Metro delivery and dropshipment assortments pre-selected. Went live on 15.09.2026 in RO." },
      { k: "succ", h: "Biggest bundle is displayed first", img: ["s-bundle", "Biggest bundle"], p: "Based on bundle data in master data, smaller bundles may appear first on SRP. This leads to the better unit price in larger bundle less visible by customers in first glance.", st: "Display biggest bundle first. Went live on 02.10.2026 in CZ, SK. DE (still testing in PP)" }] },

  { id: "s2b", icon: "search", scene: 3, squad: "Search", period: "Fixing the basics (FY26/27)", src: "56–57", who: [lead("Search", "Bee Peng (Chloe) Lim")], hint: "Tap a card to turn from problem to status",
    secs: [
      { k: "basics", h: "Home button : Search", ch: 1, items: [{ t: "Problem", s: "Customers were not able redirect back to M.SHOP homepage. They were redirected back to Metro homepage instead (based on Metro/ Makro icon)" }, { t: "Root cause", s: "There is no dedicated button to redirect customers to M.SHOP homepage" }, { t: "Status", s: "Went live on 08.10.2026" }] },
      { k: "basics", h: "Freshdesk button : Search", ch: 1, items: [{ t: "Problem", s: "Currently, customer that need to be go to back to M.Web when they want to reach out for support. With this button introduced, customers can have better and less friction experience." }, { t: "Status", s: "Expected to be done by March 2027" }] }] },

  { id: "s3", icon: "search", scene: 3, squad: "Search", period: "FY26/27 next", src: "76", who: [lead("Search", "Bee Peng (Chloe) Lim")],
    nums: [["12s → 8s", "Page load performance", "33% improvement achieved in Oct 2026"]],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [
        { t: "Home Icon in M.SHOP (OCT 2026)", s: "Customers will redirect to M.SHOP homepage with a click." },
        { t: "Freshdesk support button in M.SHOP (TBD HBR1)", s: "Freshdesk support button that allow customer to ask questions and review FAQ throughout their journey." },
        { t: "Promotion filter capability (Discovery in HBR1, Implementation in HBR2)", s: "Enable customers to filter for all promotion article. Collaboration with M.Online Price and EV teams." },
        { t: "Improve page load performance (HBR1 + HBR2)", s: "Reduce tech debts to optimize on page load performance. 33% improvement (12s-> 8s) is achieved in Oct 2026." }] },
      { k: "proj", h: "Projects", items: [
        { t: "Vector Search", s: "Pilot with FR (PP test in Dec 2026 and Prod A/B test in Jan 2027). All 19 countries (exclude KZ) will be transition in 4 waves within FY2027.", go: "s4" },
        { t: "Sponsored Ads (SPA) in M.SHOP Search, Category & PDP", s: "SPA in M.Shop Search and Category page planned to be done in Dec 2026. SPA in PDP will be done in later stage (TBD)." },
        { t: "Project Juliet", s: "Support NL team for Makro / Metro brand transition" }] }] },

  { id: "s4", icon: "search", scene: 3, squad: "Search", period: "Vector Search · Timeline", src: "77–79", who: [lead("Search", "Bee Peng (Chloe) Lim")],
    lanes: { h: "Production roll out plan", cols: ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP"], rows: [{ k: "proj", items: [["Pilot · FR", 2, 2], ["Wave 1 · DE, NL, CZ, SK", 4, 2], ["Wave 2 · ES, IT, RO, MD", 6, 2], ["Wave 3 · HU, UA, PL", 8, 2], ["Wave 4 · AT, TR, PT, BG, HR, RS, PK", 10, 2]] }], foot: "Each wave starts in pre-prod · 2026 → 2027" },
    secs: [
      { k: "proj", h: "A/B test", items: [{ t: "Rollout", sub: ["15/85 (3 days sanity check)", "50/50 (3 weeks)"] }, { t: "KPIs (target to be +ve or at least neutral)", sub: ["Revenue", "Success rate", "Average rank of articles with success rate."] }, { t: "Guardrail", s: "STOP A/B test when we see +20% drop in 3 consecutive days in any of the KPIs." }] },
      { k: "basics", h: "Fixing the basics (FY26/27)", items: [{ t: "Home button", s: "Went live on 08.10.2026" }, { t: "Freshdesk button", s: "Expected to be done by March 2027" }] }],
    shots: [["s-home", "Home button"], ["s-fresh", "Freshdesk button"]] },

  { id: "ccov1", icon: "customer", scene: 3, squad: "CCOV", period: "FY25/26 milestones", src: "113", who: [lead("CCOV", "Annkathrin Heinze", "Confirm she presents CCOV (she also leads FSD Ordering)")],
    nums: [["+10,2 %", "O2O · 26.5 million (Total Sales)", "all countries · ’25 vs ’26"], ["65k", "MM integration · Metro Markets Sales initiated via M.SHOP MetroMarkets link", "DE, ES, FR, NL, PT · September-Mid November ¦ no unit on the deck (€? orders?) and an earlier draft showed 116k: confirm"], ["4.17%", "MM integration · CTR", "DE, ES, FR, NL, PT · September-Mid November"]],
    secs: [{ k: "succ", h: "Activations & Improvements", items: [
      { t: "Activated 4 features", sub: ["BMPL – all countries", "Stock availability – CZ, SK (activation ongoing)", "MM integration – DE, ES, FR, NL, PT", "Store List Filter – all countries"] },
      { t: "Tracking integration and improvements", sub: ["MM tracking event", "Store List Tracking", "Multi GTIN support"] },
      { t: "Backoffice improvements", sub: ["Visibility Rules for Store Lists"] }] }] },

  { id: "ccov2", icon: "customer", scene: 3, squad: "CCOV", period: "FY25/26 milestones · Customer experience", src: "114–117", who: [lead("CCOV", "Annkathrin Heinze", "Confirm she presents CCOV (she also leads FSD Ordering)")], hint: "Tap a card to see what changed",
    cards: [
      { k: "succ", h: "Display Stock Availability", img: ["ccov-stock", "Stock availability"], p: "Exact stock numbers instead of traffic lights for CCOV customers.", st: "Helps customers plan purchase quantities before visiting the store." },
      { k: "succ", h: "Displaying of BMPL", img: ["ccov-bmpl", "BMPL"], p: "BMPL labels in search results now show the lowest possible price, highlighting savings from buying more.", st: "Helps customers see the lowest possible price at first glance." },
      { k: "succ", h: "MM Availability Integration", img: ["ccov-mm", "Metro Markets"], p: "Link to MM if a product is available giving the possibility to order it.", st: "Gives customers the option to see in what channel the article is available and by that to select their preferred channel." },
      { k: "succ", h: "Filter Store Lists based on CTG", img: ["ccov-store", "Store lists"], p: "Store Lists can now be displayed to specific branches only.", st: "Offers our countries the option to target smaller customer groups with specific store lists" }] },

  { id: "ccov3", icon: "customer", scene: 3, squad: "CCOV", period: "FY26/27 next", src: "111", who: [lead("CCOV", "Annkathrin Heinze", "Confirm she presents CCOV (she also leads FSD Ordering)")],
    secs: [
      { k: "next", h: "Low-dependency Topics", items: ["BMPL", "Stock Availability", "MM Integration", "Enable Store Lists for Companion", "Alternative Store Availability"] },
      { k: "next", h: "Advanced Capabilities · Cross-Team Initiatives - Discovery", items: [
        { t: "Recently Bought", s: "Enable the customers to see which articles they recently bought in the store · HBR1" },
        { t: "Future Promotion", s: "Give the customers the possibility to view future promotion prices" },
        { t: "Leading Articles concept for CCOV", s: "Show Promotion/BMPL also for Leading Articles" },
        { t: "Alternative Store Availability", s: "HBR1" },
        { t: "Personal lists as instore shopping list", s: "Discovery HBR1 – implementation HBR2" },
        { t: "Define a homepage based on C&C customer needs", s: "Discovery HBR1 – implementation HBR2" },
        "Enable Store Lists by CTG"] },
      { k: "succ", h: "Backup slide · Availability in other stores component", items: ["Customers can check availability in other stores without changing their selected store.", "The feature covers Cash & Carry and Click & Collect articles, excluding FSD.", "INT – FY25/26"] }] },

  /* ---------------- 4 · ORDER · PAY · RECEIVE ---------------- */
  { id: "fsd1", icon: "delivery", scene: 4, squad: "FSD Ordering", period: "FY25/26 milestones", src: "57, 60", who: [lead("FSD Ordering", "Annkathrin Heinze")],
    nums: [["33K€", "WSM Supplier media spend on M.SHOP homepage", "All market · FY 2026"], ["+29%", "FSD Ordering PDEs", "All market · FY 2026"], ["193 → 29", "Critical + High vulnerabilities", "All market · FY2026"], ["4 → 1", "Reduction of different coding languages"]],
    secs: [
      { k: "succ", h: "Security and Stability", items: ["M.SHOP domains migrated to shared load balancer", "Migrated from Harbor to GCP Artifact Registry", { t: "Architecture rework", s: "Reworking our full backend architecture to:", sub: ["Be able to reduce vulnerabilities", "Reduce complexity and speed up development time"] }] },
      { k: "succ", h: "Customer Journey Improvements · 2 improvements done", items: [{ t: "Homepage Improvements", sub: ["Show Last order", "Show dynamic lists"] }, { t: "Personal list improvements", sub: ["Extend all", "Save quantities"] }] }] },

  { id: "fsd2", icon: "delivery", scene: 4, squad: "FSD Ordering", period: "FY25/26 milestones · Customer experience", src: "58–59", who: [lead("FSD Ordering", "Annkathrin Heinze")],
    nums: [["1.4% → 4.8%", "Add-to-basket share from dynamic lists"], ["5.3%", "Homepage visits to order details*", "*based on 07.05.–07.06. data, excluding exits from M.SHOP homepage"], ["5.5m → 5.8m", "FSD Ordering PDEs"]],
    secs: [
      { k: "succ", h: "Homepage improvements", items: ["Homepage shortcuts: CIP list, recently bought items and last order", "Redesigned Personal List tiles"] },
      { k: "succ", h: "Personal List improvements", items: [{ t: "Homepage Personal Lists – Making repeat ordering easier", sub: ["Expand / Collapse All categories", "Save quantities directly in Personal Lists", "Simplified bulk actions with Select All, Add to Cart & Delete"] }] }],
    shots: [{ a: ["fsd-before", "Before"], b: ["fsd-after", "After"] }, ["fsd-list", "Personal Lists"]] },

  { id: "fsd3", icon: "delivery", scene: 4, squad: "FSD Ordering", period: "FY26/27 next", src: "61", who: [lead("FSD Ordering", "Annkathrin Heinze")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "Improve frontend performance", s: "Faster page loads" }, { t: "Consistent pricing", s: "Across M.SHOP and M.Companion" }, { t: "Enhance Personal Lists", s: "Focus: PDEs and customer experience · HBR1 / HBR2" }, "Relevant store list previews", "Display only available products in store list product teaser"] },
      { k: "proj", h: "Projects", items: [{ t: "Technology modernization", sub: ["Complete Entra ID migration", "Complete PostgreSQL migration · ~€10K/month cost savings", "Expand automated frontend testing"] }, { t: "Consistent pricing Order Overview page", s: "Across M.SHOP and M.Companion" }, { t: "NOE Project", s: "Automated migration of Personal Lists to new NOE article references" }, { t: "Project Juliet", s: "Support NL team for Makro / Metro brand transition" }] }] },

  { id: "chk1", icon: "checkout", scene: 4, squad: "Customer Checkout", period: "FY25/26 milestones", src: "63–64", who: [lead("Customer Checkout", "Mikhail Rotenberg")],
    nums: [["+12", "AtP · 12 countries live / 7 FULLY live", "AtP enhanced, stabilised and rolled out to countries"], ["+48K", "Punchout · 6 countries are live for JW", "Development of the Punchout functionality and rollout with the Key Account customer ¦ +48K here, 125K€ on the Punchout project slide: same measure?"], ["+2", "AI.OC · DE and ES are live with AI.OC", "Development of the AI.OC functionality and running the MVP in DE and ES"]],
    secs: [
      { k: "succ", h: "FY25/26 other milestones", items: [
        { t: "Business · Customer Checkout Journey improvements & Legal requirements implementation:", s: "▲ +6 features vs FY24/25 ▲ eExcise, Abandoned Carts export, MOV, COT, etc.", sub: ["Active Orders export", "eExcise Tax in UA", "Cut-Off time visibility", "Min Order Value visibility"] },
        { t: "Tech · Take over Login from FSD Ordering", s: "▲ Full ownership handover, from ktor to DW migration, Alerts reduction to 25" },
        { t: "Tech · Tech performance and stability improvements", s: "▲ React 19 migration, unload Bootstrap CSS, Java 21 upgrade, DW5 rollout" },
        { t: "Team · Other teams and global projects support", s: "▲ DnR Labels, WSM, EntraId, etc." }] },
      { k: "succ", h: "What drove it", items: ["Constantly deliver Customer Checkout journey improvements (from small to big one, but always improve)", "Keeping the Tech Debt low and vulnerabilities under control", "Acting as a Team Players, supporting others towards the overall Platform success"] }] },

  { id: "chk2", icon: "checkout", scene: 4, type: "atp", squad: "Customer Checkout", tag: "02 Strategic projects · Availability to Promise", period: "AtP · Availability to Promise · Countries Rollout", sub: "Goal: Increase digital sales by improving trust from customers through strengthen the operational stability & predictability", src: "13", who: [lead("Customer Checkout", "Mikhail Rotenberg")],
    status: [["all", "Live in all stores", "CZ SK PL DE ES PT", "#12A06A"], ["almost", "Live in most stores", "UA IT", "#5BC08A"], ["pilot", "Live in pilot stores", "FR IT", "#FFB81C"], ["test", "In testing", "AT NL KZ BG HR RS TR RO", "#5AA2FF"], ["none", "Not involved", "MD PK", "#AEB9C8"]],
    secs: [
      { k: "succ", h: "FY26 | Scale and Stabilize · 6 countries all stores", items: [{ t: "Project matured:", s: "all required logic & important features are delivered." }, { t: "Rollout progressed:", s: "CZ, SK, PL, DE, ES, PT live in all stores" }, { t: "AtP support in DC Solutions:", s: "M.SHOP, EV, M.Companion · D.Catalogues (via Add to Cart) in DE, IT, FR, ES · M.Web - planned in FY27 QBR1" }] },
      { k: "proj", h: "FY27 | Complete and Standardize · 18 countries all stores", items: ["Complete rollout", "Resolve prerequisites", "Matured reporting", "One operating model from Oct27", { t: "Oct-Nov", s: "FR, NL – Live in all stores" }, { t: "Dec-Mar", sub: ["Activate as many countries as possible from: HR, RS, TR, RO, BG", "Activate remain stores in UA(13), IT(3), HU"] }, { t: "Apr-Sep", sub: ["Activate AT in June", "Activate remain countries and stores"] }] },
      { k: "ask", h: "Open Topics", items: ["MD, PK – Do we need to proceed?", "RO – Deactivated AtP after full activation. Requirements specific. How to convince country to go live?", "IT is listed as both “most stores” and “pilot stores”, and HU is in no row (but in “activate remain stores”) ¦ the deck table needs a fix: confirm with Mikhail"] }] },

  { id: "chk3", icon: "checkout", scene: 4, squad: "Customer Checkout", period: "FY26/27 next", src: "67", who: [lead("Customer Checkout", "Mikhail Rotenberg")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "Introduce Checkout in API for M.Companion", s: "Native Checkout implementation · HBR1" }, { t: "Improve the “you usually also buy”", s: "HBR1" }, { t: "Variety of Customer Checkout improvements", s: "HBR1 (+3 features) / HBR2 (plan in March)" }] },
      { k: "proj", h: "Projects", items: [{ t: "Subscription/Recurring orders PoC and rollout", s: "HBR1 / HBR2 · PoC in FR, potential in NL, DE, CZ, SK" }, { t: "Availability to Promise", s: "HBR1 / HBR2 · Live in ALL stores in ALL countries" }, { t: "Spreading of Punchout and AI.OC", s: "HBR1 / HBR2 · Rollout in more countries and customers" }, { t: "Loyalty Points Redemption", s: "HBR1 / HBR2 – Marketing Platform's LSCC Initiative" }, { t: "Resolve the orders set to Pending status due to the Comments", s: "HBR1 / HBR2" }] }] },

  { id: "sp", icon: "strategy", scene: 4, type: "projects", tag: "02 Strategic projects · Summary", title: "Strategic projects", sub: "Summary", src: "10", who: [lead("Customer Checkout", "Mikhail Rotenberg"), lead("Order Management", "Derya Bak Ertürk")],
    table: [
      ["Punchout", "Increase Digital Sales via Integrating with Key Accounts", "6 countries in FY26", "Rollout in 15", "pc"],
      ["AtP", "Increase digital sales by improving trust from customers through strengthen the operational stability & predictability", "6 countries in FY26", "Rollout in remaining countries and stores - 18 countries in FY 27 (with ALL stores)", "chk2"],
      ["B2B2C", "Increase Digital Sales via Integrating with B2B2C Partners", "Integrate PL with Kosik", "PL Go-Live", "b2"],
      ["AI", "Implement AI relevant topics in our platform", "AI.Order Capture · AI.Document Validation · AI.PDLC", "Rollout · MVP · Rollout to other squads", "ai"],
      ["Harmonization", "Harmonize our solutions and decommission local", "Live in CZ/SK and AT (3stores) · Oneshop live", "Full rollout in AT", "h1"],
      ["Juliet", "Launch Metro brand in Makro NL", "WIP", "Launch pilot store in NL", "jul"],
      ["Wholesale Media", "Generate additional revenue for Metro countries", "3.3 million and FY25/26", "Roll out in the rest of the countries, expired inventory and achieve target", "wsm1"],
      ["Fixing the basics", "Less friction in existing customer journey", "Details follow in next slides", "Continuous improvement", "basics"]] },

  { id: "ai", icon: "idea", scene: 4, squad: "AI Order Capture", tag: "02 Strategic projects · AI Order Capture", period: "Achieved in FY26", sub: "AI creating M.SHOP Orders based on Emails from customers", src: "17", who: [lead("AI order capture", "Derya Bak Ertürk")],
    nums: [["154", "AI Orders", "submitted in ES and DE since go live in October"], ["ES & DE", "Live in", "Went live in ES and DE in October 2026"]],
    secs: [{ k: "succ", h: "What we did", items: ["AI.OC Project Kicked off in May 2026", "Solution design aligned with ES and DE.", "Email use case built in 2.5 months by M.SHOP and Accenture.", "Went live in ES and DE in October 2026"] }],
    shots: [["ai-orders", "AI Order Capture"], ["ai-chart", "AI orders since go live"]] },

  { id: "ai2", icon: "idea", scene: 4, squad: "AI Order Capture", tag: "02 Strategic projects · AI Order Capture", period: "Planned for FY27", sub: "Goal: AI.OC Rollout to next countries", src: "18", who: [lead("AI order capture", "Derya Bak Ertürk")],
    nums: [["~1.7 M€", "Value · KPI target", "Activated with AI.OC Email Use case"], ["10", "Countries p.a.", "KPI target · Email use case"]],
    lanes: { h: "Milestones", cols: ["Q1 · HBR1", "Q2 · HBR1", "HBR2"], rows: [{ k: "proj", items: [["ES-DE Rollout · ES-DE Automation", 0, 1], ["FR-IT Go live", 1, 1], ["Next 6 countries", 2, 1]] }] },
    secs: [
      { k: "proj", h: "Scope", items: ["Rollout in DE and ES", "FR and IT Kick off, UAT & go-live in next countries", "Plan next waves for countries with positive business case", { t: "Phone use case", s: "Clarification of next steps" }] },
      { k: "ask", h: "Risks · Needs · Team", items: [{ t: "Risks", s: "ES Attel rollout · Reduced number of positive case countries due to cost of AI" }, { t: "Needs", s: "M.SHOP Checkout team capacities for PP and Prod Prep, UAT support for rollout, Maintenance and ticket support in Prod." }, { t: "Team", s: "M.SHOP Checkout Squad · CSO AI Enablement Team" }] }] },

  { id: "aip1", icon: "idea", scene: 4, squad: "AI PDLC – AI Support Agent", tag: "02 Strategic projects · AI PDLC", period: "The fastest way to solve an incident? Spend less time on locating the issue.", sub: "Goal: Save time in Incident Management", src: "17–18", who: [lead("AI support agent", "Annette Huhn")],
    nums: [["~83%", "less incident handling time", "KPI target"], ["30 → 5", "minutes / ticket", "30min / ticket → 5 minutes / ticket"], [">150", "tickets Jan-Jun 2026", "Evaluate received >150 tickets between Jan-Jun 2026, with 80+% triage, analyze & dispatch tickets"]],
    lanes: { h: "Milestones", cols: ["July 20th 2026", "Sept. 11th 2026", "HBR1", "HBR2"], rows: [{ k: "succ", items: [["AI PDLC Kickoff", 0, 1], ["Support Agent MVP established in Evaluate", 1, 1]] }, { k: "proj", items: [["Knowledge Sharing in Digital Commerce", 2, 1], ["Rollout to other Squads in Digital Commerce", 3, 1]] }] },
    secs: [
      { k: "proj", h: "Scope", items: ["The goal was to create an end-to-end agentic ticket handling workflow capable of taking incoming support tickets, investigating them, classifying them and proposing an actionable solution", { t: "Team", s: "Evaluate API · Evaluate Pipeline" }] },
      { k: "succ", h: "Success criteria", items: ["Correctly classify 80% of incoming tickets and propose next steps for the handler", "Resolve 80% of triage, analyze & dispatch tickets autonomously through the agent (up to solution proposal)"] }] },

  { id: "aip2", icon: "idea", scene: 4, squad: "AI PDLC – AI Support Agent", tag: "02 Strategic projects · AI PDLC", period: "Achievements · Next steps", src: "19", who: [lead("AI support agent", "Annette Huhn")],
    secs: [
      { k: "succ", h: "Achievements", items: ["Tested and Implemented end-to-end MVP workflow capable of handling triage, analyze & dispatch tickets autonomously – continuously working on incoming tickets", "Automated vulnerability resolution set up within the Evaluate GitHub repositories (supporting the Fort Knox initiative)", "Developed workflows for proposal of config changes and code changes – agents investigate bugs and open JIRA ticket with instructions for potential fix", "Modularized workflow and handed it off to the AI platform team for roll-out with broader Metro organization"] },
      { k: "proj", h: "Next steps", items: ["Continue to maintain and improve the Evaluate incident resolution workflow", "Set up workshop for Digital Commerce Platform and help other Squads to build their AI Support Agents", "Connect directly to ServiceNow (currently directly connected to Jira, manually fed from ServiceNow tickets)"] }] },

  { id: "bac", icon: "idea", scene: 4, squad: "BaC: AI Business document validation", tag: "02 Strategic projects · BaC", period: "Planned in FY27", sub: "Goal: Evaluate the PoC -> Implementation & Activation in countries", src: "20", who: [lead("Customer Self Service", "Christoph Franke", "Team on the deck is M.Customer Self Service + AI Engineering Team: confirm who presents")],
    nums: [["~700k", "annual savings", "KPI target · + additional revenue for sooner purchases"]],
    lanes: { h: "Milestones", cols: ["Q1 · HBR1", "Q2 · HBR1", "Q3 · HBR2", "Q4 · HBR2"], rows: [{ k: "proj", items: [["PoC Validation", 0, 1], ["FR PROD implementation", 1, 1], ["Further country implementations", 2, 1], ["Further country activations", 3, 1]] }] },
    secs: [
      { k: "proj", h: "Scope", items: ["Automate the validation of business registration documents", "Testing of PoC", "Clarification on AI Ownership", "Research with countries for automation steps", "Combination with the Grace Period topic", { t: "Team", s: "M.Customer Self Service · AI Engineering Team" }] },
      { k: "ask", h: "Risks · Needs", items: [{ t: "Risks", sub: ["PoC outcome not satisfying like false approvals, takes too long etc.", "Too high country document complexity", "Potential new local integrations needed", "Legal objections for processing personal information with AI"] }, { t: "Needs", sub: ["Support on AI Ownership / Design council process", "Country support"] }] }] },

  { id: "pc", icon: "unlock", scene: 4, squad: "Punchout", tag: "02 Strategic projects · Punchout", period: "Achieved in FY26", sub: "Electronic ordering integration with Key Account Customers", src: "19", who: [lead("Punchout", "Mikhail Rotenberg")],
    nums: [["237", "Orders", "LIVE IN JW Locations: ES, PT, RO, MD, BG, RS"], ["125K€*", "Order total amount", "*Order total amount since April until 16th November 2025 ¦ deck says 2025, but go-live was June 26: confirm the year"]],
    secs: [{ k: "succ", h: "What we did", items: ["Development of Punchout ordering.", "Close alignment with JW customer team for implementation and testing and rollout.", "Went live in June 26 in ES, rolled out to 6 countries with JW."] }],
    shots: [["erp", "Electronic ordering integration"]] },

  { id: "pc2", icon: "unlock", scene: 4, squad: "Punchout", tag: "02 Strategic projects · Punchout", period: "Planned in FY27", sub: "Goal: Rollout JW in 11 more countries · Integrate further Key Account Customers", src: "12", who: [lead("Punchout", "Mikhail Rotenberg")],
    nums: [["~+1M€", "Digital FSD Sales p.a.", "KPI target · When we complete JW rollout activate Punchout"], ["~15", "Countries", "JW rollout"]],
    lanes: { h: "Milestones", cols: ["FY26", "Oct-Dec · HBR1", "Jan-Feb · HBR1", "HBR1-HBR2"], rows: [{ k: "succ", items: [["JW (ES,PT,RO,MD)", 0, 1]] }, { k: "proj", items: [["JW (BG,RS,TR,NL,DE,HU,HR/SI)", 1, 1], ["JW (PL,IT,CZ,SK)", 2, 1], ["Rollout to next customers", 3, 1]] }], foot: "BG and RS are “live” on the Punchout FY26 slide but planned for Oct-Dec here: confirm" },
    secs: [
      { k: "proj", h: "Scope", items: ["JW rollout: ~15 countries", "Onboard additional strategic Key Account customers", "Increase Punchout order volume", "Establish repeatable onboarding process", "Look into UX improvements, stability and operational readiness", { t: "Teams", s: "M.SHOP Checkout Squad · M.SHOP Order Management Squad · IDAM" }] },
      { k: "ask", h: "Risks · Needs", items: [{ t: "Risks", s: "In case of new Customers requests Punchout Level 2 it will not be supported without additional effort not yet planned" }, { t: "Needs", s: "Collaborate with Key Account Manager and Sales Excellence teams to push Punchout as a sales opportunity" }] }] },

  { id: "b2", icon: "squads", scene: 4, room: 10, squad: "B2B2C", tag: "02 Strategic projects · B2B2C", period: "Planned for FY27", sub: "Set up MCC PL and Kosik integration with new B2B2C order lifecycle and invoicing in M.SHOP OM", src: "21", who: [lead("B2B2C", "Derya Bak Ertürk")],
    nums: [["~+100 M€", "Digital Sales", "KPI target"], ["5", "Countries p.a.", "KPI target"]],
    lanes: { h: "Milestones", cols: ["Q1 · HBR1", "Q2 · HBR1", "Q3 · HBR2", "HBR2"], rows: [{ k: "proj", items: [["PL & Kosik Development & Go-Live", 0, 1], ["PL Rollout and CZ & Kosik Prep", 1, 1], ["CZ & Kosik Go live", 2, 1], ["Next countries", 3, 1]] }] },
    secs: [
      { k: "proj", h: "Scope", items: ["B2B2C Order Lifecycle and Invoicing development", "Support Kosik-PL integration tests", "Go-live in PL", "Work on Kosik-CZ prerequisites", "Go-live in CZ", "Plan next countries (HU, PT, UA)"] },
      { k: "ask", h: "Risks · Needs", items: [{ t: "Risk", s: "UA B2B2C Partner does not want to invest in tech changes" }, { t: "Needs", s: "M.SHOP OM and EV capacities to develop and support integration" }, { t: "Team", s: "M.SHOP Order Management Squad · Evaluate Squad · Other Platforms" }] }] },

  { id: "om1", icon: "ordermgmt", scene: 4, room: 10, squad: "Order Management", period: "FY25/26 milestones", src: "69", who: [lead("Order Management", "Derya Bak Ertürk")],
    nums: [["14.5M", "Orders in FY26", "17% more orders · meanwhile number of orders increasing"], ["20% less", "incidents*", "UI improvements · All countries · FY2026 · *excluding Security findings"], ["811 → 650", "incidents · FY25 → FY26", "811 in FY25 dropped to 650 FY26"], ["1", "Country · Order Reminder Notifications", "FR is live"], ["37", "OM services migrated", "Dropwizard migration · All OM Services · FY2026"]],
    secs: [{ k: "succ", h: "FY25/26 milestones", items: [
      { t: "UI improvements", s: "Reduce SDCorps by improving OM and Invoice UI to give transparency and enable users resolve issues themselves" },
      { t: "Order Reminder Notifications", s: "Order reminder push notification to M.Companion · Rollout planned after frozen zone" },
      { t: "Tech · Dropwizard migration", s: "Migration of all OM services from MS-Core to Dropwizard. Benefits are automatic updates, better security and less maintenance effort", sub: ["37 OM services migrated"] }] }] },

  { id: "om2", icon: "ordermgmt", scene: 4, room: 10, squad: "Order Management", period: "FY26/27 next", src: "70", who: [lead("Order Management", "Derya Bak Ertürk")],
    secs: [{ k: "proj", h: "Legal changes & tech projects · HBR1 / HBR2", items: [
      { t: "RS Returns eDelivery Note", s: "Create delivery note files for returns for RS government tool integration" },
      { t: "MuleSoft migration / MIP decommissioning", s: "Decommissioning MIP integration for multiple flows (Dropshipment, Parcel, Invoicing) with Integration Platform" },
      { t: "MPOS Air Integration", s: "Discovery and Development of integrating invoicing process with MPOS Air" },
      { t: "EntraID Migration", s: "Development of integrating with EntraID for user authentication" }] },
      { k: "proj", h: "Projects · HBR1 / HBR2", items: [
      { t: "B2B2C Order Lifecycle, Invoicing and APIs", s: "Enable MCC PL-Kosik integration & increase Digital Sales, rollout to CZ and others" },
      { t: "Loyalty Points Redemption", s: "Marketing Platform's LSCC Initiative" },
      { t: "Multiple Payments for FSD invoices", s: "CZ Legal need that can reduce extra operational steps for payments booking for all countries" },
      { t: "NOE Project", s: "Run Order Update scripts in various waves for FR Fresh articles master data update" }] }] },

  /* ---------------- 5 · IN THE CUSTOMER'S POCKET ---------------- */
  { id: "comp1", icon: "app", scene: 5, squad: "Companion", period: "FY25/26 milestones", src: "90", who: [lead("Companion", "Tim Lambertz")],
    nums: [["+3 = 20", "Countries", "M.COMPANION was successfully rolled out in 3 countries and is now available in all 20 countries."], ["+41.4%", "PDEs (195m)"], ["+0.2", "CSAT (4.1)"], ["1.35bn €", "Digital Sales", "32.5% of total Digital Sales: +4.6% ¦ The report (slide 8) shows Companion 1.3bn €, +43.4%. Align before the meeting."]],
    secs: [
      { k: "harm", h: "Harmonization", items: ["Austria", "Czech Republic", "Slovakia"] },
      { k: "succ", h: "Business continuity", items: ["We made sure that legal, security, technical debt related topics were prioritised to keep the app running.",
        { t: "Additional Revenue", sub: ["Wholesale Media", "Metro Markets Promo carousel", "Adobe Marketing Push notifications"] },
        { t: "Legal · BG – FR – UA – NL", sub: ["BG – Currency change", "FR – Documents in invoices + Excise Duties & Social Securities", "UA – Price per unit", "NL - Additional Product documents on PDP"] },
        { t: "Tech", sub: ["ALL countries - Error logs handling", "Risk assessment", "Swift UI Updates / Android Compose Migration", "MARS to APIGEE", "Pentest", "Notification center"] }] }] },

  { id: "comp2", icon: "app", scene: 5, squad: "Companion", period: "FY25/26 milestones · Customer experience", src: "90", who: [lead("Companion", "Tim Lambertz")],
    secs: [{ k: "succ", h: "Customer experience", items: [{ t: "We developed and implemented multiple features that enhanced the customer experience.", sub: [
      "ATP integration", "Notification center", "Store lists from M.SHOP", "Alternatives in personal lists", "Support of true weighted articles", "Supersmart integration", "Personalized catalogues (meta tags)", "Business indicator in Account flyout", "Enhance Search (Brand & Diet Filtering)", "Enhanced address /store selector", "FAQ integration"] }] }],
    shots: [["c-home", "M.COMPANION"], ["c-atp-date", "ATP integration"], ["c-notif", "Notification center"], ["c-stores", "Store lists from M.SHOP"], ["c-qty", "Quantity"], ["c-menu", "Account flyout"]] },

  { id: "comp3", icon: "app", scene: 5, squad: "Companion", tag: "02 Strategic projects · Harmonization · M.COMPANION", period: "Country rollout · from many to one", src: "91", who: [lead("Companion", "Tim Lambertz")],
    nums: [["3 → 1", "Local solutions → M.COMPANION", "Saved: 3 Local solutions to be decommissioned by March 2027"], ["~1.1m €", "AT – M.COMPANION Rollout", "FSD revenue since go live in September (now live with 3 stores)"], ["~186k €", "CZ – M.COMPANION Rollout", "FSD revenue since go live in end of September"], ["~71k €", "SK – M.COMPANION Rollout", "FSD revenue since go live in end of September"], ["~1.3m €", "in revenue added FY26/27", "*Data extracted on 16.11.2026 ¦ The harmonization slides (25–26) show AT ~415k €, CZ ~178k €, SK ~67.3k €"]],
    secs: [{ k: "harm", h: "From many to one · 3 → 1", items: ["AT – M.COMPANION Rollout", "CZ – M.COMPANION Rollout", "SK – M.COMPANION Rollout", { t: "3 Local solutions → 1 M.COMPANION", s: "to be decommissioned by March 2027" }] }] },

  { id: "comp4", icon: "app", scene: 5, squad: "Companion", period: "FY25/26 milestones · Customer experience", src: "92–93", who: [lead("Companion", "Tim Lambertz")], hint: "Tap a card to turn from problem to status",
    cards: [
      { k: "succ", h: "AtP · Availability to Promise", img: ["c-atp-date", "AtP"], p: "Customers complained about the lack of visibility and certainty regarding the delivery status of their orders.", st: "Availability to Promise solves this issue by showing the customer the exact number of articles which are available for the selected delivery date. Live since FEB 2026" },
      { k: "succ", h: "Notification Center", img: ["c-notif", "Notification Center"], p: "Customers were unable to retrieve notifications after accidentally dismissing them by swiping them away.", st: "Our notification center enables customers to revisit and review messages at their convenience. Live since August 2026 · Next: Include Adobe Notifications (HBR1)" },
    ] },

  { id: "comp4b", icon: "app", scene: 5, squad: "Companion", period: "FY25/26 milestones · Business", src: "94–95", who: [lead("Companion", "Tim Lambertz")], hint: "Tap a card to turn it",
    cards: [
      { k: "succ", h: "WSM · Wholesale Media", img: ["c-wsm", "WSM banner"], p: "New Revenue stream. We implemented WSM banner within the Homescreen of M.COMPANION", st: "Live since JUN 2026 (after ISACS) · 47k € revenue" },
      { k: "succ", h: "Metro Markets Promos", img: ["c-promo", "Metro Markets promos"], p: "Promote Metro Markets. Metro Markets products receive a boost via dedicated promos carousel.", st: "Live since JUN 2026 (after ISACS) · 47k € revenue", f: "Same 47k € as the WSM banner: confirm both" },
    ] },

  { id: "comp4c", icon: "app", scene: 5, squad: "Companion", period: "Business – Store lists – Fix the basics", src: "96", who: [lead("Companion", "Tim Lambertz")], hint: "Tap the card to turn it",
    cards: [
      { k: "basics", h: "Store lists · Fix the basics", img: ["c-stores", "Store lists"], p: "Countries highlighted the importance of making M.SHOP store lists available in M.COMPANION to enable the targeted promotion of articles based on specific filtering criteria, such as: Store number · CTG · FSD or CC customer type", st: "Enhanced Promotions. Live since SEP 2026" }] },

  { id: "comp5", scene: 5, icon: "app", squad: "Companion", period: "Fix the basics · FY26/27", src: "97", who: [lead("Companion", "Tim Lambertz")],
    secs: [{ k: "basics", h: "Fix the basics · PDP", items: [{ t: "Added Product Characteristics on PDP · All Countries · Oct", sub: ["Product Info moved to Description", "Included product source (legal requirement)", "Inspiration content (recipes + instructions)"] }, { t: "Added Localised Product Labels - Ukraine", s: "Product availability labels localised to reduce claims" }] }],
    shots: [{ a: ["c-pdp-b", "Product page before"], b: ["c-pdp-a", "Product page after"] }] },

  { id: "comp6", scene: 5, icon: "app", squad: "Companion", period: "FY26/27 next", src: "99", who: [lead("Companion", "Tim Lambertz")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "Quantities in personal lists", s: "HBR1" }, { t: "Re-order", s: "HBR1" }, { t: "PDP Harmo & Product Labels", s: "HBR 1 / HBR2" }, { t: "Native Checkout", s: "HBR2" }] },
      { k: "proj", h: "Projects", items: [{ t: "Global Initiatives", s: "Juliette – CMP – BAC · HBR 1 / HBR 2" }, { t: "Native Coupon/Voucher Center", s: "HBR1 – MVP Concept" }, { t: "Deeplinking Web2App", s: "HBR1 / HBR2 – PDP, Catalogues, Google Ads" }, { t: "Improve Notification Center + Expand WSM", s: "HBR1 / HBR2 – Additional placements" }, { t: "App Design Improvements", s: "Homescreen – HBR2" }] }] },

  { id: "wsm1", icon: "media", scene: 5, room: 11, squad: "Wholesale Media", period: "FY25/26 milestones", src: "110 · spend from slides 54, 72, 87, 57, 94",
    bars: { h: "Where the media money shows up · from the squads' slides", items: [["M.WEB", 1.13, "1.13m €"], ["Search & Category pages", 0.7, "+0.7M"], ["Catalogs", 0.43, "0.43m €"], ["M.COMPANION", 0.047, "47k €"], ["M.SHOP homepage", 0.033, "33,000€"]] }, who: [lead("Wholesale Media", "Bastian Janssen", "Confirm Bastian still leads Wholesale Media")],
    nums: [["3.36M €", "Wholesale Media Revenue", "Commercial · Metro countries + Metro Markets"], ["6", "Countries activated & onboarded", "Harmonization · 2 countries per QBR"], ["1st", "Global campaign", "Run · ICEX · DE, FR, IT, PL – March to May 2026"], ["€7M", "Revenue · FY26/27", "Expand in new countries, new inventory and new placements · All countries"]],
    secs: [
      { k: "succ", h: "Commercial", items: ["3.36M € Wholesale Media Revenue",  "Metro countries + Metro Markets"] },
      { k: "harm", h: "Harmonization", items: [{ t: "Metro countries", s: "+ RO, BG, PL, TR, CZ, HR" }, { t: "Metro Markets", s: "DE, ES, IT, FR, NL, PT, PL, RO" }] },
      { k: "succ", h: "Run", items: ["1st Global campaign · ICEX", "DE, FR, IT, PL – March to May 2026"] }] },

  { id: "wsm2", icon: "media", scene: 5, room: 11, squad: "Wholesale Media", period: "Timeline FY26/27", src: "111", who: [lead("Wholesale Media", "Bastian Janssen", "Confirm Bastian still leads Wholesale Media")],
    lanes: { h: "Timeline FY26/27", cols: ["HBR1", "HBR2"], rows: [
      { k: "basics", items: [["Automating campaign reporting", 0, 1], ["Optimized campaign planning", 1, 1], ["Improve & simplify campaign processes", 0, 2]] },
      { k: "proj", items: [["Launch SPA in M.Shop", 0, 1], ["Expand SPA to other solutions", 1, 1], ["Open-up Wholesale Media to Media-agencies · Promote to the media industry", 0, 2], ["Improve banner relevance", 0, 2], ["Explore Media offer expansion (NL, Digital in-store..)", 0, 2]] },
      { k: "harm", items: [["Activate 3 more countries (AT, HU, UA)", 0, 2]] }] } },

  { id: "wsm3", icon: "media", scene: 5, room: 11, squad: "Wholesale Media", period: "FY26/27 next", src: "42", who: [lead("Wholesale Media", "Bastian Janssen", "Confirm Bastian still leads Wholesale Media")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "Automating campaign reporting", s: "HBR1 · Full campaign report ready to share with suppliers" }, { t: "Improve & simplify campaign processes", s: "HBR1 · One guided solution to create campaign briefings" }, { t: "Optimized campaign planning", s: "HBR2 · Combined forecast based on booked inventory" }] },
      { k: "proj", h: "Projects", items: [{ t: "New Ad Formats", s: "HBR1 · Sponsored Product Ads · First income generated" }, { t: "Rollout further countries", s: "HBR1 · Hungary, Austria, Ukraine" }, { t: "Promote to the Media Industry", s: "HBR2 · Attend at least 1 large event (OMR, DMEXCO)" }] }] },

  /* ---------------- 6 · BEYOND THE SHOP ---------------- */
  { id: "cw1", icon: "websites", scene: 6, squad: "Corporate Websites", period: "FY25/26 milestones", src: "81–83", who: [lead("Corporate Websites", "Dr. Stephan Benkert")],
    nums: [["4+1", "METRO Career Sites migrated from external provider to Corporate Websites", "INT, PL, IN – QBR1…3 FY25/26"], ["+3", "METRO AG Corporate Websites relaunched", "INT – QBR2 FY25/26"], ["→ 10.4", "Upgrade of Sitecore Managed Cloud to latest version CMS 10.4", "INT – QBR2 FY25/26"]],
    secs: [
      { k: "harm", h: "Harmonization", items: ["METRO AG", "METRO GSC PL", "METRO GSC IN", "METRO Employees", "+ Vanilla Template Site for METRO Country Rollout"] },
      { k: "succ", h: "Business", items: ["MPULSE → METRO STORIES", "Investors → Company", "Corporate Responsibility"] },
      { k: "succ", h: "Continuity", items: ["Ensure continuous support", "Remove technical debts", "Improve authoring UX"] }],
    shots: [["cw-career", "METRO Career Sites"], ["cw-stories", "METRO Stories"], ["cw-cms", "Sitecore 10.4"], ["cw-tree", "Content tree"]] },

  { id: "cw2", icon: "websites", scene: 6, squad: "Corporate Websites", period: "FY26/27 next", src: "84", who: [lead("Corporate Websites", "Dr. Stephan Benkert")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "Propose long-term CMS strategy", s: "Align requirements and propose a strategy for both M.Web & Corporate Websites" }, { t: "Increase AI value for Corporate Websites", sub: ["Update AI Search for integration with further sites", "Provide more multilingual content with AI Translation"] }] },
      { k: "proj", h: "Projects", items: [{ t: "Harmonize Career Sites", sub: ["Go Live with another 6 countries / companies", "Receive 80,000 applications via Corporate Websites"] }, { t: "Relaunch METRO Stories with wholesale focus", s: "Attract more (potential) customers to buy at METRO" }, { t: "Harmonize more Company Sites", s: "e.g. Hospitality for Future" }] }] },

  /* ---------------- 7 · THE ENGINE ROOM ---------------- */
  { id: "hood", icon: "platform", scene: 7, squad: "Platform & technology", period: "Tech: under the hood · Security & stability", src: "117–119", who: [["Saghi", "Platform and technology"]],
    nums: [["193 → 29", "Critical + High vulnerabilities", "only high · FSD Ordering · All market · FY2026"], ["4 → 1", "Reduction of different coding languages", "FSD Ordering · All market · FY2026"], ["11/12", "months of Availability over Platinum SLA", "Web Experience · INT – QBR2 FY25/26"]],
    secs: [
      { k: "succ", h: "Web Experience · Security & reliability", items: ["Upgrade of Sitecore Managed Cloud to 10.4 (latest version) to extend continuous support", "Migrated backend Single Sign-On to Entra ID", "Migrated APIs to Apigee (Integration Factory)", "Resolved over 30 high & critical security vulnerabilities", "Sitecore 10.4 migration · 2h 30m of intermittent downtime"] },
      { k: "succ", h: "FSD Ordering · Security and stability", items: ["193 -> 29 Critical + High vulnerabilities – only high", "Reduction of different coding languages · 4 -> 1", "M.SHOP domains migrated to shared load balancer", "Migrated from Harbor to GCP Artifact Registry"] }] },

  { id: "hood2", icon: "platform", scene: 7, squad: "Platform & technology", period: "Tech: under the hood · Tech improvements", src: "119–120", who: [["Saghi", "Platform and technology"]],
    nums: [["10k", "Reduce 10k run costs per month*", "*Expected savings as Migration was recently finished, so we do not have verified numbers of the savings yet ¦ savings not verified yet"]],
    secs: [
      { k: "succ", h: "FSD Ordering · Tech improvements", items: [{ t: "Architecture rework", sub: ["Reworking our full backend architecture to:", "Be able to reduce vulnerabilities", "Reduce complexity and speed up development time"] }, { t: "PostgreSQL migration", sub: ["Migrate from Cassandra and Solr to PostgreSQL to:", "Reduce 10k run costs per month*"] }, { t: "Infrastructure", sub: ["M.SHOP domains migrated to shared load balancer to:", "decommission old runtime Load balancers", "Migrate to google managed certificates", "Migrated from Harbor to GCP Artifact Registry"] }] },
      { k: "succ", h: "Customer Checkout · Tech", items: [{ t: "Take over Login from FSD Ordering", s: "Full ownership handover, from ktor to DW migration, Alerts reduction to 25" }, { t: "Tech performance and stability improvements", s: "React 19 migration, unload Bootstrap CSS, Java 21 upgrade, DW5 rollout" }, { t: "Other teams and global projects support", s: "DnR Labels, WSM, EntraId, etc." }] },
      { k: "proj", h: "What drove it", items: ["Constantly deliver Customer Checkout journey improvements (from small to big one, but always improve)", "Keeping the Tech Debt low and vulnerabilities under control", "Acting as a Team Players, supporting others towards the overall Platform success"] }] },

  { id: "hood3", icon: "platform", scene: 7, squad: "Platform & technology", period: "Tech: under the hood · Order Management & Search", src: "120–122", who: [["Saghi", "Platform and technology"]],
    nums: [["37", "OM services migrated", "Dropwizard migration · All OM Services · FY2026"], ["143", "vulnerability tickets closed", "Search · Fort Knox initiatives · All market · FY2026"]],
    secs: [
      { k: "succ", h: "Order Management · Dropwizard migration", items: [{ t: "37 OM services migrated", s: "Migration of all OM services from MS-Core to Dropwizard. Benefits are automatic updates, better security and less maintenance effort" }] },
      { k: "succ", h: "Search · Stability", items: [{ t: "Fort Knox initiatives", sub: ["Closed 143 vulnerability tickets.", "Migrated 36 endpoints and 6 services from Clojure to Kotlin.", "Migrated from Harbor to GCP Artifact Registry."] }, { t: "Integration Factory initiatives", sub: ["Completed Apigee migration for M.SHOP Public API."] }] },
      { k: "ask", h: "Platform story", items: [{ t: "Space for Saghi's own words", f: "Saghi to confirm what he adds beyond the squad tech slides" }, "Evaluate API & Pipeline follows and closes the journey"] }] },

  { id: "ev1", icon: "performance", scene: 7, squad: "Evaluate API & Pipeline", period: "FY25/26 achievements", src: "120–121", who: [lead("Evaluate API & Pipeline", "Annette Huhn")],
    nums: [["99,9%", "Availability SLA"], ["100%", "Performance SLA"], ["12 / 7", "Availability To Promise", "live in 12 countries / completed in 7 countries"]],
    secs: [
      { k: "succ", h: "Enabled Digital Commerce Squads to drive Business Topics", items: ["Supported key platform products including M.SHOP, M.COMPANION, Digital Catalogues, and WSM in delivering business value.", "Enabled strategic initiatives such as Country Harmonization, One Shop & CCOV activation, ATP rollout, and legal compliance topics."] },
      { k: "succ", h: "Strengthened Evaluate Services for Consumers", items: ["Realized the vision of the Evaluate Unified API", "Completed the modernization of Article Feed, enabling the team to fully own it", "Enhanced the Support Tool to improve usability & security"] },
      { k: "succ", h: "Driving AI Innovation in Incident Management", items: ["Led the introduction of an AI Support Agent to accelerate incident investigation and reduce manual effort. · 5 minutes per ticket instead of 30", "Enabled engineers to identify root causes faster across complex cross-system support scenarios. ¦ this slide is hidden in the deck: show it?"] }] },

  { id: "ev2", icon: "performance", scene: 7, squad: "Evaluate API & Pipeline", period: "FY25/26 achievements", src: "121–122", who: [lead("Evaluate API & Pipeline", "Annette Huhn")],
    secs: [
      { k: "harm", h: "Country Harmonization", items: ["CZ & SK · AT", "OneShop live in KZ, BG, HU", "CCOV activation in TR, CZ, SK"] },
      { k: "succ", h: "Legal Requirements", items: ["UA excise tax", "CZ/SK excise tax", "RS eDelivery Note"] },
      { k: "succ", h: "Evaluate services", items: [{ t: "One Evaluate API", s: "Onboarded M.Web, M.COMPANION, Digital Catalogues, DISH, Criteo" }, { t: "Article Feed 2.0", s: "Migration from Clojure to Kotlin" }, { t: "Supporting WSM", s: "Integration with Criteo · Custom Criteo Feed" }, { t: "Supporting Digital Catalogues", s: "Support enhancing the Add-to-Cart functionality & Licence Activation Rollout" }, { t: "Project Cherry", s: "Hyper Care & Cleanup" }, { t: "Transparency of Article Data", s: "Evaluate Support Tool Improvements · DANA connection re-established" }] },
    ] },

  { id: "ev2b", icon: "performance", scene: 7, squad: "Evaluate API & Pipeline", period: "FY25/26 achievements", src: "122", who: [lead("Evaluate API & Pipeline", "Annette Huhn")],
    secs: [
      { k: "succ", h: "System Availability & Security", items: ["Project Cherry Disaster Recovery", "Migration to Apigee", "Preparations for Entra ID", "Migration from Cassandra to Postgres & solr", "AI PDLC decommissioning (ongoing) → ±5k€ savings /month", "AI Support Agent - 5 minutes per ticket instead of 30", "Closed 1011 vulnerability tickets", "Migration to Spring 4.1", "Enabled CI/CD scans for all repositories", { t: "Improvement of Article Data Importing", s: "Support of Golden Record Switch · Switch from oo2 to idu-item-derived for BG, MD, PT, RO" }] }],
    shots: [["ev-tool", "Evaluate Support Tool"]] },

  { id: "ev3", icon: "performance", scene: 7, squad: "Evaluate API & Pipeline", period: "FY26/27 what's next", src: "123", who: [lead("Evaluate API & Pipeline", "Annette Huhn")],
    secs: [
      { k: "basics", h: "Fixing the basics", items: [{ t: "New Article Feed Version 1", s: "Better tech stack + real ownership" }, { t: "Unified API", s: "Providing the same Article Data for all consumers" }, { t: "Transparency of Article Data", s: "Evaluate Support Tool Enhancements & establish DANA connection" }, { t: "FinOps & Stability", s: "Migration from Cassandra to Postgres (±x€ monthly savings) & Improvement of Importer Structure", f: "Saving still ±x€ on the squad slide" }, { t: "Security", s: "Entra ID" }] },
      { k: "proj", h: "Projects", items: ["„Big FSD“ Article Data Stream", "Scalable B2B2C Solution", "Availability to Promise", "AI PDLC", "Harmonization", "WSM", "Digital catalogues", "LSD"] }] },

  /* ---------------- 8 · ONE PLATFORM ---------------- */
  { id: "h1", icon: "harmonize", scene: 8, type: "harm", squad: "Harmonization", tag: "02 Strategic projects · Harmonization", period: "CZ & SK Harmonization", src: "25", who: [T],
    country: "CZ & SK", csub: "M.SHOP Rollout & M.Companion Go-live", share: ["Over 80 %", 80],
    steps: [{ t: "Completed M.SHOP Rollout in 7 months end of April 26", sub: ["CZ - 13 Stores · Monthly FSD Orders ~ 60M €", "SK - 6 Stores · Monthly FSD Orders ~ 24M €"] },
      { t: "M.Companion went live end of September 26", sub: ["CZ – 709 Active Users (FSD) ~ 178k €", "SK – 266 Active Users (FSD) ~ 67.3k €"] },
      { t: "MCRM and Local tools are decommissioned", sub: ["CZ & SK – Web Management Tool by Physter"] }] },

  { id: "h2", icon: "harmonize", scene: 8, type: "harm", squad: "Harmonization", tag: "02 Strategic projects · Harmonization", period: "AT Harmonization", src: "26", who: [T],
    country: "AT", csub: "M.SHOP Rollout & M.Companion Go-live", share: ["63 %", 63],
    steps: [{ t: "M.SHOP Rollout Started in September", sub: ["3 Stores live", "FSD Orders ~ >5k / 4.4M €"] },
      { t: "M.Companion went live in the same time", sub: ["194 Active Users (FSD) ~ 415k €"] },
      { t: "Rollout planned to end end of April 27" }] },

  { id: "h3", icon: "harmonize", scene: 8, type: "matrix", squad: "Harmonization", tag: "02 Strategic projects · Harmonization · Rollout matrix", period: "Rollout matrix", sub: "Built from the squad slides · tap a row to open it, tap a country to light it up", src: "27 · data from slides 25–26, 50, 91, 100, 110, 121", who: [T],
    cols: ["AT", "CZ", "SK", "HR", "TR", "KZ", "HU", "BG", "RO", "PL", "UA"],
    rows: [["M.SHOP rollout", "h1", { CZ: "L", SK: "L", AT: "R" }], ["M.Companion", "comp3", { AT: "L", CZ: "L", SK: "L" }],
      ["M.Web core journeys", "we1", { AT: "L", CZ: "L", SK: "L", TR: "L", HR: "L", KZ: "L", HU: "L" }], ["OneShop", "ev2", { KZ: "L", BG: "L", HU: "L", SK: "L", CZ: "L" }],
      ["CCOV activation", "ev2", { AT: "L", TR: "L", CZ: "L", SK: "L" }], ["Customer Self Service", "css1", { AT: "L", HR: "L" }],
      ["Wholesale Media", "wsm1", { RO: "L", BG: "L", PL: "L", TR: "L", CZ: "L", HR: "L", AT: "P", HU: "P", UA: "P" }]] },

  { id: "jul", icon: "harmonize", scene: 8, squad: "Project Juliet", tag: "02 Strategic projects · Juliet", period: "Planned for FY27", sub: "Goal: From Makro to METRO, that means a fundamental redesign of the business model.", src: "32", who: [lead("Project Juliet", "Stefan Trasca", "Quest Board names “Stefan” as lead: confirm")],
    nums: [["~32.08 M€", "Horeca Sales in NL", "KPI target · NL ambition is to become the most beneficial wholesaler for Horeca."]],
    lanes: { h: "Milestones", cols: ["NOV", "DEC", "JAN", "FEB", "MAR", "APR 6th"], rows: [{ k: "proj", items: [["PP & Domains Setups", 0, 1], ["PP Integrations", 1, 1], ["System Integration tests", 2, 1], ["Trainings & User acceptance test", 3, 1], ["Go-live preparation", 4, 1], ["Go-live", 5, 1]] }] },
    secs: [
      { k: "proj", h: "Scope", items: ["Create a METRO branded customer experience across all customer facing touchpoints", { t: "Team", s: "Web Experience, Digital Catalogues, App, Customer Self Service, M.Shop (FSD Ordering, Search, Customer Checkout, Order Management)" }] },
      { k: "ask", h: "Risks", items: ["Aggressive timeline that could be impacted by hypercare period"] }] },

  /* ---------------- 9 · NEXT STEPS ---------------- */
  { id: "basics", icon: "fix", scene: 9, type: "collect", collect: "basics", tag: "03 Fixing the basics", title: "Fixing the basics, squad by squad", sub: "Every “Fixing the basics” line from the squad slides · tap a squad to jump to its slide", who: [T],
    note: "Top five for the summary slide (39) ¦ Slide 39 says “summary for all squads to be filled later”: pick the five with owners and dates" },
  { id: "projects", icon: "launch", scene: 9, type: "collect", collect: "proj", tag: "06 Summary & asks · Projects", title: "Projects, squad by squad", sub: "Every “Projects” line from the squad slides · tap a squad to jump to its slide", who: [T] },

  { id: "qb", icon: "levelup", scene: 9, tag: "06 Summary & asks · Quest Board", title: "Quest Board 2026/27", sub: "Who leads which quest · 20 quests · 13 leads · A ? means the name or owner is still to confirm before 23.11.", who: [T],
    quests: [[1, "Packages", "Alessio", 0, "Product packages shown to customers when browsing"], [2, "AI order capture", "Derya", 0, "AI order capture MVP, live in DE and ES"], [3, "Punchout", "Mikhail", "“live in 7 countries” here, 6 countries on the Punchout slide: confirm", "Punchout ordering, live in 7 countries"], [4, "ATP", "Mikhail", 0, "Availability to Promise: live stock shown to customers"], [5, "VAT", "Chloe", 0, "VAT handling for customers and invoices"],
      [6, "CMP · Consent", "Christoph / Stefan (cookie)", 0, "Consent management for cookies and privacy"], [7, "B2B2C", "Derya", 0, "B2B2C order lifecycle, invoicing and APIs"], [8, "Notification center", "Tim", 0, "Notifications and order reminders for customers"], [9, "SRP", "Abhishek", 0, "Search results page: audit, redesign, vector search"], [10, "Loyalty", "Derya", 0, "Loyalty points redemption"],
      [11, "AI support agent", "Annette", 0, "AI agent for customer support"], [12, "Front-end ordering", "Abhishek", 0, "Ordering made effortless for FSD customers"], [13, "Project Juliet", "Stefan", 0, "NL Makro to METRO brand transition, Horeca focus"], [14, "FSD retention", "Syedul", 0, "Keeping FSD delivery customers ordering"], [15, "MPOS · Overall", "Cosmin ?", "owner has a ?", "Mobile point of sale across markets"],
      [16, "Subscription", "Mikhail", 0, "Recurring orders, proof of concept in FR"], [17, "Long-term Sitecore", "Stefan", 0, "Long-term CMS strategy: Sitecore or Storyblok"], [18, "Basket topic", "Stefan ?", "owner has a ?", "Basket experience and checkout flow"], [19, "Become a customer", "Ediz", 0, "Sign-up and registration for new customers"], [20, "Career sites", "Stephan Ben", 0, "Harmonised career sites on one platform"]] },

  { id: "asks", icon: "question", scene: 9, tag: "06 Summary & asks", title: "What we need to move forward", sub: "Open topics, risks and needs as the squads wrote them", src: "20–21, 18, 55, 65, 84", who: [T],
    secs: [
      { k: "ask", h: "Decisions", items: [{ t: "AtP · KZ, MD, PK", s: "Do we need to proceed?" }, { t: "AtP · RO", s: "How to convince country to go live?" }, { t: "AtP · From Oct27", s: "Stop support of Non-AtP!!!" }, { t: "Web Experience · Corporate Websites", s: "Propose long-term CMS strategy (Sitecore vs Storyblok)" }] },
      { k: "ask", h: "Needs", items: [{ t: "AI.OC", s: "M.SHOP Checkout team capacities for PP and Prod Prep, UAT support for rollout, Maintenance and ticket support in Prod." }, { t: "Punchout · B2B2C", s: "M.SHOP OM and EV capacities to develop and support integration" }, { t: "B2B2C risk", s: "UA B2B2C Partner does not want to invest in integration" }] }] },

  { id: "close", scene: 9, type: "close", title: "Thank you", sub: "Digital Commerce · Level up · 23.11.2026", who: [T] }
];


/* ---------------- NEW FLOW (as on the v8 deck agenda 01-06) ----------------
   `scene` stays the artwork (the shop scene behind the slide); `stop` is the agenda part. Order and presenters set here. */
const STOPS = [
  { name: "Start" }, { name: "Digital Commerce Report" }, { name: "Strategic Projects" }, { name: "Fixing the basics" },
  { name: "Milestones & looking ahead" }, { name: "Tech: under the hood" }, { name: "Summary & asks" }
];
(function () {
  const CH = ["Cosmin Stefanescu", "Harmonization"], FB = [["Annkathrin Heinze", "Fixing the basics"], ["Bee Peng (Chloe) Lim", "Fixing the basics"]];
  const FLOW = [
    [0, ["cover", "map"]],
    [1, ["report", "dash1", "dash2", "dash3", "o2o"]],
    [2, ["sp", "pc", "pc2", "chk2", "b2", "ai", "ai2", "bac", "aip1", "aip2", "comp3", "h1", "h2", "h3", "jul", "wsm1", "wsm2", "wsm3"]],
    [3, ["basics", "we2b", "s2", "s2b", "comp4c", "comp5"]],
    [4, ["we1", "we2", "we3", "fsd1", "fsd2", "fsd3", "chk1", "chk3", "om1", "om2", "s1", "s3", "s4", "cw1", "cw2", "cat1", "cat2", "comp1", "comp2", "comp4", "comp4b", "comp6", "css1", "css2", "css3", "ccov1", "ccov2", "ccov3", "ev1", "ev2", "ev2b", "ev3"]],
    [5, ["hood", "hood2", "hood3"]],
    [6, ["projects", "asks", "qb", "close"]]
  ];
  const WHO = { sp: [T], bac: [lead("AI Document validation", "Christoph Franke")], wsm1: 0, wsm2: 0, wsm3: 0, comp3: [CH], h1: [CH], h2: [CH], h3: [CH] };
  ["wsm1", "wsm2", "wsm3"].forEach(k => WHO[k] = [lead("Wholesale Media", "Bastian Janssen")]);
  FLOW[3][1].forEach(k => { if (k !== "basics") WHO[k] = FB; }); WHO.basics = FB;
  const by = {}; SLIDES.forEach(s => by[s.id] = s);
  const out = [];
  FLOW.forEach(([stop, ids]) => ids.forEach(id => { const s = by[id]; if (!s) throw new Error("missing slide " + id); s.stop = stop; if (WHO[id]) s.who = WHO[id]; delete by[id]; out.push(s); }));
  if (Object.keys(by).length) throw new Error("slides without a stop: " + Object.keys(by));
  // B2B2C moves out of the Order Management room so Strategic Projects keeps one backdrop
  delete by.b2; const b2 = out.find(s => s.id === "b2"); delete b2.room;
  SLIDES.length = 0; out.forEach(s => SLIDES.push(s));
})();
