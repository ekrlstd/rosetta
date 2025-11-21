import DotGrid from "../components/DotGrid";
import Navbar from "../components/Navbar";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <DotGrid
        dotSize={6}
        baseColor="#271E37"
        activeColor="#5227FF"
        gap={25}
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      <Navbar />
      <div className="about-content">
        <h1>Your Relief Hub</h1>

        <div className="about-grid">
          <section className="about-section1">
            <h2>Yoga Poses etc.</h2>
            <p>IT'S YOGA TIIIME</p>
          </section>

          <section className="about-section2">
            <h2>Music Goes Here</h2>
            <p>Spotify API saved our asses bruh xD</p>
            <iframe
              src="https://open.spotify.com/embed/track/6MMrsE9vd6ZzsElO5nwm6h"
              width="300"
              height="380"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </section>
        </div>
      </div>
    </div>
  );
}
