import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JOKES = [
  { q: "Why do programmers wear glasses?", a: "Because they can't C#." },
  { q: "How many programmers does it take to change a light bulb?", a: "None, that's a hardware problem." },
  { q: "There are 10 types of people in the world...", a: "Those who understand binary, and those who don't." },
  { q: "Why did the programmer quit his job?", a: "Because he didn't get arrays." },
  { q: "What is a programmer's favorite hangout place?", a: "Foo Bar!" },
  { q: "A SQL query walks into a bar, walks up to two tables and asks...", a: "'Can I join you?'" },
  { q: "Why do clean code developers love nature?", a: "Because it has no side effects." },
  { q: "How do you tell an introverted programmer from an extroverted programmer?", a: "An extroverted programmer looks at YOUR shoes when talking to you." }
];

const BackendLoader = ({ onReady }) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const [isDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://url-shortner-ergb.onrender.com';
  // Remove trailing slashes to avoid double slashes like //docs
  const cleanApiUrl = apiUrl.replace(/\/+$/, '');
  const healthUrl = `${cleanApiUrl}/docs`;

  const pageBg = isDarkMode ? '#0f1116' : '#f4f7fa';
  const textColor = isDarkMode ? '#ffffff' : '#212529';
  const mutedTextColor = isDarkMode ? '#9ca3af' : '#6c757d';
  
  const cardBg = isDarkMode ? '#1a1d24' : '#ffffff';
  const cardBorder = isDarkMode ? '#2d333f' : '#e9ecef';
  
  const progressTrackBg = isDarkMode ? '#1a1d24' : '#e9ecef';
  const progressTrackBorder = isDarkMode ? '#2d333f' : '#dee2e6';
  
  const jokeQColor = isDarkMode ? '#f8f9fa' : '#212529';

  // 1. Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 2. Rotate jokes every 7 seconds
  useEffect(() => {
    const jokeTimer = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % JOKES.length);
    }, 7000);
    return () => clearInterval(jokeTimer);
  }, []);

  // 3. Background polling every 5 seconds
  useEffect(() => {
    let active = true;
    const checkBackend = async () => {
      if (isChecking) return;
      setIsChecking(true);
      try {
        console.log(`[Healthcheck] Pinging: ${healthUrl}`);
        // Use native fetch with AbortController for clean health check
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const resp = await fetch(healthUrl, {
          method: 'GET',
          signal: controller.signal,
          mode: 'cors'
        });
        clearTimeout(timeoutId);

        console.log(`[Healthcheck] Status: ${resp.status} (${resp.statusText})`);

        if (active && resp.ok) {
          console.log("[Healthcheck] Backend is healthy! Proceeding.");
          onReady();
        }
      } catch (err) {
        console.error("[Healthcheck] Verification failed:", err);
      } finally {
        if (active) setIsChecking(false);
      }
    };

    // Initial check
    checkBackend();

    // Set interval for polling
    const pollTimer = setInterval(checkBackend, 5000);

    return () => {
      active = false;
      clearInterval(pollTimer);
    };
  }, [apiUrl, onReady]);

  const progressPercent = Math.max(0, Math.min(100, ((45 - timeLeft) / 45) * 100));

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4" style={{ backgroundColor: pageBg, color: textColor, transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <div className="text-center" style={{ maxWidth: '500px', width: '100%' }}>
        
        {/* Pulsing Link/Loader Icon */}
        <div className="mb-4 d-inline-flex align-items-center justify-content-center" style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
          borderRadius: '24px',
          boxShadow: isDarkMode ? '0 0 30px rgba(13, 110, 253, 0.4)' : '0 0 20px rgba(13, 110, 253, 0.15)',
          animation: 'pulse 2s infinite ease-in-out'
        }}>
          <i className="bi bi-cpu-fill text-white fs-1" style={{ animation: 'spin 4s linear infinite' }}></i>
        </div>

        <h3 className="fw-bold mb-2" style={{ letterSpacing: '-0.5px' }}>Waking up the server...</h3>
        <p className="small mb-4 px-3" style={{ color: mutedTextColor }}>
          Our API is hosted on a free platform. It falls asleep after 15 minutes of inactivity and can take up to 45 seconds to spin back up. Thanks for your patience!
        </p>

        {/* Progress Bar Container */}
        <div className="rounded-pill p-1 mb-4" style={{ height: '14px', border: `1px solid ${progressTrackBorder}`, backgroundColor: progressTrackBg }}>
          <div 
            className="h-100 rounded-pill" 
            style={{ 
              width: `${progressPercent}%`, 
              background: 'linear-gradient(90deg, #0d6efd 0%, #00d2ff 100%)',
              transition: 'width 1s linear',
              boxShadow: '0 0 8px rgba(0, 210, 255, 0.5)'
            }}
          />
        </div>

        <div className="text-info small fw-bold mb-4">
          {timeLeft > 0 ? `Estimated wake up time: ${timeLeft}s` : "Should be ready any second now..."}
        </div>

        {/* Rotating Lame Joke Board */}
        <div className="p-4 rounded-4 mb-4" style={{ 
          backgroundColor: cardBg, 
          border: `1px solid ${cardBorder}`, 
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div className="text-primary small fw-semibold text-uppercase mb-2" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
            While we wait, enjoy a lame developer joke:
          </div>
          <div className="fw-bold mb-1" style={{ fontSize: '1rem', color: jokeQColor }}>
            "{JOKES[jokeIndex].q}"
          </div>
          <div className="text-success small fw-semibold mt-1">
            &rarr; {JOKES[jokeIndex].a}
          </div>
        </div>

        {/* Bypass option if time runs out */}
        {timeLeft <= 0 && (
          <button 
            onClick={onReady} 
            className="btn btn-outline-primary btn-sm px-4 py-2 rounded-3 text-uppercase fw-bold"
            style={{ letterSpacing: '0.5px', fontSize: '0.8rem' }}
          >
            Bypass & Try Anyway <i className="bi bi-arrow-right-short"></i>
          </button>
        )}

      </div>

      {/* Embedded keyframe styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(13, 110, 253, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(13, 110, 253, 0.6); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(13, 110, 253, 0.4); }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BackendLoader;
