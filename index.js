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

// Warning page with alarm fix
app.get("/warning", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>System Breach Alert</title>
  <style>
    body {
      background: #000;
      color: #0f0;
      font-family: monospace;
      padding: 20px;
      overflow: hidden;
      position: relative;
    }
    .tracking {
      color: #f00;
      text-align: center;
      font-size: 1.5em;
      text-shadow: 0 0 10px red;
      margin-bottom: 10px;
    }
    .hacked {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5em;
      color: #0f0;
      text-shadow: 0 0 10px lime;
      animation: blink 0.6s infinite alternate;
      z-index: 10;
    }
    @keyframes blink {
      from { opacity: 1; }
      to { opacity: 0.1; }
    }
    .terminal {
      white-space: pre-wrap;
      font-size: 14px;
      margin-top: 10px;
    }
    .skull {
      width: 160px;
      display: block;
      margin: 20px auto;
      filter: drop-shadow(0 0 15px red);
      animation: pulseSkull 1s infinite ease-in-out, flicker 0.2s infinite;
    }
    @keyframes pulseSkull {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    @keyframes flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
      20%, 22%, 24%, 55% { opacity: 0.3; }
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
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
      color: #f00;
      font-size: 18px;
      font-weight: bold;
      display: none;
      animation: blink 0.8s infinite alternate;
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
  <audio id="alarm" src="/alarm.mp3" autoplay loop></audio>

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
          window.close();
        }, 4000);
      }
    }, 1200);

    setTimeout(() => {
      const hacked = document.getElementById("hacked");
      if (hacked) hacked.remove();
    }, 5000);

    if (navigator.vibrate) {
      navigator.vibrate([600, 200, 400, 300, 800]);
    }

    history.pushState(null, null, location.href);
    window.onpopstate = () => {
      history.pushState(null, null, location.href);
      alert("⛔ You're under investigation. Don't leave.");
    };

    document.onkeydown = e => {
      if (["F5", "r", "R"].includes(e.key) || (e.ctrlKey && ["r", "R"].includes(e.key))) {
        e.preventDefault();
        alert("⚠ Refresh disabled during trace.");
      }
    };

    window.onbeforeunload = () => "⚠ Session trace active. Stay on page.";

    // Ensure audio plays on mobile
    window.addEventListener("load", () => {
      const alarm = document.getElementById("alarm");
      const playAudio = () => {
        if (alarm && alarm.paused) {
          alarm.play().catch(() => {
            document.addEventListener("click", () => {
              alarm.play();
            }, { once: true });
          });
        }
      };
      playAudio();
    });
  </script>
</body>
</html>
  `);
});

// Start server
app.listen(port, () => {
  console.log(`Scammer trap running at http://localhost:${port}`);
});
