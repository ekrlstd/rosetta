"use client"

import { useState } from "react"

interface Track {
  title: string
  artist: string
  album: string
  duration: number
  coverUrl: string
}

const sampleResults = [
  {
    title: "Midnight Dreams",
    artist: "Luna Echo",
    album: "Nocturnal Sessions",
    duration: 234,
    coverUrl: "/album-cover-purple-abstract.jpg",
  },
  {
    title: "Electric Sunrise",
    artist: "Neon Waves",
    album: "Digital Horizons",
    duration: 198,
    coverUrl: "/album-cover-orange-sunrise.jpg",
  },
  {
    title: "Velvet Sky",
    artist: "Cosmic Drift",
    album: "Astral Collection",
    duration: 276,
    coverUrl: "/album-cover-blue-starry.jpg",
  },
  {
    title: "Urban Pulse",
    artist: "Metro Sounds",
    album: "City Nights",
    duration: 212,
    coverUrl: "/album-cover-cityscape-night.jpg",
  },
  {
    title: "Crystal Waters",
    artist: "Ambient Flow",
    album: "Nature Echoes",
    duration: 301,
    coverUrl: "/album-cover-water-crystal.jpg",
  },
  {
    title: "Neon Nights",
    artist: "Synthwave Dreams",
    album: "Retro Future",
    duration: 243,
    coverUrl: "/album-cover-neon-retro.jpg",
  },
  {
    title: "Mountain Echo",
    artist: "Acoustic Journey",
    album: "Wild Horizons",
    duration: 187,
    coverUrl: "/album-cover-mountain-nature.jpg",
  },
  {
    title: "Digital Love",
    artist: "Pixel Hearts",
    album: "Binary Romance",
    duration: 229,
    coverUrl: "/album-cover-digital-heart.jpg",
  },
]

export default function Results() {
  const [selectedTrack, setSelectedTrack] = useState<Track>(sampleResults[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a0a" }}>
      {/* Results Section */}
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          borderRight: "1px solid #1a1a1a",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            Search Results
          </h1>
          <p style={{ color: "#888888" }}>Found {sampleResults.length} tracks matching your search</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {sampleResults.map((track, index) => (
            <div
              key={index}
              onClick={() => handleTrackSelect(track)}
              style={{
                padding: "1rem",
                background: "#121212",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a1a"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#121212"
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={track.coverUrl || "/placeholder.svg"}
                  alt={track.album}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "0.375rem",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ flex: "1", minWidth: 0 }}>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#ffffff",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {track.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#888888",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {track.artist} • {track.album}
                </p>
              </div>

              <div style={{ fontSize: "0.875rem", color: "#888888" }}>{formatDuration(track.duration)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Music Player Section */}
      <div
        style={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(to bottom, #1a1025, #0a0a0a)",
        }}
      >
        {/* Album Art */}
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
            <img
              src={selectedTrack.coverUrl || "/placeholder.svg"}
              alt={selectedTrack.album}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "0.75rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
        </div>

        {/* Player Controls */}
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Track Info */}
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedTrack.title}
              </h2>
              <p
                style={{
                  color: "#888888",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedTrack.artist}
              </p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isLiked ? "#ef4444" : "#888888",
                padding: "0.5rem",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <input
              type="range"
              min="0"
              max={selectedTrack.duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              style={{
                width: "100%",
                height: "4px",
                borderRadius: "2px",
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / selectedTrack.duration) * 100}%, #333333 ${(currentTime / selectedTrack.duration) * 100}%, #333333 100%)`,
                appearance: "none",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "#888888",
                marginTop: "0.5rem",
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(selectedTrack.duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isShuffle ? "#8b5cf6" : "#888888",
                padding: "0.5rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>

            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
                padding: "0.5rem",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" y1="19" x2="5" y2="5" />
              </svg>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#8b5cf6",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" style={{ marginLeft: "2px" }} />
                </svg>
              )}
            </button>

            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
                padding: "0.5rem",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="5" x2="19" y2="19" />
              </svg>
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isRepeat ? "#8b5cf6" : "#888888",
                padding: "0.5rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
                padding: "0.5rem",
              }}
            >
              {isMuted || volume === 0 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value))
                if (Number(e.target.value) > 0) setIsMuted(false)
              }}
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "2px",
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${isMuted ? 0 : volume}%, #333333 ${isMuted ? 0 : volume}%, #333333 100%)`,
                appearance: "none",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
