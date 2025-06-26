const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;

// Setup file upload
const upload = multer({ dest: "uploads/" });

// Serve static files like skull image and alarm sound
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve form.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

// Handle form submission and redirect to warning page
app.post("/submit", upload.single("certificate"), (req, res) => {
  console.log("Scammer Alert 🚨");
  console.log("Name:", req.body.name);
  console.log("Bots:", req.body.bots);
  console.log("Emoji:", req.body.emoji);
  console.log("Fake Cert:", req.file);
  res.redirect("/warning");
});

// Serve warning page
app.get("/warning", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>System Breach Alert</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background: #000;
      color: #0f0;
      font-family: monospace;
      padding: 20px;
      overflow: hidden;
      position: relative;
      margin: 0;
    }

    .tracking {
      color: #f00;
      text-align: center;
      font-size: 1.3em;
      text-shadow: 0 0 10px red;
      margin-bottom: 10px;
    }

    .hacked {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2em;
      color: #0f0;
      text-shadow: 0 0 10px lime;
      animation: blink 0.6s infinite alternate;
      z-index: 10;
      text-align: center;
      padding: 0 10px;
      white-space: normal;
    }

    @keyframes blink {
      from { opacity: 1; }
      to { opacity: 0.1; }
    }

    .terminal {
      white-space: pre-wrap;
      font-size: 15px;
      word-break: break-word;
      margin-top: 10px;
      max-height: 40vh;
      overflow-y: auto;
      padding: 10px;
      box-sizing: border-box;
      background: rgba(0,255,0,0.05);
      border-top: 1px dashed #0f0;
      border-bottom: 1px dashed #0f0;
    }

    .skull {
      width: 140px;
      display: block;
      margin: 10px auto;
      filter: drop-shadow(0 0 15px red);
      animation: pulseSkull 1s infinite ease-in-out, flicker 0.2s infinite;
    }

    @keyframes pulseSkull {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    @keyframes flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        opacity: 1;
      }
      20%, 22%, 24%, 55% {
        opacity: 0.3;
      }
    }

    .overlay {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(255, 0, 0, 0.1);
      pointer-events: none;
      z-index: 0;
      animation: flashbg 1s infinite alternate;
    }

    @keyframes flashbg {
      from { background-color: rgba(255, 0, 0, 0.1); }
      to { background-color: rgba(255, 0, 0, 0.3); }
    }

    .screenshot {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 13px;
      color: #0ff;
      background: rgba(0,0,0,0.5);
      padding: 6px 10px;
      border: 1px solid #0ff;
      border-radius: 4px;
      animation: screenshot 1s steps(1) infinite;
    }

    .shutdown {
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      color: #f00;
      font-size: 16px;
      font-weight: bold;
      display: none;
      animation: blink 0.8s infinite alternate;
      text-align: center;
      padding: 0 10px;
    }

    @media (max-width: 600px) {
      body {
        padding: 15px 10px;
      }

      .tracking {
        font-size: 1.1em;
      }

      .hacked {
        font-size: 1.5em;
      }

      .terminal {
        font-size: 13px;
        max-height: 45vh;
      }

      .skull {
        width: 100px;
        margin: 10px auto;
      }

      .shutdown {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="overlay"></div>
  <div class="tracking">🔍 YOU ARE BEING TRACKED 🔍</div>
  <img src="/skull.jpg" class="skull" alt="Skull">
  <div id="hacked" class="hacked">💻 YOU HAVE BEEN HACKED 💻</div>
  <div class="terminal" id="terminal">Initializing breach protocol...</div>
  <div class="screenshot">📸 Taking Screenshot...</div>
  <div class="shutdown" id="shutdown">⚠ SYSTEM MEMORY LOW – FORCING SHUTDOWN...</div>

  <audio id="alarm" src="/alarm.mp3" preload="auto" loop></audio>

  <script>
  const terminal = document.getElementById("terminal");
  const logs = [
    "📡 Connecting to exploit backend...",
    "🔍 Deep scan of host device active...",
    "🧠 Memory scan initiated...",
    "📂 Indexing desktop folders...",
    "🛑 Security bypass complete.",
    "📸 Capturing live screenshots...",
    "📁 Uploading local data...",
    "🧾 Capturing session storage...",
    "🌐 Tracing user location...",
    "📍 Location: Tamil Nadu, India",
    "🌐 IP Address: 2405:204:dead:beef::1",
    "⚠ Memory overload at 97%...",
    "⚠ Kernel panic simulation triggered...",
    "💀 Shutting down interface..."
  ];
  let i = 0;
  const interval = setInterval(() => {
    if (i < logs.length) {
      terminal.textContent += "\\n" + logs[i++];
    } else {
      clearInterval(interval);
      document.getElementById("shutdown").style.display = "block";
      setTimeout(() => {
        window.close(); // Attempt to close tab
      }, 4000);
    }
  }, 1200);

  setTimeout(() => {
    const hacked = document.getElementById("hacked");
    if (hacked) hacked.remove();
  }, 5000);

  // 🔊 Ensure alarm plays (even on mobile)
  const alarm = document.getElementById("alarm");

  const tryPlayAlarm = () => {
    const playPromise = alarm.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("🔊 Alarm playing.");
        })
        .catch(() => {
          console.log("⚠ Waiting for interaction...");
          const interactionHandler = () => {
            alarm.play().catch(err => console.error("Play failed:", err));
            document.removeEventListener("click", interactionHandler);
            document.removeEventListener("touchstart", interactionHandler);
          };
          document.addEventListener("click", interactionHandler);
          document.addEventListener("touchstart", interactionHandler);
        });
    }
  };

  window.addEventListener("DOMContentLoaded", tryPlayAlarm);

  // 🔐 Block back button, closing, and refresh
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", () => {
    history.pushState(null, "", location.href);
    alert("⛔ Escape attempt detected! You're under surveillance.");
  });

  document.onkeydown = e => {
    if (
      ["F5"].includes(e.key) ||
      (e.ctrlKey && ["r", "R"].includes(e.key))
    ) {
      e.preventDefault();
      alert("⚠ Refresh is disabled during system trace.");
    }
  };

  window.onbeforeunload = () => "⚠ Session trace is active. Don't leave.";

  // Optional: Vibrate on page load
  if (navigator.vibrate) {
    navigator.vibrate([600, 200, 400, 300, 800]);
  }
</script>
</body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`Scammer trap running at http://localhost:${port}`);
});


