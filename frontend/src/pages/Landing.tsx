import { Link } from "react-router-dom";
import DotGrid from "../components/DotGrid";

export default function Landing() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <DotGrid
        dotSize={6}
        gap={15}
        baseColor="#5227FF"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />

      <div style={{ padding: "2rem" }}>
        <h1>Welcome!</h1>
        <p>This is the landing page.</p>

        <Link to="/survey">
          <button type="button">Start Survey</button>
        </Link>
      </div>
    </div>
  );
}
