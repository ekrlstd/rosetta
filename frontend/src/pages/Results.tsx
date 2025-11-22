import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DotGrid from "../components/DotGrid";
import Navbar from "../components/Navbar";
import "./Results.css";

interface Song {
  track_name: string;
  artists: string;
  album_name: string;
  spotify_url: string;
  duration_ms: number;
}

interface WellnessRecommendations {
  yoga: string[];
  exercises: string[];
  meditation: string[];
  massage: string[];
}

interface BackendResponse {
  predicted_migraine_score: number;
  severity_level: number;
  playlist_length: number;
  songs: Song[];
  wellness_recommendations: WellnessRecommendations;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<BackendResponse | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const backendData = location.state as BackendResponse;
    if (backendData) {
      console.log("Received backend data:", backendData);
      setData(backendData);
    }
  }, [location.state]);

  const getSeverityInfo = (level: number) => {
    const info: Record<number, { label: string; color: string; emoji: string; description: string }> = {
      1: { label: "Mild", color: "#10b981",description: "Low severity - manageable with light activities" },
      2: { label: "Moderate", color: "#f59e0b", description: "Moderate severity - rest and gentle relief methods recommended" },
      3: { label: "Severe", color: "#ef4444",description: "High severity - significant rest and relief measures needed" },
      4: { label: "Critical", color: "#dc2626", description: "Very severe - complete rest and immediate relief required" }
    };
    return info[level] || info[2];
  };

  if (!data) {
    return (
      <div className="about-container">
        <DotGrid dotSize={6} baseColor="#271E37" activeColor="#5227FF" gap={25} proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
        <Navbar />
        <div className="about-content">
          <h1>Your Relief Hub</h1>
          <div className="results-placeholder">
            <div className="placeholder-icon">📊</div>
            <p>No assessment data found</p>
            <button className="take-assessment-btn" onClick={() => navigate('/survey')}>Take Assessment</button>
          </div>
        </div>
      </div>
    );
  }

  const severityInfo = getSeverityInfo(data.severity_level);
  const percentage = data.predicted_migraine_score || 0;
  
  // Calculate circle progress (smaller size)
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="about-container">
      <DotGrid dotSize={6} baseColor="#271E37" activeColor="#5227FF" gap={25} proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
      <Navbar />
      
      <div className="about-content">
        <h1>Your Relief Hub</h1>

        <div className="top-section">
          {/* Music Section with Personalized Playlist */}
          <div className="music-section">
            <h2>Your Personalized Relief Playlist</h2>
            <p className="section-description">{data.playlist_length} songs curated for your migraine level</p>
            
            {data.songs && data.songs.length > 0 && (
              <>
                <div className="spotify-embed-large">
                  <iframe
                    src={data.songs[currentSongIndex].spotify_url}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify Player - ${data.songs[currentSongIndex].track_name}`}
                  ></iframe>
                </div>

                {/* Song Navigation */}
                <div className="song-navigation">
                  <button 
                    onClick={() => setCurrentSongIndex(Math.max(0, currentSongIndex - 1))}
                    disabled={currentSongIndex === 0}
                    className="song-nav-btn"
                  >
                    ← Previous
                  </button>
                  <span className="song-counter">
                    {currentSongIndex + 1} / {data.songs.length}
                  </span>
                  <button 
                    onClick={() => setCurrentSongIndex(Math.min(data.songs.length - 1, currentSongIndex + 1))}
                    disabled={currentSongIndex === data.songs.length - 1}
                    className="song-nav-btn"
                  >
                    Next →
                  </button>
                </div>

                {/* Current Song Info */}
                <div className="current-song-info">
                  <h4>{data.songs[currentSongIndex].track_name}</h4>
                  <p>{data.songs[currentSongIndex].artists}</p>
                  <p className="album-name">{data.songs[currentSongIndex].album_name}</p>
                </div>
              </>
            )}
          </div>

          {/* Results Section with ML Prediction */}
          <div className="results-section">
            <h2>Your Assessment Results</h2>
            <p className="section-description">AI-powered migraine severity analysis</p>
            
            <div className="results-content">
              {/* Circular Severity Score Display */}
              <div className="severity-display">
                <div className="circular-progress">
                  <svg className="progress-ring" width="220" height="220">
                    {/* Background circle */}
                    <circle
                      className="progress-ring-bg"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="14"
                      fill="transparent"
                      r={radius}
                      cx="110"
                      cy="110"
                    />
                    {/* Progress circle */}
                    <circle
                      className="progress-ring-circle"
                      stroke={severityInfo.color}
                      strokeWidth="14"
                      fill="transparent"
                      r={radius}
                      cx="110"
                      cy="110"
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                        transition: 'stroke-dashoffset 1s ease',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%'
                      }}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="progress-content">
                    <div className="severity-emoji">{severityInfo.emoji}</div>
                    <div className="percentage-value" style={{ color: severityInfo.color }}>
                      {percentage.toFixed(1)}%
                    </div>
                    <div className="severity-label" style={{ color: severityInfo.color }}>
                      {severityInfo.label}
                    </div>
                  </div>
                </div>
                
                <p className="severity-description">{severityInfo.description}</p>
              </div>

              <button className="retake-btn" onClick={() => navigate('/survey')}>
                Retake Assessment
              </button>
            </div>
          </div>
        </div>

        {/* Wellness Recommendations Section */}
        {data.wellness_recommendations && (
          <div className="wellness-section">
            <h2>Personalized Wellness Recommendations</h2>
            <p className="section-description">Based on your migraine severity level</p>

            <div className="wellness-grid">
              {/* Yoga */}
              <div className="wellness-card">
                <h3>🧘 Yoga Poses</h3>
                <ul>
                  {data.wellness_recommendations.yoga.map((pose, idx) => (
                    <li key={idx}>{pose}</li>
                  ))}
                </ul>
              </div>

              {/* Exercises */}
              <div className="wellness-card">
                <h3>💪 Exercises</h3>
                <ul>
                  {data.wellness_recommendations.exercises.map((exercise, idx) => (
                    <li key={idx}>{exercise}</li>
                  ))}
                </ul>
              </div>

              {/* Meditation */}
              <div className="wellness-card">
                <h3>🧠 Meditation</h3>
                <ul>
                  {data.wellness_recommendations.meditation.map((meditation, idx) => (
                    <li key={idx}>{meditation}</li>
                  ))}
                </ul>
              </div>

              {/* Massage */}
              <div className="wellness-card">
                <h3>💆 Massage Techniques</h3>
                <ul>
                  {data.wellness_recommendations.massage.map((massage, idx) => (
                    <li key={idx}>{massage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}