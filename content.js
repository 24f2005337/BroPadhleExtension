let shameCount = parseInt(localStorage.getItem("bro_padhle_shame_count") || "0");
let timerInterval = null;

// Dynamic Dialogues based on Shame Count
function getMemeData(count) {
  if (count >= 3) {
    // RICKROLL TRAP MODE 🔥
    return {
      dialogue: "🕺 YOU GOT RICKROLLED! 🕺\n3 Baar Ignore kiya na? Ab ye gana sun aur chup chap padhne beth!",
      emoji: "🎵",
      isRickroll: true
    };
  } else if (count === 2) {
    return {
      dialogue: "🤬 ABEY SHARAM KAR LE! 🤬\n2 baar ignore kar chuka hai! Future bilkul dark dikh raha hai tera!",
      emoji: "🚨",
      isRickroll: false
    };
  } else if (count === 1) {
    return {
      dialogue: "😤 Ek baar ignore kar diya... Dobara mat karna varna bohot pachtaoge!",
      emoji: "⚠️",
      isRickroll: false
    };
  } else {
    return {
      dialogue: "🚨 PADHAI-LIKHAI KARO, IAS-YAS BANO! 🚨\nYahan Instagram pe timepass karke ghar nahi chalega!",
      emoji: "🤡",
      isRickroll: false
    };
  }
}

// Glitch Effect Generator (Last 10 Seconds)
function applyGlitchEffect(secondsLeft) {
  if (secondsLeft <= 10 && secondsLeft > 0) {
    document.body.classList.add("bro-padhle-glitch");
  } else {
    document.body.classList.remove("bro-padhle-glitch");
  }
}

function createFloatingTimer(secondsLeft) {
  let timerBox = document.getElementById("bro-padhle-floating-timer");
  if (!timerBox) {
    timerBox = document.createElement("div");
    timerBox.id = "bro-padhle-floating-timer";
    document.body.appendChild(timerBox);
  }

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let mins = Math.floor(secondsLeft / 60);
    let secs = secondsLeft % 60;
    let formattedMins = mins < 10 ? '0' + mins : mins;
    let formattedSecs = secs < 10 ? '0' + secs : secs;

    timerBox.innerHTML = `⏱️ Padhai Warning In: <b>${formattedMins}:${formattedSecs}</b> | Shame Count: ${shameCount}`;
    
    // Apply Glitch when < 10s
    applyGlitchEffect(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerBox.remove();
      document.body.classList.remove("bro-padhle-glitch");
      showBroPadhleOverlay();
    }
    secondsLeft--;
  }, 1000);
}

function showBroPadhleOverlay() {
  if (document.getElementById("bro-padhle-overlay")) return;

  const currentMeme = getMemeData(shameCount);

  const overlay = document.createElement("div");
  overlay.id = "bro-padhle-overlay";

  let mediaContent = `<div id="bro-padhle-emoji">${currentMeme.emoji}</div>`;
  
  if (currentMeme.isRickroll) {
    mediaContent = `
      <iframe width="320" height="180" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
      title="Rickroll" frameborder="0" allow="autoplay" allowfullscreen style="border-radius:12px; margin-bottom:15px;"></iframe>
    `;
  }

  overlay.innerHTML = `
    <div id="bro-padhle-container">
      ${mediaContent}
      <div id="bro-padhle-dialogue">"${currentMeme.dialogue}"</div>
      <div id="bro-padhle-subtext">Bas 5 minute bolte bolte timepass level MAX ho gaya! ⚡</div>
      <div id="bro-padhle-shame-box">🔥 Total Shame Count: <b>${shameCount}</b></div>
      <div class="bro-padhle-btn-group">
        <button class="bro-padhle-btn" id="closeTabBtn">Ha Bhai, Padhne Jaa Raha Hu (Close)</button>
        <button class="bro-padhle-btn bro-padhle-btn-danger" id="ignoreBtn">5 Min Aur Dekhunga (Shame On Me)</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("closeTabBtn").addEventListener("click", () => {
    alert("Shabash! Ab jaake padho! 🎓");
    window.location.href = "https://www.google.com";
  });

  document.getElementById("ignoreBtn").addEventListener("click", () => {
    shameCount++;
    localStorage.setItem("bro_padhle_shame_count", shameCount);
    overlay.remove();

    // 5-Minute Timer (300 Seconds)
    createFloatingTimer(300);
  });
}

// Initial Trigger
setTimeout(showBroPadhleOverlay, 1500);