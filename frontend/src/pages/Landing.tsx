import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome!</h1>
      <p>This is the landing page.</p>

      <Link to="/survey">
        <button>Start Survey</button>
      </Link>
    </div>
  );
}
