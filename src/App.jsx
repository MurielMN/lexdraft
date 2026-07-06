import { useState, useRef } from "react";

const CATEGORIES = [
  { id: "end_of_life", label: "End-of-Life Planning", icon: "🕊️", color: "#9b8abf" },
  { id: "real_estate",  label: "Real Estate",          icon: "🏠",  color: "#6db56d" },
  { id: "business",    label: "Business",              icon: "🏢",  color: "#c8a96e" },
  { id: "personal",    label: "Personal & Family",     icon: "👨‍👩‍👧", color: "#7b9fc4" },
  { id: "nonprofit",   label: "Nonprofit & Ministry",  icon: "✝️",  color: "#b87fbf" },
  { id: "healthcare",  label: "Healthcare & Care",     icon: "🏥",  color: "#d97c5a" },
  { id: "employment",  label: "Employment & HR",       icon: "📋",  color: "#5aadbd" },
];

const DOCS = [

  // ═══════════════════════════════════════════════════════════════
  // END-OF-LIFE PLANNING  — the full suite no competitor has built
  // ═══════════════════════════════════════════════════════════════
  {
    id: "living_will", cat: "end_of_life",
    name: "Living Will", icon: "🕊️",
    desc: "Advance healthcare directive — your medical wishes",
    badge: "🔥 High search volume",
    fields: [
      { id: "declarant",      label: "Your full legal name",               ph: "Jane Marie Doe" },
      { id: "dob",            label: "Date of birth",                      ph: "March 15, 1965" },
      { id: "city",           label: "City and state of residence",        ph: "Houston, Texas" },
      { id: "lifeSustaining", label: "Life-sustaining treatment wishes",   ph: "If in permanent unconscious state or terminal condition, I do NOT wish life-sustaining treatment to prolong my death" },
      { id: "pain",           label: "Pain management / comfort care",     ph: "I wish to receive all reasonable pain relief and comfort care even if it shortens my life" },
      { id: "artificialNutr", label: "Artificial nutrition & hydration",   ph: "If in a persistent vegetative state, I do NOT wish artificial nutrition or hydration" },
      { id: "cpr",            label: "CPR / resuscitation preferences",    ph: "Do Not Resuscitate (DNR) if in terminal condition" },
      { id: "organDonation",  label: "Organ / tissue donation wishes",     ph: "I consent to donate any needed organs and tissues upon death" },
      { id: "additionalWishes",label:"Additional wishes",                  ph: "I wish to die at home if medically possible" },
      { id: "agent",          label: "Healthcare agent (if applicable)",   ph: "John Doe (husband) — authorized to enforce these wishes" },
      { id: "state",          label: "Governing state",                    ph: "Texas" },
    ],
  },
  {
    id: "advance_directive", cat: "end_of_life",
    name: "Advance Directive (MPOA)", icon: "📋",
    desc: "Medical Power of Attorney — appoint a healthcare proxy",
    badge: "⚡ High RPM",
    fields: [
      { id: "principal",     label: "Your full legal name",               ph: "Jane Marie Doe" },
      { id: "agent",         label: "Healthcare agent full name",         ph: "John Robert Doe" },
      { id: "relationship",  label: "Agent relationship to you",         ph: "Spouse" },
      { id: "agentAddress",  label: "Agent address & phone",             ph: "456 Oak Lane, Houston, TX 77002 · (832) 555-0100" },
      { id: "altAgent",      label: "Alternate agent (if first unavailable)", ph: "Mary Smith (sister) — (832) 555-0200" },
      { id: "powers",        label: "Medical decision powers granted",   ph: "Full authority to consent to or refuse any medical treatment on my behalf" },
      { id: "limitations",   label: "Limitations on agent's authority",  ph: "Agent may NOT consent to psychosurgery or voluntary sterilization" },
      { id: "activation",    label: "When does authority activate?",     ph: "Upon written determination by my attending physician that I lack capacity to make medical decisions" },
      { id: "hipaaRelease",  label: "HIPAA release to agent?",           ph: "Yes — agent is authorized to access all medical records and information" },
      { id: "state",         label: "Governing state",                   ph: "Texas" },
    ],
  },
  {
    id: "funeral_arrangements", cat: "end_of_life",
    name: "Funeral Pre-Arrangement", icon: "⚰️",
    desc: "Record your funeral and burial preferences",
    badge: "🆕 Zero AI competition",
    fields: [
      { id: "declarant",      label: "Your full legal name",              ph: "Jane Marie Doe" },
      { id: "dob",            label: "Date of birth",                     ph: "March 15, 1965" },
      { id: "burialType",     label: "Burial or cremation preference",    ph: "Traditional burial / Cremation / Green burial / Entombment" },
      { id: "funeralHome",    label: "Preferred funeral home (if known)", ph: "Forest Park Lawndale Funeral Home, Houston, TX" },
      { id: "cemeteryOrDestination", label: "Cemetery / final disposition location", ph: "Forest Park East Cemetery, Houston, TX / Ashes to be scattered at sea" },
      { id: "serviceType",    label: "Type of service",                   ph: "Full religious funeral service / Celebration of life / Memorial service only / No service" },
      { id: "serviceLocation",label: "Preferred service location",        ph: "Omega Gospel Ministry, Houston, TX" },
      { id: "religiousPrefs", label: "Religious / cultural preferences",  ph: "Christian service; NKJV scripture; open casket; gospel music" },
      { id: "musicHymns",     label: "Specific music or hymns requested", ph: "Amazing Grace, It Is Well With My Soul, I'll Fly Away" },
      { id: "pallbearers",    label: "Pallbearers (names if known)",      ph: "John Doe, James Smith, Michael Johnson, Robert Brown" },
      { id: "eulogist",       label: "Preferred eulogist / officiant",    ph: "Rev. Dr. Victor Njei (co-pastor)" },
      { id: "flowerPrefs",    label: "Flower / memorial preferences",     ph: "White roses and lilies; in lieu of flowers, donations to Omega Gospel Ministry" },
      { id: "obituaryNotes",  label: "Key points for obituary",          ph: "Emphasize ministry work, nursing career, love of family, faith legacy" },
      { id: "prepaidFunds",   label: "Pre-paid funeral funds / policy",   ph: "Preneed contract #XXXXX with Forest Park; $12,500 funded" },
      { id: "personalRep",    label: "Personal representative for arrangements", ph: "John Doe (spouse) — (832) 555-0100" },
    ],
  },
  {
    id: "cremation_auth", cat: "end_of_life",
    name: "Cremation Authorization", icon: "🔥",
    desc: "Legally authorize cremation of a deceased person",
    badge: "🆕 Unserved niche",
    fields: [
      { id: "authorizer",    label: "Your full name (next of kin / agent)", ph: "John Robert Doe" },
      { id: "relationship",  label: "Relationship to deceased",           ph: "Spouse / Adult Child / Legal Representative" },
      { id: "deceased",      label: "Deceased full legal name",           ph: "Jane Marie Doe" },
      { id: "deceasedDOB",   label: "Deceased date of birth",            ph: "March 15, 1965" },
      { id: "dateOfDeath",   label: "Date of death",                     ph: "June 1, 2026" },
      { id: "funeralHome",   label: "Funeral home performing cremation",  ph: "Forest Park Lawndale Funeral Home" },
      { id: "remainsDisp",   label: "Disposition of cremated remains",   ph: "Return to family / Scatter at sea off Galveston / Interment at Forest Park East" },
      { id: "containerPref", label: "Container / urn preference",        ph: "Mahogany urn / Biodegradable urn / No preference" },
      { id: "additionalAuth",label: "Additional authorized persons",      ph: "Mary Smith (sister) also authorized to receive remains" },
      { id: "state",         label: "State of death / cremation",        ph: "Texas" },
    ],
  },
  {
    id: "body_disposition", cat: "end_of_life",
    name: "Body Disposition Directive", icon: "📜",
    desc: "Instructions for handling remains — overrides family",
    badge: "🆕 Attorney-level doc",
    fields: [
      { id: "declarant",     label: "Your full legal name",              ph: "Jane Marie Doe" },
      { id: "dob",           label: "Date of birth",                    ph: "March 15, 1965" },
      { id: "ssn4",          label: "Last 4 of SSN (for identification)",ph: "XXXX" },
      { id: "disposition",   label: "Method of disposition",            ph: "Cremation / Traditional burial / Green / Alkaline hydrolysis" },
      { id: "location",      label: "Location / cemetery / institution", ph: "Forest Park East Cemetery, Houston TX — Section B, Lot 12" },
      { id: "anatomicGift",  label: "Anatomical gift to science / school?", ph: "None / Body donated to UTHealth Houston Medical School" },
      { id: "organDonation", label: "Organ donation instructions",      ph: "All organs and tissues available for transplant" },
      { id: "noDisposition", label: "What you do NOT want",             ph: "No open casket / No embalming / Not to be buried next to [named person]" },
      { id: "agentName",     label: "Disposition agent full name",      ph: "John Robert Doe (spouse)" },
      { id: "agentPhone",    label: "Agent phone number",               ph: "(832) 555-0100" },
      { id: "state",         label: "Governing state",                  ph: "Texas" },
    ],
  },
  {
    id: "organ_donation", cat: "end_of_life",
    name: "Organ Donation Declaration", icon: "❤️",
    desc: "Formal donation of organs, tissue, and body",
    badge: "🆕 Underserved",
    fields: [
      { id: "donor",         label: "Donor full legal name",            ph: "Jane Marie Doe" },
      { id: "dob",           label: "Date of birth",                   ph: "March 15, 1965" },
      { id: "address",       label: "Current address",                 ph: "123 Main St, Houston, TX 77002" },
      { id: "donationType",  label: "What you are donating",           ph: "Any needed organs and tissues / Specific: kidneys, corneas, heart" },
      { id: "exclusions",    label: "Any exclusions",                  ph: "No exclusions / Excluding: skin, bones" },
      { id: "researchConsent",label:"Research / medical education?",   ph: "Yes, tissues may be used for medical research and education" },
      { id: "agentName",     label: "Person to notify / agent",        ph: "John Doe (spouse) — (832) 555-0100" },
      { id: "regConfirm",    label: "Registered on state donor registry?", ph: "Yes — Texas Donor Registry; also noted on driver's license" },
      { id: "state",         label: "State",                           ph: "Texas" },
    ],
  },
  {
    id: "memorial_wishes", cat: "end_of_life",
    name: "Memorial Service Planning Letter", icon: "🕯️",
    desc: "Detailed wishes for your memorial / celebration of life",
    badge: "🆕 High emotional value",
    fields: [
      { id: "author",        label: "Your full name",                   ph: "Jane Marie Doe" },
      { id: "serviceType",   label: "Type of event",                   ph: "Celebration of Life / Traditional Funeral / Memorial Service / Graveside Only" },
      { id: "location",      label: "Preferred venue",                  ph: "Omega Gospel Ministry, 11796 South Glen Dr, Houston TX" },
      { id: "timing",        label: "Timing preference",               ph: "Within 7 days of passing / No rush — allow family to travel" },
      { id: "attendees",     label: "Who should be invited / notified", ph: "All church family, nursing colleagues, community; no restrictions" },
      { id: "program",       label: "Service program structure",        ph: "Opening worship 20 min; scripture reading; 3–4 eulogies; open mic; closing song" },
      { id: "music",         label: "Music selections",                ph: "Processional: Great Is Thy Faithfulness; Recessional: I'll Fly Away; worship set: Goodness of God" },
      { id: "scripture",     label: "Scripture passages to be read",   ph: "Psalm 23; John 14:1-6; Revelation 21:1-4 (NKJV)" },
      { id: "speakers",      label: "Requested speakers / officiant",  ph: "Rev. Dr. Victor Njei — lead officiant; Pastor Grace Liu — personal tribute" },
      { id: "reception",     label: "Reception / repast wishes",       ph: "Family-style repast to follow at church fellowship hall; Southern food preferred" },
      { id: "memorialFund",  label: "Memorial fund or charity",        ph: "Contributions to Omega Academy of Excellence scholarship fund" },
      { id: "personalNotes", label: "Personal message to attendees",   ph: "Do not mourn — celebrate. I lived fully in the purpose God ordained for me." },
    ],
  },
  {
    id: "obituary_auth", cat: "end_of_life",
    name: "Obituary Authorization & Draft", icon: "📰",
    desc: "Pre-authorize and draft your own obituary",
    badge: "🆕 Totally unique",
    fields: [
      { id: "fullName",      label: "Full legal name",                  ph: "Jane Marie Doe (née Williams)" },
      { id: "dob",           label: "Date of birth & birthplace",      ph: "March 15, 1965 — Lagos, Nigeria" },
      { id: "profession",    label: "Career / calling highlights",     ph: "Licensed Nurse (LPN/LVN), Pastor, Entrepreneur, Author, AWS Cloud Engineer" },
      { id: "ministry",      label: "Ministry / church affiliation",   ph: "Co-Pastor, Omega Gospel Ministry, Houston TX — 24 years of faithful service" },
      { id: "survivors",     label: "Surviving family members",        ph: "Husband Rev. Dr. Victor Njei; sons Joshua and Hope; daughter [name]; grandchildren" },
      { id: "preceded",      label: "Preceded in death by",           ph: "Parents [names]; sibling [name]" },
      { id: "achievements",  label: "Key achievements & legacy",       ph: "Founded Omega Academy of Excellence; authored 15+ books; established Good Samaritan Home Health LLC" },
      { id: "character",     label: "Character / faith description",   ph: "A woman of unshakeable faith, prophetic vision, and boundless compassion — she lived to serve" },
      { id: "publication",   label: "Newspapers / platforms to publish", ph: "Houston Chronicle; church website; Facebook; funeral home site" },
      { id: "photoInstr",    label: "Photo instructions",              ph: "Use professional headshot from 2024 graduation; secondary photo with family" },
      { id: "authorizedBy",  label: "Person authorized to finalize",   ph: "John Doe (spouse) with input from children" },
    ],
  },
  {
    id: "donotresuscitate", cat: "end_of_life",
    name: "Do Not Resuscitate Order (DNR)", icon: "🚫",
    desc: "Out-of-hospital DNR — legal instruction to EMS / physicians",
    badge: "⚡ High RPM",
    fields: [
      { id: "patient",       label: "Patient full legal name",          ph: "Jane Marie Doe" },
      { id: "dob",           label: "Patient date of birth",           ph: "March 15, 1965" },
      { id: "physician",     label: "Attending physician name",        ph: "Dr. Maria Patarroyo Aponte, MD" },
      { id: "physicianLicense", label: "Physician license number",    ph: "TX License #XXXXXXX" },
      { id: "diagnosis",     label: "Relevant diagnosis / condition",  ph: "Terminal cancer, stage IV / Advanced heart failure / Permanent vegetative state" },
      { id: "scope",         label: "Scope of DNR order",             ph: "No CPR, no electric shock, no artificial breathing — comfort measures only" },
      { id: "agentName",     label: "Healthcare agent / proxy name",   ph: "John Doe (spouse) — (832) 555-0100" },
      { id: "effectiveDate", label: "Effective date",                  ph: "June 1, 2026" },
      { id: "expirationDate",label: "Expiration (if applicable)",      ph: "No expiration / Valid until revoked in writing" },
      { id: "state",         label: "Governing state",                 ph: "Texas" },
    ],
  },
  {
    id: "trust_revocable", cat: "end_of_life",
    name: "Revocable Living Trust", icon: "🏦",
    desc: "Avoid probate — transfer assets without a will",
    badge: "⚡ Highest RPM doc",
    fields: [
      { id: "grantor",       label: "Grantor (your full name)",         ph: "Jane Marie Doe" },
      { id: "trustName",     label: "Trust name",                      ph: "The Jane Marie Doe Revocable Living Trust" },
      { id: "trustee",       label: "Initial trustee (usually yourself)",ph: "Jane Marie Doe" },
      { id: "successorTrustee", label: "Successor trustee",           ph: "John Robert Doe (spouse) / then Mary Smith (sister)" },
      { id: "beneficiaries", label: "Beneficiaries upon death",        ph: "Spouse 100% / or equally to children if spouse predeceases" },
      { id: "assets",        label: "Assets to fund the trust",        ph: "Real property at 123 Main St; bank accounts; investment accounts; business interests" },
      { id: "incapacityProv",label: "Incapacity provisions",          ph: "Successor trustee assumes full management if two physicians certify incapacity" },
      { id: "revocation",    label: "Revocation terms",               ph: "Grantor may revoke or amend at any time while competent" },
      { id: "state",         label: "Governing state",                 ph: "Texas" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // REAL ESTATE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "lease", cat: "real_estate",
    name: "Residential Lease", icon: "🏠", desc: "Standard rental agreement",
    badge: "🔥 Most searched",
    fields: [
      { id: "landlord",  label: "Landlord full name",              ph: "John Smith" },
      { id: "tenant",    label: "Tenant full name(s)",             ph: "Jane Doe" },
      { id: "address",   label: "Property address",               ph: "123 Main St, Houston, TX 77002" },
      { id: "rent",      label: "Monthly rent ($)",               ph: "1800" },
      { id: "deposit",   label: "Security deposit ($)",           ph: "1800" },
      { id: "startDate", label: "Lease start date",               ph: "June 1, 2026" },
      { id: "endDate",   label: "Lease end / month-to-month",    ph: "May 31, 2027" },
      { id: "pets",      label: "Pet policy",                     ph: "No pets / Dogs under 25 lbs with $300 deposit" },
      { id: "utilities", label: "Utilities responsibility",       ph: "Tenant pays all utilities" },
      { id: "state",     label: "Governing state",                ph: "Texas" },
    ],
  },
  {
    id: "eviction", cat: "real_estate",
    name: "Eviction Notice", icon: "🚪", desc: "Notice to vacate / pay or quit",
    badge: "⚡ High RPM",
    fields: [
      { id: "landlord",    label: "Landlord / property manager", ph: "John Smith" },
      { id: "tenant",      label: "Tenant name(s)",              ph: "Jane Doe" },
      { id: "address",     label: "Property address",            ph: "123 Main St, Houston, TX 77002" },
      { id: "reason",      label: "Reason for notice",           ph: "Non-payment of rent" },
      { id: "amountOwed",  label: "Amount owed (if rent)",       ph: "$1,800" },
      { id: "daysToComply",label: "Days to comply / vacate",     ph: "3" },
      { id: "noticeDate",  label: "Date of notice",              ph: "June 1, 2026" },
      { id: "state",       label: "Governing state",             ph: "Texas" },
    ],
  },
  {
    id: "quitclaim", cat: "real_estate",
    name: "Quitclaim Deed", icon: "🏛️", desc: "Transfer property ownership",
    badge: "⚡ High RPM",
    fields: [
      { id: "grantor",      label: "Grantor (current owner)", ph: "John Smith" },
      { id: "grantee",      label: "Grantee (new owner)",     ph: "Jane Doe" },
      { id: "propertyDesc", label: "Legal property description", ph: "Lot 12, Block 4, Westview Addition, Harris County, Texas" },
      { id: "consideration",label: "Consideration (payment)", ph: "$1 and other good and valuable consideration" },
      { id: "county",       label: "County of property",      ph: "Harris County" },
      { id: "state",        label: "State of property",       ph: "Texas" },
      { id: "date",         label: "Date of transfer",        ph: "June 1, 2026" },
    ],
  },
  {
    id: "room_rental", cat: "real_estate",
    name: "Room Rental Agreement", icon: "🛏️", desc: "Single-room lease with shared spaces",
    badge: "🆕 Underserved",
    fields: [
      { id: "landlord",         label: "Landlord / homeowner",      ph: "John Smith" },
      { id: "tenant",           label: "Tenant / roomer name",      ph: "Jane Doe" },
      { id: "address",          label: "Full property address",     ph: "123 Main St, Houston, TX 77002" },
      { id: "roomDesc",         label: "Room description",          ph: "Master bedroom, second floor" },
      { id: "rent",             label: "Monthly rent ($)",          ph: "750" },
      { id: "deposit",          label: "Security deposit ($)",      ph: "750" },
      { id: "sharedAreas",      label: "Shared common areas",       ph: "Kitchen, living room, 1 bathroom" },
      { id: "utilitiesIncluded",label: "Utilities included?",       ph: "Water, electric included; tenant pays internet" },
      { id: "guestPolicy",      label: "Guest/overnight policy",    ph: "Guests max 2 nights/week with notice" },
      { id: "state",            label: "Governing state",           ph: "Texas" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // BUSINESS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "llc", cat: "business",
    name: "LLC Operating Agreement", icon: "🏢", desc: "Define LLC structure and rules",
    badge: "⚡ High RPM",
    fields: [
      { id: "llcName",      label: "LLC name",                    ph: "Omega Academy of Excellence LLC" },
      { id: "state",        label: "State of formation",          ph: "Texas" },
      { id: "members",      label: "Members and ownership %",     ph: "Jane Doe 60%, John Doe 40%" },
      { id: "manager",      label: "Managing member(s)",          ph: "Jane Doe" },
      { id: "purpose",      label: "Business purpose",            ph: "Early childhood education and childcare services" },
      { id: "distributions",label: "Profit distribution schedule",ph: "Quarterly, pro rata to ownership %" },
      { id: "votingRules",  label: "Major decision threshold",    ph: "Majority vote for expenses over $5,000" },
      { id: "dissolution",  label: "Dissolution provisions",      ph: "Unanimous consent required to dissolve" },
    ],
  },
  {
    id: "nda", cat: "business",
    name: "NDA / Confidentiality", icon: "🔒", desc: "Protect confidential information",
    badge: "🔥 Most searched",
    fields: [
      { id: "party1",   label: "Disclosing party",       ph: "Acme Corp" },
      { id: "party2",   label: "Receiving party",        ph: "Jane Doe" },
      { id: "purpose",  label: "Purpose of disclosure",  ph: "Evaluating a potential business partnership" },
      { id: "duration", label: "Confidentiality period", ph: "3 years" },
      { id: "type",     label: "Mutual or one-way?",     ph: "One-way (only party 2 bound)" },
      { id: "state",    label: "Governing state",        ph: "Texas" },
    ],
  },
  {
    id: "contractor", cat: "business",
    name: "Independent Contractor", icon: "🛠️", desc: "Freelance / 1099 agreement",
    badge: "",
    fields: [
      { id: "client",     label: "Client / Company",        ph: "Acme Corp" },
      { id: "contractor", label: "Contractor full name",    ph: "Jane Doe" },
      { id: "services",   label: "Services to perform",     ph: "Website design and development" },
      { id: "rate",       label: "Compensation",            ph: "$75/hr or $5,000 flat fee" },
      { id: "startDate",  label: "Start date",              ph: "June 1, 2026" },
      { id: "endDate",    label: "End date / deadline",     ph: "August 31, 2026" },
      { id: "ip",         label: "IP / work ownership",    ph: "All work product belongs to Client upon payment" },
      { id: "state",      label: "Governing state",         ph: "Texas" },
    ],
  },
  {
    id: "bill_of_sale", cat: "business",
    name: "Bill of Sale", icon: "🚗", desc: "Record a private sale transaction",
    badge: "🔥 Most searched",
    fields: [
      { id: "seller",   label: "Seller full name",          ph: "John Smith" },
      { id: "buyer",    label: "Buyer full name",           ph: "Jane Doe" },
      { id: "item",     label: "Item being sold",           ph: "2019 Toyota Camry" },
      { id: "vin",      label: "VIN / Serial number",      ph: "1HGBH41JXMN109186" },
      { id: "price",    label: "Sale price ($)",            ph: "12500" },
      { id: "condition",label: "Condition / as-is clause", ph: "Sold as-is, no warranty" },
      { id: "saleDate", label: "Date of sale",             ph: "June 1, 2026" },
      { id: "state",    label: "Governing state",          ph: "Texas" },
    ],
  },
  {
    id: "partnership", cat: "business",
    name: "Partnership Agreement", icon: "🤝", desc: "General business partnership",
    badge: "🆕 Underserved",
    fields: [
      { id: "partner1",      label: "Partner 1 full name",           ph: "Jane Doe" },
      { id: "partner2",      label: "Partner 2 full name",           ph: "John Smith" },
      { id: "bizName",       label: "Business name",                 ph: "Doe & Smith Enterprises" },
      { id: "purpose",       label: "Business purpose",              ph: "Commercial cleaning services" },
      { id: "split",         label: "Profit/loss split",             ph: "50/50" },
      { id: "capitalContrib",label: "Capital contributions",         ph: "Jane $10,000 / John $10,000" },
      { id: "management",    label: "Management responsibilities",   ph: "Jane — finance; John — operations" },
      { id: "state",         label: "Governing state",               ph: "Texas" },
    ],
  },
  {
    id: "grant_agreement", cat: "business",
    name: "Grant Award Agreement", icon: "💰", desc: "Formalize a grant between funder and recipient",
    badge: "🆕 Zero competition",
    fields: [
      { id: "funder",         label: "Grantor / funder name",          ph: "John M. O'Quinn Foundation" },
      { id: "grantee",        label: "Grantee organization",           ph: "Omega Gospel Ministry" },
      { id: "granteeEIN",     label: "Grantee EIN / 501(c)(3) status", ph: "EIN 84-XXXXXXX; 501(c)(3) confirmed" },
      { id: "amount",         label: "Grant amount ($)",               ph: "25,000" },
      { id: "purpose",        label: "Specific purpose of grant",      ph: "Fund after-school tutoring program for at-risk youth" },
      { id: "startDate",      label: "Grant period start",             ph: "July 1, 2026" },
      { id: "endDate",        label: "Grant period end",               ph: "June 30, 2027" },
      { id: "reporting",      label: "Reporting requirements",         ph: "Quarterly progress reports; final report within 60 days" },
      { id: "returnProvision",label: "Unused funds return policy",     ph: "Unused funds returned within 90 days of close" },
      { id: "state",          label: "Governing state",                ph: "Texas" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONAL & FAMILY
  // ═══════════════════════════════════════════════════════════════
  {
    id: "will", cat: "personal",
    name: "Last Will & Testament", icon: "📜", desc: "Distribute assets and name heirs",
    badge: "⚡ High RPM",
    fields: [
      { id: "testator",       label: "Your full legal name",          ph: "Jane Marie Doe" },
      { id: "city",           label: "City and state of residence",   ph: "Houston, Texas" },
      { id: "executor",       label: "Executor name",                 ph: "John Doe (spouse)" },
      { id: "beneficiaries",  label: "Primary beneficiaries",        ph: "Spouse 50%, children equally 50%" },
      { id: "specificBequests",label: "Specific bequests",           ph: "Pearl necklace to daughter Sarah" },
      { id: "guardian",       label: "Guardian for minor children",  ph: "Mary Smith (sister)" },
      { id: "state",          label: "Governing state",              ph: "Texas" },
    ],
  },
  {
    id: "poa", cat: "personal",
    name: "Power of Attorney", icon: "⚖️", desc: "Grant someone legal authority",
    badge: "🔥 #1 keyword",
    fields: [
      { id: "principal",    label: "Principal (your full name)", ph: "Jane Doe" },
      { id: "agent",        label: "Agent full name",            ph: "John Doe" },
      { id: "agentRelation",label: "Agent relationship",        ph: "Spouse / Son / Attorney" },
      { id: "powers",       label: "Powers granted",            ph: "Financial, banking, real estate transactions" },
      { id: "startDate",    label: "Effective date",            ph: "June 1, 2026" },
      { id: "durable",      label: "Durable (survives incapacity)?", ph: "Yes" },
      { id: "state",        label: "Governing state",           ph: "Texas" },
    ],
  },
  {
    id: "child_travel", cat: "personal",
    name: "Child Travel Consent", icon: "✈️", desc: "Allow minor to travel without both parents",
    badge: "🆕 Zero competition",
    fields: [
      { id: "parentName",    label: "Authorizing parent / guardian", ph: "Jane Doe" },
      { id: "childName",     label: "Child full name",               ph: "Emily Grace Doe" },
      { id: "childDOB",      label: "Child date of birth",           ph: "March 15, 2018" },
      { id: "travelingWith", label: "Traveling adult / escort",      ph: "Grandmother Mary Smith" },
      { id: "destination",   label: "Destination",                   ph: "Mexico City, Mexico" },
      { id: "travelDates",   label: "Travel dates",                  ph: "July 1–14, 2026" },
      { id: "emergencyContact",label:"Parent emergency contact",     ph: "Jane Doe — (832) 555-0100" },
      { id: "medicalConsent",label: "Medical consent granted?",      ph: "Yes — escort may consent to emergency medical treatment" },
    ],
  },
  {
    id: "prenup", cat: "personal",
    name: "Prenuptial Agreement", icon: "💍", desc: "Pre-marriage financial agreement",
    badge: "⚡ High RPM",
    fields: [
      { id: "party1",        label: "Party 1 full name",          ph: "Jane Marie Doe" },
      { id: "party2",        label: "Party 2 full name",          ph: "John Robert Smith" },
      { id: "weddingDate",   label: "Anticipated wedding date",   ph: "September 1, 2026" },
      { id: "party1Assets",  label: "Party 1 separate property", ph: "Condo at 123 Oak St; savings account #XXXX" },
      { id: "party2Assets",  label: "Party 2 separate property", ph: "Business ownership in Smith LLC; retirement account #XXXX" },
      { id: "maritalProperty",label:"Treatment of marital property", ph: "Income earned during marriage is community property" },
      { id: "spousalSupport",label: "Spousal support provisions", ph: "No spousal support if marriage under 5 years" },
      { id: "state",         label: "Governing state",           ph: "Texas" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // NONPROFIT & MINISTRY
  // ═══════════════════════════════════════════════════════════════
  {
    id: "mou", cat: "nonprofit",
    name: "Memorandum of Understanding", icon: "🤝", desc: "Nonprofit / ministry partnership MOU",
    badge: "🆕 Zero competition",
    fields: [
      { id: "org1",            label: "Organization 1 name",        ph: "Omega Gospel Ministry" },
      { id: "org1Type",        label: "Org 1 type / status",        ph: "501(c)(3) nonprofit, Houston TX" },
      { id: "org2",            label: "Organization 2 name",        ph: "Harris County Public Health" },
      { id: "purpose",         label: "Purpose of partnership",     ph: "Deliver free health screenings in underserved communities" },
      { id: "responsibilities1",label:"Org 1 responsibilities",     ph: "Provide facility, outreach, volunteer coordination" },
      { id: "responsibilities2",label:"Org 2 responsibilities",     ph: "Provide medical staff, supplies, education materials" },
      { id: "duration",        label: "MOU duration",               ph: "One year, renewable by mutual consent" },
      { id: "termination",     label: "Termination clause",         ph: "Either party may terminate with 30 days written notice" },
      { id: "state",           label: "Governing state",            ph: "Texas" },
    ],
  },
  {
    id: "volunteer", cat: "nonprofit",
    name: "Volunteer Agreement", icon: "🙌", desc: "Ministry / nonprofit volunteer terms",
    badge: "🆕 Zero competition",
    fields: [
      { id: "org",            label: "Organization name",           ph: "Omega Gospel Ministry" },
      { id: "volunteer",      label: "Volunteer full name",         ph: "Jane Doe" },
      { id: "role",           label: "Volunteer role / ministry area", ph: "Children's Ministry Coordinator" },
      { id: "duties",         label: "Primary duties",              ph: "Supervise children ages 3–12 during Sunday service" },
      { id: "schedule",       label: "Schedule / commitment",       ph: "Every Sunday, 9 AM – 12 PM" },
      { id: "backgroundCheck",label: "Background check required?", ph: "Yes — required before serving with minors" },
      { id: "confidentiality",label: "Confidentiality expectations",ph: "All member information strictly confidential" },
      { id: "liabilityWaiver",label: "Liability / indemnification", ph: "Volunteer holds organization harmless for good-faith acts" },
    ],
  },
  {
    id: "donor", cat: "nonprofit",
    name: "Donor Gift Agreement", icon: "🎁", desc: "Formal acceptance of a major donation",
    badge: "🆕 Rare document",
    fields: [
      { id: "org",          label: "Nonprofit organization",     ph: "Omega Gospel Ministry" },
      { id: "orgEIN",       label: "Organization EIN",           ph: "84-XXXXXXX" },
      { id: "donor",        label: "Donor name",                 ph: "John and Mary Smith" },
      { id: "giftAmount",   label: "Gift amount / description",  ph: "$10,000 cash donation" },
      { id: "giftPurpose",  label: "Designated purpose",         ph: "General operations — Omega Academy of Excellence" },
      { id: "restrictions", label: "Restrictions (if any)",      ph: "Must be used within 12 months for educational programming" },
      { id: "acknowledgment",label:"IRS acknowledgment language",ph: "No goods or services provided in exchange for this gift" },
      { id: "date",         label: "Date of gift",               ph: "June 1, 2026" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // HEALTHCARE & CARE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "home_health", cat: "healthcare",
    name: "Home Health Care Agreement", icon: "🏥", desc: "Private home health services contract",
    badge: "🆕 Zero competition",
    fields: [
      { id: "agency",          label: "Agency / caregiver name",       ph: "Good Samaritan Home Health LLC" },
      { id: "client",          label: "Client / patient name",         ph: "Mary Johnson" },
      { id: "clientDOB",       label: "Client date of birth",          ph: "January 5, 1942" },
      { id: "services",        label: "Services to be provided",       ph: "Personal care, medication reminders, light housekeeping, meal prep" },
      { id: "schedule",        label: "Service schedule",              ph: "Monday–Friday, 8 AM – 4 PM" },
      { id: "rate",            label: "Hourly / daily rate",           ph: "$22/hour" },
      { id: "billing",         label: "Billing cycle",                 ph: "Bi-weekly; payment due within 5 business days" },
      { id: "emergencyContact",label: "Client emergency contact",      ph: "Susan Johnson (daughter) — (832) 555-0200" },
      { id: "hipaa",           label: "HIPAA / privacy provisions",    ph: "All health information kept strictly confidential per HIPAA" },
      { id: "state",           label: "Governing state",               ph: "Texas" },
    ],
  },
  {
    id: "childcare_enrollment", cat: "healthcare",
    name: "Childcare Enrollment Agreement", icon: "🧒", desc: "Daycare / early childhood enrollment contract",
    badge: "🆕 Zero competition",
    fields: [
      { id: "center",       label: "Childcare center name",          ph: "Omega Academy of Excellence" },
      { id: "centerAddress",label: "Center address",                 ph: "11796 South Glen Dr, Houston, TX 77099" },
      { id: "childName",    label: "Child full name",                ph: "Emma Grace Johnson" },
      { id: "childDOB",     label: "Child date of birth",           ph: "March 10, 2023" },
      { id: "parent1",      label: "Parent / Guardian 1",           ph: "Jane Johnson" },
      { id: "parent2",      label: "Parent / Guardian 2",           ph: "Michael Johnson" },
      { id: "startDate",    label: "Enrollment start date",         ph: "September 2, 2026" },
      { id: "schedule",     label: "Attendance schedule",           ph: "Full-time, Monday–Friday, 7 AM – 6 PM" },
      { id: "tuition",      label: "Tuition rate",                  ph: "$1,100/month, due on 1st of each month" },
      { id: "lateFee",      label: "Late pickup / payment fees",    ph: "$1/minute after 6 PM; $35 late payment fee after 5 days" },
      { id: "mediaRelease", label: "Photo / media release",         ph: "Authorized for center marketing with parent approval" },
      { id: "state",        label: "Governing state",               ph: "Texas" },
    ],
  },
  {
    id: "medical_auth", cat: "healthcare",
    name: "Medical Authorization Form", icon: "💊", desc: "Authorize medical treatment for another person",
    badge: "🆕 Underserved",
    fields: [
      { id: "authorizer",       label: "Authorizing parent / guardian",      ph: "Jane Doe" },
      { id: "patient",          label: "Patient full name",                  ph: "Emma Doe" },
      { id: "patientDOB",       label: "Patient date of birth",              ph: "March 15, 2018" },
      { id: "relationship",     label: "Relationship to patient",            ph: "Mother" },
      { id: "authorizedPerson", label: "Person authorized to consent",       ph: "Grandmother Mary Smith" },
      { id: "scope",            label: "Scope of medical authorization",     ph: "Emergency and routine medical, dental, and surgical treatment" },
      { id: "insuranceInfo",    label: "Insurance / policy info",            ph: "BlueCross BlueShield — Policy #XXXXXXXXX" },
      { id: "effectiveDates",   label: "Effective dates",                    ph: "July 1–14, 2026" },
      { id: "allergies",        label: "Known allergies / conditions",       ph: "Penicillin allergy; no other known conditions" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // EMPLOYMENT & HR
  // ═══════════════════════════════════════════════════════════════
  {
    id: "employment", cat: "employment",
    name: "Employment Contract", icon: "💼", desc: "Full-time or part-time hire agreement",
    badge: "🔥 High volume",
    fields: [
      { id: "employer",     label: "Employer / company name",   ph: "Omega Academy of Excellence LLC" },
      { id: "employee",     label: "Employee full name",        ph: "Jane Doe" },
      { id: "title",        label: "Job title",                 ph: "Lead Pre-K Teacher" },
      { id: "startDate",    label: "Start date",               ph: "September 2, 2026" },
      { id: "compensation", label: "Compensation",              ph: "$18/hour or $37,440/yr salary" },
      { id: "hours",        label: "Work schedule / hours",    ph: "Monday–Friday, 7:30 AM – 4:30 PM" },
      { id: "benefits",     label: "Benefits",                  ph: "PTO 10 days/yr; health insurance after 90 days" },
      { id: "duties",       label: "Primary job duties",       ph: "Lead classroom instruction, maintain HHSC compliance, parent communication" },
      { id: "atWill",       label: "At-will or for-cause?",    ph: "At-will; 2 weeks notice requested" },
      { id: "state",        label: "Governing state",          ph: "Texas" },
    ],
  },
  {
    id: "separation", cat: "employment",
    name: "Separation Agreement", icon: "📤", desc: "Employee separation and release of claims",
    badge: "⚡ High RPM",
    fields: [
      { id: "employer",         label: "Employer / company",            ph: "Acme Corp" },
      { id: "employee",         label: "Employee full name",            ph: "Jane Doe" },
      { id: "title",            label: "Former job title",              ph: "Operations Manager" },
      { id: "separationDate",   label: "Last day of employment",        ph: "June 30, 2026" },
      { id: "severance",        label: "Severance pay (if any)",        ph: "4 weeks salary ($4,615)" },
      { id: "benefits",         label: "Continuation of benefits",      ph: "Health insurance through July 31, 2026" },
      { id: "releaseOfClaims",  label: "Release of claims scope",       ph: "Employee releases all claims arising from employment" },
      { id: "nonDisparagement", label: "Non-disparagement clause",      ph: "Both parties agree not to disparage the other" },
      { id: "references",       label: "Reference policy",              ph: "Employer confirms dates of employment and title only" },
      { id: "state",            label: "Governing state",               ph: "Texas" },
    ],
  },
];

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────

// ─── TEMPLATE ENGINE (replaces live API call — works on any static host) ──────
const v = (f, id, fallback="") => { const val = f[id]; return val && val.trim() ? val.trim() : fallback; };
const today = () => new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
const witnesses = (n=2) => Array.from({length:n},(_,i)=>`\nWitness ${i+1} Signature: _________________________ Date: ____________\nWitness ${i+1} Printed Name: _______________________________________`).join("\n");
const notary = (state="") => `\n\nSTATE OF ${state.toUpperCase()||"_______________"}\nCOUNTY OF ________________\n\nBefore me this _____ day of ______________, 20___, personally appeared the above-named individual(s).\n\n_________________________________\nNotary Public — Commission Expires: ____________`;
const disclaimer = (lang) => lang==="es"
  ? "\n\n─────────────────────────────────\n⚠ AVISO LEGAL: Este documento fue generado con fines informativos únicamente. No constituye asesoría legal. Consulte a un abogado con licencia en su estado."
  : "\n\n─────────────────────────────────\n⚠ DISCLAIMER: This document is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before signing.";

const TEMPLATES = {
living_will:(f)=>`LIVING WILL\n(Advance Healthcare Directive)\n\nI, ${v(f,"declarant","[Declarant Name]")}, born ${v(f,"dob","[DOB]")}, residing in ${v(f,"city","[City, State]")}, being of sound mind, make this declaration of my healthcare wishes.\n\n1. LIFE-SUSTAINING TREATMENT\n${v(f,"lifeSustaining","Administer or withhold life-sustaining treatment per my healthcare agent's judgment and standard medical practice.")}\n\n2. PAIN MANAGEMENT\n${v(f,"pain","I wish to receive pain relief and comfort care, even if it may hasten death.")}\n\n3. CPR\n${v(f,"cpr","Defer to my healthcare agent and treating physician based on my prognosis.")}\n\n4. ARTIFICIAL NUTRITION AND HYDRATION\n${v(f,"artificialNutr","Determined in consultation with my healthcare agent and treating physician.")}\n\n5. ORGAN DONATION\n${v(f,"organDonation","See separate Organ Donation Declaration.")}\n\n6. ADDITIONAL WISHES\n${v(f,"additionalWishes","None.")}\n\n7. GOVERNING STATE: ${v(f,"state","[State]")}\n\nDeclarant: _________________________  Date: ${today()}\n${witnesses(2)}${notary(v(f,"state"))}`,

advance_directive:(f)=>`ADVANCE HEALTHCARE DIRECTIVE\n(Medical Power of Attorney)\n\nPrincipal: ${v(f,"principal","[Principal Name]")}\nAgent: ${v(f,"agent","[Agent Name]")} — ${v(f,"relationship","[Relationship]")}\nAgent Contact: ${v(f,"agentAddress","[Address & Phone]")}\nAlternate Agent: ${v(f,"altAgent","None designated.")}\n\n1. AUTHORITY GRANTED\n${v(f,"powers","Make all healthcare decisions on my behalf when I lack capacity, consistent with my known wishes.")}\n\n2. LIMITATIONS\n${v(f,"limitations","None beyond applicable law.")}\n\n3. ACTIVATION\n${v(f,"activation","Effective upon written certification of incapacity by my attending physician.")}\n\n4. HIPAA\nAgent authorized to access my protected health information.\n\nState: ${v(f,"state","[State]")}\n\nPrincipal: _________________________  Date: ${today()}\n${witnesses(2)}${notary(v(f,"state"))}`,

funeral_arrangements:(f)=>`FUNERAL PRE-ARRANGEMENT DECLARATION\n\nDeclarant: ${v(f,"declarant","[Name]")} | DOB: ${v(f,"dob","[DOB]")}\n\n1. DISPOSITION METHOD\n${v(f,"burialType","Family/agent to decide.")}\n2. FUNERAL HOME: ${v(f,"funeralHome","Not specified")}\n3. FINAL LOCATION: ${v(f,"cemeteryOrDestination","Not specified")}\n4. SERVICE TYPE: ${v(f,"serviceType","Per family.")}\n5. SERVICE LOCATION: ${v(f,"serviceLocation","Not specified")}\n6. RELIGIOUS/CULTURAL PREFERENCES: ${v(f,"religiousPrefs","None.")}\n7. MUSIC/HYMNS: ${v(f,"musicHymns","Not specified")}\n8. PALLBEARERS: ${v(f,"pallbearers","Selected by family.")}\n9. OFFICIANT: ${v(f,"eulogist","Selected by family.")}\n10. FLOWERS: ${v(f,"flowerPrefs","Per family preference.")}\n11. REPRESENTATIVE: ${v(f,"personalRep","Next of kin.")}\n\nSignature: _________________________  Date: ${today()}\n${witnesses(1)}`,

cremation_auth:(f)=>`CREMATION AUTHORIZATION\n\nAuthorizing Party: ${v(f,"authorizer","[Name]")} | Relationship: ${v(f,"relationship","[Relationship]")}\n\nDeceased: ${v(f,"deceased","[Name]")} | DOB: ${v(f,"deceasedDOB","[DOB]")} | Date of Death: ${v(f,"dateOfDeath","[Date]")}\n\nI hereby authorize ${v(f,"funeralHome","[Funeral Home]")} to cremate the remains of the above-named deceased.\n\nDISPOSITION OF REMAINS: ${v(f,"remainsDisp","Return to authorizing party.")}\nURN PREFERENCE: ${v(f,"containerPref","None specified.")}\nSTATE: ${v(f,"state","[State]")}\n\nI certify I have legal authority to authorize this cremation.\n\nSignature: _________________________  Date: ${today()}\n${witnesses(1)}${notary(v(f,"state"))}`,

body_disposition:(f)=>`BODY DISPOSITION DIRECTIVE\n\nI, ${v(f,"declarant","[Name]")}, born ${v(f,"dob","[DOB]")}, hereby direct:\n\n1. METHOD: ${v(f,"disposition","Designated agent to decide.")}\n2. LOCATION: ${v(f,"location","Not specified.")}\n3. ANATOMICAL GIFT: ${v(f,"anatomicGift","None.")}\n4. ORGAN DONATION: ${v(f,"organDonation","See Organ Donation Declaration.")}\n5. DO NOT WANT: ${v(f,"noDisposition","None specified.")}\n6. AGENT: ${v(f,"agentName","[Agent]")} — ${v(f,"agentPhone","[Phone]")}\n\nState: ${v(f,"state","[State]")}\n\nSignature: _________________________  Date: ${today()}\n${witnesses(2)}${notary(v(f,"state"))}`,

organ_donation:(f)=>`ORGAN AND TISSUE DONATION DECLARATION\n\nDonor: ${v(f,"donor","[Name]")} | DOB: ${v(f,"dob","[DOB]")} | Address: ${v(f,"address","[Address]")}\n\nGIFT: ${v(f,"donationType","Any needed organs and tissues for transplantation, therapy, research, or education.")}\nEXCLUSIONS: ${v(f,"exclusions","None.")}\nCONTACT: ${v(f,"agentName","[Contact Name]")}\nSTATE REGISTRY: ${v(f,"regConfirm","Not specified.")}\nSTATE: ${v(f,"state","[State]")}\n\nPursuant to the Uniform Anatomical Gift Act. May be revoked prior to death.\n\nDonor: _________________________  Date: ${today()}\n${witnesses(2)}`,

memorial_wishes:(f)=>`MEMORIAL SERVICE PLANNING LETTER\n\nFrom: ${v(f,"author","[Author]")}\n\n1. EVENT TYPE: ${v(f,"serviceType","Per family.")}\n2. VENUE: ${v(f,"location","Not specified.")}\n3. TIMING: ${v(f,"timing","Per family.")}\n4. ATTENDEES: ${v(f,"attendees","Open to all.")}\n5. PROGRAM: ${v(f,"program","Per family/officiant.")}\n6. MUSIC: ${v(f,"music","Not specified.")}\n7. SCRIPTURE/READINGS: ${v(f,"scripture","None.")}\n8. SPEAKERS: ${v(f,"speakers","Per family.")}\n9. RECEPTION: ${v(f,"reception","None specified.")}\n10. MEMORIAL FUND: ${v(f,"memorialFund","None.")}\n11. PERSONAL MESSAGE: ${v(f,"personalNotes","None.")}\n\nSignature: _________________________  Date: ${today()}`,

obituary_auth:(f)=>`OBITUARY AUTHORIZATION & DRAFT\n\nName: ${v(f,"fullName","[Full Name]")} | DOB/Birthplace: ${v(f,"dob","[DOB/Birthplace]")}\n\nCareer: ${v(f,"profession","Not specified")}\nMinistry/Affiliation: ${v(f,"ministry","Not specified")}\nSurvivors: ${v(f,"survivors","Not specified")}\nPreceded By: ${v(f,"preceded","Not specified")}\nAchievements: ${v(f,"achievements","Not specified")}\nCharacter: ${v(f,"character","Not specified")}\n\nAUTHORIZATION\nPublish In: ${v(f,"publication","Not specified")}\nPhoto Instructions: ${v(f,"photoInstr","Not specified")}\nFinalized By: ${v(f,"authorizedBy","Not specified")}\n\nSignature: _________________________  Date: ${today()}`,

donotresuscitate:(f)=>`DO NOT RESUSCITATE ORDER (Out-of-Hospital)\n\nPatient: ${v(f,"patient","[Name]")} | DOB: ${v(f,"dob","[DOB]")}\n\nPhysician: ${v(f,"physician","[Name]")} | License: ${v(f,"physicianLicense","[#]")}\nDiagnosis: ${v(f,"diagnosis","[Diagnosis]")}\nAgent: ${v(f,"agentName","[Agent]")}\nState: ${v(f,"state","[State]")}\n\nSCOPE: ${v(f,"scope","In event of cardiac/respiratory arrest: no CPR. Continue comfort care.")}\n\nEffective: ${v(f,"effectiveDate",today())} — Expires: ${v(f,"expirationDate","Until revoked in writing.")}\n\nPatient/Representative: _________________________  Date: ${today()}\nPhysician: _________________________  Date: ____________`,

trust_revocable:(f)=>`${v(f,"trustName","REVOCABLE LIVING TRUST")}\n\nGrantor: ${v(f,"grantor","[Grantor]")}\nTrustee: ${v(f,"trustee","[Trustee]")}\nSuccessor Trustee: ${v(f,"successorTrustee","[Successor]")}\n\n1. BENEFICIARIES\n${v(f,"beneficiaries","[Beneficiary designations]")}\n2. TRUST PROPERTY\n${v(f,"assets","[Assets]")}\n3. INCAPACITY\n${v(f,"incapacityProv","Successor Trustee assumes management upon written certification of incapacity by two physicians.")}\n4. REVOCATION\n${v(f,"revocation","Grantor may revoke or amend at any time while legally competent.")}\n5. STATE: ${v(f,"state","[State]")}\n\nGrantor: _________________________  Date: ${today()}\nTrustee: _________________________  Date: ${today()}\n${notary(v(f,"state"))}`,

lease:(f)=>`RESIDENTIAL LEASE AGREEMENT\n\nLandlord: ${v(f,"landlord","[Landlord]")} | Tenant: ${v(f,"tenant","[Tenant]")}\nProperty: ${v(f,"address","[Address]")}\nTerm: ${v(f,"startDate","[Start]")} to ${v(f,"endDate","[End]")}\nRent: $${v(f,"rent","[Amount]")}/month due on the 1st\nDeposit: $${v(f,"deposit","[Amount]")}\nPets: ${v(f,"pets","No pets without written consent.")}\nUtilities: ${v(f,"utilities","Tenant responsible for all utilities.")}\nState: ${v(f,"state","[State]")}\n\nLandlord shall provide reasonable notice before entry. Tenant shall maintain premises in good condition.\n\nLandlord: _________________________  Date: ${today()}\nTenant: _________________________  Date: ${today()}`,

eviction:(f)=>`NOTICE TO VACATE / PAY OR QUIT\n\nTo: ${v(f,"tenant","[Tenant]")}\nProperty: ${v(f,"address","[Address]")}\nFrom: ${v(f,"landlord","[Landlord]")}\nDate: ${v(f,"noticeDate",today())}\n\nYou are in violation of your lease for:\n${v(f,"reason","Non-payment of rent.")}\n${v(f,"amountOwed") ? "Amount owed: $"+v(f,"amountOwed")+"\n" : ""}You have ${v(f,"daysToComply","3")} days to cure this violation or vacate, per the laws of ${v(f,"state","[State]")}.\n\nFailure to comply may result in eviction proceedings.\n\nLandlord: _________________________  Date: ${today()}`,

quitclaim:(f)=>`QUITCLAIM DEED\n\nGrantor: ${v(f,"grantor","[Grantor]")} | Grantee: ${v(f,"grantee","[Grantee]")}\n\nFor consideration of ${v(f,"consideration","$1 and other valuable consideration")}, Grantor quitclaims to Grantee all right, title, and interest in:\n\n${v(f,"propertyDesc","[Legal Property Description]")}\n\nLocation: ${v(f,"county","[County]")} County, ${v(f,"state","[State]")}\nDate: ${v(f,"date",today())}\n\nThis conveyance is without warranty of title.\n\nGrantor: _________________________  Date: ${today()}\n${notary(v(f,"state"))}\n\nRecord with County Clerk/Recorder of Deeds.`,

room_rental:(f)=>`ROOM RENTAL AGREEMENT\n\nLandlord: ${v(f,"landlord","[Landlord]")} | Roomer: ${v(f,"tenant","[Tenant]")}\nProperty: ${v(f,"address","[Address]")} — Room: ${v(f,"roomDesc","[Description]")}\nRent: $${v(f,"rent","[Amount]")}/month | Deposit: $${v(f,"deposit","[Amount]")}\nShared Areas: ${v(f,"sharedAreas","Kitchen, bathrooms, common areas.")}\nUtilities: ${v(f,"utilitiesIncluded","To be agreed.")}\nGuests: ${v(f,"guestPolicy","Guests permitted with reasonable notice.")}\nState: ${v(f,"state","[State]")}\n\nLandlord: _________________________  Date: ${today()}\nRoomer: _________________________  Date: ${today()}`,

llc:(f)=>`LLC OPERATING AGREEMENT\n${v(f,"llcName","[LLC Name]")} — State of ${v(f,"state","[State]")}\n\nMembers & Ownership:\n${v(f,"members","[Member Names and Percentages]")}\nManaging Member(s): ${v(f,"manager","[Manager]")}\nPurpose: ${v(f,"purpose","Any lawful business purpose.")}\n\nDISTRIBUTIONS: ${v(f,"distributions","Pro rata per ownership percentage.")}\nVOTING: ${v(f,"votingRules","Majority of ownership percentage required for major decisions.")}\nDISSOLUTION: ${v(f,"dissolution","Unanimous written consent of Members or as required by law.")}\n\nNo Member shall be personally liable for LLC obligations solely by reason of membership.\nAmendments require written consent of all Members.\n\nMember Signature: _________________________  Date: ${today()}`,

nda:(f)=>`NON-DISCLOSURE AGREEMENT\n\nDisclosing Party: ${v(f,"party1","[Party 1]")} | Receiving Party: ${v(f,"party2","[Party 2]")}\nPurpose: ${v(f,"purpose","Evaluating a potential business relationship.")}\nType: ${v(f,"type","One-way (Receiving Party bound).")}\nDuration: ${v(f,"duration","3 years from date of disclosure.")}\nState: ${v(f,"state","[State]")}\n\nReceiving Party shall: hold Confidential Information in strict confidence; not disclose to third parties without consent; use only for the stated purpose.\n\nExclusions: publicly available info; independently developed info; info rightfully known prior to disclosure.\n\nDisclosing Party: _________________________  Date: ${today()}\nReceiving Party: _________________________  Date: ${today()}`,

contractor:(f)=>`INDEPENDENT CONTRACTOR AGREEMENT\n\nClient: ${v(f,"client","[Client]")} | Contractor: ${v(f,"contractor","[Contractor]")}\n\nSERVICES:\n${v(f,"services","[Description of Services]")}\nCOMPENSATION: ${v(f,"rate","[Rate]")}\nTERM: ${v(f,"startDate","[Start]")} to ${v(f,"endDate","[End]")}\nSTATE: ${v(f,"state","[State]")}\n\nContractor is an independent contractor, not an employee. Contractor is responsible for own taxes, insurance, and benefits.\n\nIP: ${v(f,"ip","All work product becomes Client property upon full payment.")}\nCONFIDENTIALITY: Contractor keeps Client's proprietary information confidential.\nTERMINATION: Either party may terminate with written notice; payment owed for work completed.\n\nClient: _________________________  Date: ${today()}\nContractor: _________________________  Date: ${today()}`,

bill_of_sale:(f)=>`BILL OF SALE\n\nSeller: ${v(f,"seller","[Seller]")} | Buyer: ${v(f,"buyer","[Buyer]")}\n\nFor $${v(f,"price","[Price]")}, receipt acknowledged, Seller transfers to Buyer:\n\nItem: ${v(f,"item","[Description]")}\nVIN/Serial: ${v(f,"vin","[VIN/Serial #]")}\nCondition: ${v(f,"condition","Sold as-is, no warranty expressed or implied.")}\nDate: ${v(f,"saleDate",today())}\nState: ${v(f,"state","[State]")}\n\nSeller warrants full legal right to sell, free and clear of liens.\n\nSeller: _________________________  Date: ${today()}\nBuyer: _________________________  Date: ${today()}`,

partnership:(f)=>`GENERAL PARTNERSHIP AGREEMENT\n\nPartners: ${v(f,"partner1","[Partner 1]")} and ${v(f,"partner2","[Partner 2]")}\nBusiness Name: ${v(f,"bizName","[Name]")}\nPurpose: ${v(f,"purpose","[Purpose]")}\nProfit/Loss Split: ${v(f,"split","Equal between partners.")}\nCapital Contributions: ${v(f,"capitalContrib","[Details]")}\nManagement: ${v(f,"management","Shared equally.")}\nState: ${v(f,"state","[State]")}\n\nPartners share personal liability for partnership obligations under applicable state law.\nDissolution by mutual written agreement or per state law.\n\nPartner 1: _________________________  Date: ${today()}\nPartner 2: _________________________  Date: ${today()}`,

grant_agreement:(f)=>`GRANT AWARD AGREEMENT\n\nFunder: ${v(f,"funder","[Funder]")} | Grantee: ${v(f,"grantee","[Grantee]")}\nGrantee EIN: ${v(f,"granteeEIN","[EIN]")}\nAmount: $${v(f,"amount","[Amount]")}\n\nPURPOSE:\n${v(f,"purpose","[Specific Purpose]")}\nGRANT PERIOD: ${v(f,"startDate","[Start]")} to ${v(f,"endDate","[End]")}\nREPORTING: ${v(f,"reporting","Progress and final reports as requested.")}\nUNUSED FUNDS: ${v(f,"returnProvision","Returned within 90 days of period end.")}\nSTATE: ${v(f,"state","[State]")}\n\nFunds are restricted to the stated purpose. Material changes require prior written approval.\n\nFunder: _________________________  Date: ${today()}\nGrantee: _________________________  Date: ${today()}`,

will:(f)=>`LAST WILL AND TESTAMENT OF ${v(f,"testator","[NAME]").toUpperCase()}\n\nI, ${v(f,"testator","[Testator]")}, resident of ${v(f,"city","[City, State]")}, being of sound mind, declare this my Last Will and Testament, revoking all prior wills.\n\n1. EXECUTOR: ${v(f,"executor","[Executor]")}\n2. BENEFICIARIES:\n${v(f,"beneficiaries","[Beneficiary Designations]")}\n3. SPECIFIC BEQUESTS: ${v(f,"specificBequests","None.")}\n4. GUARDIAN FOR MINOR CHILDREN: ${v(f,"guardian","See court appointment.")}\n5. DEBTS: My Executor shall pay all just debts and expenses.\n6. RESIDUARY: All remaining assets to the beneficiaries named above.\n7. STATE: ${v(f,"state","[State]")}\n\nTestator: _________________________  Date: ${today()}\n${witnesses(2)}${notary(v(f,"state"))}`,

poa:(f)=>`POWER OF ATTORNEY\n\nPrincipal: ${v(f,"principal","[Principal]")} | Agent: ${v(f,"agent","[Agent]")} (${v(f,"agentRelation","[Relationship]")})\nEffective: ${v(f,"startDate",today())}\nState: ${v(f,"state","[State]")}\n\nPOWERS GRANTED:\n${v(f,"powers","Financial, banking, and general legal matters.")}\n\nDURABILITY: This is a Durable Power of Attorney — it remains in effect upon the Principal's incapacity.\n\nThird parties may rely upon this document as evidence of Agent's authority.\nMay be revoked at any time by written notice.\n\nPrincipal: _________________________  Date: ${today()}\n${notary(v(f,"state"))}`,

child_travel:(f)=>`CHILD TRAVEL CONSENT\n\nParent/Guardian: ${v(f,"parentName","[Parent]")}\nChild: ${v(f,"childName","[Child]")} | DOB: ${v(f,"childDOB","[DOB]")}\nTraveling With: ${v(f,"travelingWith","[Adult]")}\nDestination: ${v(f,"destination","[Destination]")}\nDates: ${v(f,"travelDates","[Dates]")}\nEmergency Contact: ${v(f,"emergencyContact","[Name & Phone]")}\nMedical Consent: ${v(f,"medicalConsent","Accompanying adult authorized to consent to emergency medical treatment if parent unavailable.")}\n\nI certify I am the legal parent/guardian.\n\nParent/Guardian: _________________________  Date: ${today()}\n${notary("")}`,

prenup:(f)=>`PRENUPTIAL AGREEMENT\n\nParty 1: ${v(f,"party1","[Party 1]")} | Party 2: ${v(f,"party2","[Party 2]")}\nAnticipated Marriage Date: ${v(f,"weddingDate","[Date]")}\nState: ${v(f,"state","[State]")}\n\n1. SEPARATE PROPERTY OF PARTY 1:\n${v(f,"party1Assets","[Assets]")}\n2. SEPARATE PROPERTY OF PARTY 2:\n${v(f,"party2Assets","[Assets]")}\n3. MARITAL PROPERTY:\n${v(f,"maritalProperty","Governed by applicable state law unless otherwise stated.")}\n4. SPOUSAL SUPPORT:\n${v(f,"spousalSupport","As stated or per applicable state law.")}\n\nBoth parties confirm full financial disclosure and voluntary execution. Each has had opportunity to consult independent counsel.\n\nParty 1: _________________________  Date: ${today()}\nParty 2: _________________________  Date: ${today()}\n${notary(v(f,"state"))}`,

mou:(f)=>`MEMORANDUM OF UNDERSTANDING\n\nBetween: ${v(f,"org1","[Org 1]")} (${v(f,"org1Type","[Type]")})\nAnd: ${v(f,"org2","[Org 2]")}\n\nPURPOSE:\n${v(f,"purpose","[Partnership Purpose]")}\n\nRESPONSIBILITIES OF ${v(f,"org1","ORG 1").toUpperCase()}:\n${v(f,"responsibilities1","[Responsibilities]")}\n\nRESPONSIBILITIES OF ${v(f,"org2","ORG 2").toUpperCase()}:\n${v(f,"responsibilities2","[Responsibilities]")}\n\nDURATION: ${v(f,"duration","One year, renewable by mutual written consent.")}\nTERMINATION: ${v(f,"termination","Either party with 30 days written notice.")}\nSTATE: ${v(f,"state","[State]")}\n\nThis MOU is not legally binding except as expressly stated.\n\nOrg 1: _________________________  Date: ${today()}\nOrg 2: _________________________  Date: ${today()}`,

volunteer:(f)=>`VOLUNTEER AGREEMENT\n\nOrganization: ${v(f,"org","[Org]")} | Volunteer: ${v(f,"volunteer","[Name]")}\nRole: ${v(f,"role","[Role]")}\nDuties: ${v(f,"duties","[Duties]")}\nSchedule: ${v(f,"schedule","[Schedule]")}\nBackground Check: ${v(f,"backgroundCheck","Required for roles involving minors or vulnerable populations.")}\n\nCONFIDENTIALITY: ${v(f,"confidentiality","All member and organizational information kept strictly confidential.")}\nLIABILITY: ${v(f,"liabilityWaiver","Volunteer holds Organization harmless for good-faith acts within scope of duties.")}\nAt-will service — may be ended by either party at any time.\n\nOrganization: _________________________  Date: ${today()}\nVolunteer: _________________________  Date: ${today()}`,

donor:(f)=>`DONOR GIFT ACKNOWLEDGMENT\n\nOrganization: ${v(f,"org","[Org]")} | EIN: ${v(f,"orgEIN","[EIN]")}\nDonor: ${v(f,"donor","[Donor]")}\nGift: ${v(f,"giftAmount","[Amount/Description]")}\nPurpose: ${v(f,"giftPurpose","Unrestricted general use.")}\nRestrictions: ${v(f,"restrictions","None.")}\nDate: ${v(f,"date",today())}\n\nNo goods or services were provided in exchange for this gift except as otherwise disclosed.\n\nThis acknowledgment serves as your official receipt for tax purposes pursuant to applicable IRS requirements.\n\nOrganization: _________________________  Date: ${today()}`,

home_health:(f)=>`HOME HEALTH CARE AGREEMENT\n\nAgency: ${v(f,"agency","[Agency]")} | Client: ${v(f,"client","[Client]")} | DOB: ${v(f,"clientDOB","[DOB]")}\n\nSERVICES:\n${v(f,"services","[Services]")}\nSCHEDULE: ${v(f,"schedule","[Schedule]")}\nRATE: ${v(f,"rate","[Rate]")}\nBILLING: ${v(f,"billing","Bi-weekly; due within 5 business days.")}\nEMERGENCY CONTACT: ${v(f,"emergencyContact","[Name & Phone]")}\nHIPAA: All health information kept confidential per HIPAA and state law.\nSTATE: ${v(f,"state","[State]")}\n\nEither party may terminate with reasonable notice.\n\nAgency: _________________________  Date: ${today()}\nClient/Representative: _________________________  Date: ${today()}`,

childcare_enrollment:(f)=>`CHILDCARE ENROLLMENT AGREEMENT\n\nCenter: ${v(f,"center","[Center]")} | Address: ${v(f,"centerAddress","[Address]")}\nChild: ${v(f,"childName","[Name]")} | DOB: ${v(f,"childDOB","[DOB]")}\nParent/Guardian 1: ${v(f,"parent1","[Name]")} | Parent/Guardian 2: ${v(f,"parent2","[Name]")}\n\nStart Date: ${v(f,"startDate","[Date]")}\nSchedule: ${v(f,"schedule","[Schedule]")}\nTuition: ${v(f,"tuition","[Rate]")}\nLate Fees: ${v(f,"lateFee","Per Parent Handbook.")}\nMedia Release: ${v(f,"mediaRelease","Center marketing with parental consent only.")}\nState: ${v(f,"state","[State]")}\n\nParent/Guardian acknowledges receipt of Parent Handbook and agrees to all enrollment policies.\n\nParent/Guardian: _________________________  Date: ${today()}\nCenter: _________________________  Date: ${today()}`,

medical_auth:(f)=>`MEDICAL AUTHORIZATION\n\nAuthorizing Party: ${v(f,"authorizer","[Name]")} | Patient: ${v(f,"patient","[Name]")} | DOB: ${v(f,"patientDOB","[DOB]")}\nRelationship: ${v(f,"relationship","[Relationship]")}\nAuthorized Person: ${v(f,"authorizedPerson","[Name]")}\n\nSCOPE: ${v(f,"scope","Routine and emergency medical, dental, and surgical treatment as deemed necessary.")}\nINSURANCE: ${v(f,"insuranceInfo","[Provider & Policy #]")}\nEFFECTIVE: ${v(f,"effectiveDates",today())}\nALLERGIES/CONDITIONS: ${v(f,"allergies","None reported.")}\n\nI certify I am the legal parent/guardian with authority to grant this authorization.\n\nAuthorizing Party: _________________________  Date: ${today()}\n${notary("")}`,

employment:(f)=>`EMPLOYMENT CONTRACT\n\nEmployer: ${v(f,"employer","[Employer]")} | Employee: ${v(f,"employee","[Employee]")}\nTitle: ${v(f,"title","[Job Title]")} | Start Date: ${v(f,"startDate","[Date]")}\nCompensation: ${v(f,"compensation","[Amount]")}\nSchedule: ${v(f,"hours","[Schedule]")}\nBenefits: ${v(f,"benefits","Per Employer's standard policy.")}\nState: ${v(f,"state","[State]")}\n\nDUTIES:\n${v(f,"duties","[Primary Responsibilities]")}\n\n${v(f,"atWill","This is an at-will employment relationship. Either party may end employment at any time with or without cause, subject to applicable law.")}\n\nEmployee agrees to maintain confidentiality of proprietary Employer information.\n\nEmployer: _________________________  Date: ${today()}\nEmployee: _________________________  Date: ${today()}`,

separation:(f)=>`EMPLOYEE SEPARATION AGREEMENT\n\nEmployer: ${v(f,"employer","[Employer]")} | Employee: ${v(f,"employee","[Employee]")}\nFormer Title: ${v(f,"title","[Title]")} | Last Day: ${v(f,"separationDate","[Date]")}\nSeverance: ${v(f,"severance","None unless stated.")}\nBenefits Continuation: ${v(f,"benefits","Per COBRA/state law.")}\nState: ${v(f,"state","[State]")}\n\nRELEASE: ${v(f,"releaseOfClaims","Employee releases all claims arising from employment to the fullest extent permitted by law.")}\nNON-DISPARAGEMENT: ${v(f,"nonDisparagement","Both parties agree not to make disparaging statements about each other.")}\nREFERENCES: ${v(f,"references","Neutral reference: dates of employment and title only.")}\nCONFIDENTIALITY: Terms remain confidential except as required by law.\n\nEmployer: _________________________  Date: ${today()}\nEmployee: _________________________  Date: ${today()}`,
};

function generateDocument(docId, formData, language) {
  const fn = TEMPLATES[docId];
  const body = fn ? fn(formData||{}) : "Template not found for this document type.";
  return body + disclaimer(language||"en");
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCat, setActiveCat] = useState("end_of_life");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState("en");
  const [generating, setGenerating] = useState(false);
  const [docText, setDocText] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const streamRef = useRef("");

  const catDocs = DOCS.filter((d) => d.cat === activeCat);
  const catMeta = CATEGORIES.find((c) => c.id === activeCat);

  const selectDoc = (doc) => { setSelectedDoc(doc); setFormData({}); setDocText(""); setActiveTab("form"); };
  const handleField = (id, val) => setFormData((p) => ({ ...p, [id]: val }));

  // ── GENERATE (template engine — no API call, works on any static host) ──
  const generate = () => {
    if (!selectedDoc) return;
    setGenerating(true);
    setDocText("");
    setActiveTab("document");
    // Use setTimeout to let React render the "Drafting…" state before computing
    setTimeout(() => {
      try {
        const result = generateDocument(selectedDoc.id, formData, language);
        setDocText(result);
      } catch (e) {
        setDocText("⚠ Error generating document: " + e.message);
      }
      setGenerating(false);
    }, 300);
  };

  const copyDoc = () => { navigator.clipboard.writeText(docText); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const printDoc = () => {
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>${selectedDoc?.name}</title>
    <style>body{font-family:Georgia,serif;max-width:820px;margin:48px auto;padding:0 24px;font-size:11.5pt;line-height:1.75;color:#111}pre{white-space:pre-wrap;font-family:Georgia,serif;font-size:11.5pt;line-height:1.75}@media print{body{margin:0;padding:16px}}</style></head>
    <body><pre>${docText}</pre></body></html>`);
    w.document.close(); setTimeout(() => w.print(), 400);
  };

  const G="#c8a96e", BG="#09090e", BG2="#0e0e16", BG3="#13131d", BD="#1c1c2a", BD2="#262636", TX="#ddd8cc", MU="#5a5468", HT="#38374a";
  const cc = catMeta?.color || G;
  const totalDocs = DOCS.length;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:BG,color:TX,fontFamily:"'Georgia','Times New Roman',serif",overflow:"hidden"}}>

      {/* ── TOP BAR ── */}
      <div style={{height:50,borderBottom:`1px solid ${BD}`,background:BG2,display:"flex",alignItems:"center",padding:"0 14px",flexShrink:0,gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginRight:6,flexShrink:0}}>
          <div style={{width:24,height:24,borderRadius:5,background:`linear-gradient(135deg,${G},#7a5010)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:BG}}>§</div>
          <span style={{fontSize:13,fontWeight:600,letterSpacing:"0.02em"}}>LexDraft</span>
          <span style={{fontSize:8,background:"#1a1a2e",color:"#7060a0",border:"1px solid #2a2040",borderRadius:20,padding:"1px 7px",letterSpacing:"0.06em",flexShrink:0}}>{totalDocs} DOCS · FREE</span>
        </div>
        <div style={{display:"flex",gap:2,flex:1,overflowX:"auto"}}>
          {CATEGORIES.map((cat)=>{
            const active=activeCat===cat.id;
            return <button key={cat.id} onClick={()=>{setActiveCat(cat.id);setSelectedDoc(null);setDocText("");}}
              style={{background:active?`${cat.color}18`:"transparent",border:`1px solid ${active?cat.color+"44":"transparent"}`,borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",color:active?cat.color:MU,fontFamily:"inherit",whiteSpace:"nowrap",transition:"all .15s",fontWeight:active?600:400}}>
              {cat.icon} {cat.label}
            </button>;
          })}
        </div>
        <div style={{display:"flex",gap:3,flexShrink:0}}>
          {[["en","🇺🇸"],["es","🇲🇽"]].map(([l,flag])=>(
            <button key={l} onClick={()=>setLanguage(l)} style={{background:language===l?G:"transparent",color:language===l?BG:MU,border:`1px solid ${language===l?G:BD2}`,borderRadius:4,padding:"3px 9px",fontSize:10,cursor:"pointer",fontFamily:"inherit",fontWeight:600,transition:"all .15s"}}>
              {flag} {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{width:206,flexShrink:0,borderRight:`1px solid ${BD}`,background:BG2,overflowY:"auto",padding:"8px 6px"}}>
          <div style={{fontSize:8,letterSpacing:"0.12em",color:HT,fontWeight:600,textTransform:"uppercase",padding:"2px 7px 7px"}}>
            {catMeta?.icon} {catMeta?.label} <span style={{opacity:0.5}}>({catDocs.length})</span>
          </div>
          {catDocs.map((doc)=>{
            const active=selectedDoc?.id===doc.id;
            return <button key={doc.id} onClick={()=>selectDoc(doc)}
              style={{width:"100%",textAlign:"left",background:active?`${cc}11`:"transparent",border:`1px solid ${active?cc+"33":"transparent"}`,borderRadius:6,padding:"8px 9px",marginBottom:2,cursor:"pointer",transition:"all .15s"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:6}}>
                <span style={{fontSize:14,lineHeight:"1.3",marginTop:1,flexShrink:0}}>{doc.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:600,color:active?cc:"#bbb8b0",lineHeight:1.3,marginBottom:1}}>{doc.name}</div>
                  <div style={{fontSize:9.5,color:MU,lineHeight:1.4}}>{doc.desc}</div>
                  {doc.badge&&<div style={{fontSize:8.5,color:cc,marginTop:2,opacity:0.8}}>{doc.badge}</div>}
                </div>
              </div>
            </button>;
          })}
          <div style={{marginTop:10,padding:"8px 7px",borderTop:`1px solid ${BD}`}}>
            <div style={{fontSize:8.5,color:HT,lineHeight:1.8}}>All {totalDocs} documents free. No account. AI-generated, state-specific, EN or ES.</div>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {!selectedDoc ? (
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,textAlign:"center"}}>
              <div style={{fontSize:9,letterSpacing:"0.18em",color:HT,textTransform:"uppercase",marginBottom:12}}>Select a document type from the left panel</div>
              <div style={{fontSize:30,fontWeight:400,lineHeight:1.25,marginBottom:12,color:TX}}>
                {totalDocs} Legal Documents.<br/><span style={{color:G}}>AI-Drafted. Free. Instant.</span>
              </div>
              <div style={{fontSize:12.5,color:MU,maxWidth:440,lineHeight:1.85,marginBottom:24}}>
                End-of-life planning, real estate, business, personal, nonprofit, healthcare, and employment documents — complete and ready to sign in seconds. English or Spanish.
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",maxWidth:520}}>
                {["🕊️ Living Will & DNR","⚰️ Funeral Pre-Arrangement","📰 Obituary Authorization","❤️ Organ Donation Declaration","🏦 Revocable Living Trust","🏠 All 50 states","🇲🇽 Spanish output","✝️ Nonprofit & Ministry docs","🏥 Healthcare & Care forms","💼 Employment & HR"].map(t=>(
                  <span key={t} style={{fontSize:9.5,background:BG3,border:`1px solid ${BD2}`,borderRadius:20,padding:"3px 11px",color:MU}}>{t}</span>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* toolbar */}
              <div style={{borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",padding:"0 18px",gap:2,background:BG2,flexShrink:0}}>
                {[["form",`${selectedDoc.icon} Fill Details`],["document","📄 Generated Document"]].map(([tab,label])=>(
                  <button key={tab} onClick={()=>setActiveTab(tab)}
                    style={{background:"transparent",border:"none",borderBottom:`2px solid ${activeTab===tab?cc:"transparent"}`,color:activeTab===tab?cc:MU,padding:"12px 13px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",fontWeight:activeTab===tab?600:400}}>
                    {label}
                  </button>
                ))}
                <div style={{marginLeft:"auto",display:"flex",gap:5,alignItems:"center"}}>
                  {docText&&<>
                    <button onClick={copyDoc} style={{background:"transparent",border:`1px solid ${BD2}`,color:copied?"#6db56d":MU,borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>{copied?"✓ Copied":"Copy"}</button>
                    <button onClick={printDoc} style={{background:"transparent",border:`1px solid ${BD2}`,color:MU,borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>Print / PDF</button>
                  </>}
                  <button onClick={generate} disabled={generating}
                    style={{background:generating?BD2:G,color:generating?MU:BG,border:"none",borderRadius:5,padding:"6px 15px",fontSize:11,cursor:generating?"not-allowed":"pointer",fontWeight:700,fontFamily:"inherit",transition:"all .15s"}}>
                    {generating?"Drafting…":"Generate →"}
                  </button>
                </div>
              </div>

              <div style={{flex:1,overflow:"auto"}}>
                {activeTab==="form"&&(
                  <div style={{padding:"22px 26px",maxWidth:630}}>
                    <div style={{marginBottom:18}}>
                      <div style={{fontSize:17,fontWeight:400,color:TX,marginBottom:3}}>{selectedDoc.icon} {selectedDoc.name}</div>
                      <div style={{fontSize:10.5,color:MU}}>Fill in what you know. Blank fields will use standard legal language.</div>
                    </div>
                    <div style={{display:"grid",gap:13}}>
                      {selectedDoc.fields.map((field)=>(
                        <div key={field.id}>
                          <label style={{display:"block",fontSize:10,color:"#8a8098",marginBottom:4,letterSpacing:"0.04em"}}>{field.label}</label>
                          <input type="text" value={formData[field.id]||""} onChange={(e)=>handleField(field.id,e.target.value)} placeholder={field.ph}
                            style={{width:"100%",background:BG3,border:`1px solid ${BD2}`,borderRadius:5,padding:"8px 10px",fontSize:12,color:TX,fontFamily:"inherit",outline:"none",transition:"border .15s",boxSizing:"border-box"}}
                            onFocus={(e)=>e.target.style.borderColor=cc+"55"}
                            onBlur={(e)=>e.target.style.borderColor=BD2}/>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop:20,padding:"11px 13px",background:BG3,border:`1px solid ${BD}`,borderRadius:6}}>
                      <div style={{fontSize:9.5,color:MU,lineHeight:1.7}}><strong style={{color:"#7a7080"}}>⚠ Disclaimer:</strong> LexDraft documents are AI-generated for informational purposes and do not constitute legal advice. Have a licensed attorney review before signing.</div>
                    </div>
                    <button onClick={generate} disabled={generating}
                      style={{marginTop:13,width:"100%",background:G,color:BG,border:"none",borderRadius:6,padding:"11px 18px",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>
                      {generating?"⏳ Drafting…":`Generate ${selectedDoc.name} →`}
                    </button>
                  </div>
                )}
                {activeTab==="document"&&(
                  <div style={{padding:22}}>
                    {!docText&&!generating&&(
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:60,color:HT,gap:10}}>
                        <div style={{fontSize:26}}>📄</div>
                        <div style={{fontSize:11.5}}>Fill in the form and click Generate</div>
                      </div>
                    )}
                    {(docText||generating)&&(
                      <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:8,padding:"26px 30px",maxWidth:750,margin:"0 auto"}}>
                        {generating&&!docText&&(
                          <div style={{display:"flex",alignItems:"center",gap:8,color:G,fontSize:12,marginBottom:14}}>
                            <span style={{width:7,height:7,borderRadius:"50%",background:G,display:"inline-block",animation:"pulse 1s infinite"}}/>
                            Drafting your {selectedDoc.name}…
                          </div>
                        )}
                        <pre style={{whiteSpace:"pre-wrap",fontFamily:"Georgia,'Times New Roman',serif",fontSize:11.5,lineHeight:1.9,color:"#ccc8be",margin:0}}>
                          {docText}
                          {generating&&<span style={{display:"inline-block",width:2,height:12,background:G,marginLeft:2,animation:"blink .7s infinite"}}/>}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT RAIL ── */}
        <div style={{width:166,flexShrink:0,borderLeft:`1px solid ${BD}`,background:BG2,padding:9,display:"flex",flexDirection:"column",gap:9,overflowY:"auto"}}>
          <div style={{background:BG3,border:`1px dashed ${BD2}`,borderRadius:6,minHeight:125,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:8}}>
            <div style={{fontSize:7.5,color:HT,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>Advertisement</div>
            <div style={{fontSize:8.5,color:HT}}>160×125 · AdSense</div>
          </div>
          <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:6,padding:"9px 9px"}}>
            <div style={{fontSize:8.5,color:MU,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Need a lawyer?</div>
            <div style={{fontSize:9,color:HT,lineHeight:1.7,marginBottom:7}}>Complex situation? Connect with a licensed attorney in your state.</div>
            <a href="#" style={{display:"block",textAlign:"center",background:"#1a1828",border:`1px solid ${BD2}`,borderRadius:4,padding:"5px 7px",fontSize:9,color:G,textDecoration:"none"}}>Find an Attorney →</a>
          </div>
          <div style={{background:BG3,border:`1px dashed ${BD2}`,borderRadius:6,minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:8}}>
            <div style={{fontSize:7.5,color:HT,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>Advertisement</div>
            <div style={{fontSize:8.5,color:HT}}>160×200 · AdSense</div>
          </div>
          <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:6,padding:"9px 9px"}}>
            <div style={{fontSize:8.5,color:MU,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Form LLC / Corp</div>
            <div style={{fontSize:9,color:HT,lineHeight:1.7,marginBottom:7}}>Register your business in any state — fast and affordable.</div>
            <a href="#" style={{display:"block",textAlign:"center",background:"#1a1828",border:`1px solid ${BD2}`,borderRadius:4,padding:"5px 7px",fontSize:9,color:G,textDecoration:"none"}}>Start Now →</a>
          </div>
          <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:6,padding:"9px 9px"}}>
            <div style={{fontSize:8.5,color:MU,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Pre-Plan Funeral</div>
            <div style={{fontSize:9,color:HT,lineHeight:1.7,marginBottom:7}}>Protect your family. Lock in today's prices with a preneed plan.</div>
            <a href="#" style={{display:"block",textAlign:"center",background:"#1a1828",border:`1px solid ${BD2}`,borderRadius:4,padding:"5px 7px",fontSize:9,color:G,textDecoration:"none"}}>Learn More →</a>
          </div>
          <div style={{fontSize:7.5,color:HT,lineHeight:1.7,marginTop:"auto",paddingTop:7,borderTop:`1px solid ${BD}`}}>Not legal advice. Consult an attorney for your situation.</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        input::placeholder{color:#2e2c3e;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:${BG2};}
        ::-webkit-scrollbar-thumb{background:${BD2};border-radius:3px;}
        button:hover{opacity:.85;}
      `}</style>
    </div>
  );
}
