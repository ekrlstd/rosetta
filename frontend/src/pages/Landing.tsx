import { Link } from "react-router-dom";
import DotGrid from "../components/DotGrid";
import Navbar from "../components/Navbar";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
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
      <div className="landing-content">
        <h1>Take Control of Your Migraines</h1>
        <p>
          Log your day, get AI-powered insights, and discover calming music
          tailored to you.
        </p>
        <div className="button-group">
          <Link to="/survey" className="btn">
            Get Started &ensp;→
          </Link>
        </div>
      </div>
    </div>
  );
}
