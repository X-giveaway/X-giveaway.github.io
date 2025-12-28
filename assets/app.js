// ==============================
// SLOT CODE CONFIG
// ==============================
const SLOT_KEY = "xg_slot_code";
const SLOT_EXPIRY = 30 * 60 * 1000; // 30 minutes

const prizes = [
  "teslamodely",
  "teslamodel3",
  "starlinkfullkit"
];

// ==============================
// SLOT CODE GENERATION
// ==============================
function generateSlotCode() {
  return "XG-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Generate once
if (!localStorage.getItem(SLOT_KEY)) {
  localStorage.setItem(SLOT_KEY, JSON.stringify({
    code: generateSlotCode(),
    created: Date.now(),
    used: false
  }));
}

// ==============================
// MODAL CONTROL
// ==============================
const modal = document.getElementById("slot-modal");
document.getElementById("claim-now").onclick = () => {
  modal.classList.remove("hidden");
};

// ==============================
// VERIFY SLOT CODE
// ==============================
document.getElementById("verify-slot").onclick = () => {
  const input = document.getElementById("slot-input").value.trim();
  const msg = document.getElementById("slot-msg");

  const data = JSON.parse(localStorage.getItem(SLOT_KEY));

  if (!data || input !== data.code) {
    msg.textContent = "Invalid slot code";
    return;
  }

  if (Date.now() - data.created > SLOT_EXPIRY) {
    msg.textContent = "Slot code expired";
    return;
  }

  if (data.used) {
    msg.textContent = "Slot code already used";
    return;
  }

  // Mark used
  data.used = true;
  localStorage.setItem(SLOT_KEY, JSON.stringify(data));

  // Pick prize
  const prize = prizes[Math.floor(Math.random() * prizes.length)];

  // Redirect to prize page
  window.location.href = `prizes/${prize}.html`;
};
