import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);

  // Correct initialization for @tsparticles/react v3+ to prevent the white screen crash
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  const analyze = async () => {
    if (!text) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/predict", {
        text: text,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      {/* 🎥 BACKGROUND VIDEO (Local file from public folder) */}
      <video autoPlay loop  playsInline className="background-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* 🌑 DARK OVERLAY (Ensures readability over the video) */}
      <div className="video-overlay"></div>

      {/* 🌌 3D PARTICLES BACKGROUND (Only load when ready) */}
      {particlesReady && (
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: false },
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                repulse: { distance: 120, duration: 0.4 },
              },
            },
            particles: {
              number: {
                value: 70,
                density: { enable: true, area: 800 },
              },
              color: { value: "#00c6ff" },
              links: {
                enable: true,
                color: "#ffffff",
                distance: 140,
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                outModes: { default: "bounce" },
              },
              size: {
                value: { min: 1, max: 4 },
              },
              opacity: {
                value: 0.5,
              },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* 🫧 BUBBLES */}
      <div className="bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🧊 CARD */}
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1>🛡️ Toxic Comment Detector</h1>

        <textarea
          placeholder="Paste your comment here..."
          onChange={(e) => setText(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={analyze}
        >
          Analyze
        </motion.button>

        {/* 🤖 AI SCANNING EFFECT */}
        {loading && (
          <div className="scan-container">
            <div className="scanner">
              <div className="scan-line"></div>
            </div>
            <p className="scan-text">AI is analyzing...</p>
          </div>
        )}

        {/* 📊 RESULT */}
        {result && (
          <div className="result">
            <h3>Result</h3>

            <p><b>{result.comment}</b></p>

            {Object.entries(result.analysis).map(([key, value]) => (
              <p key={key} className={value ? "bad" : "good"}>
                {key}: {value ? "⚠️ Yes" : "✅ No"}
              </p>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;