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
        <h1>About Relief aHead</h1>

        <div className="about-grid">
          <section className="about-section">
            <h2>What We Do</h2>
            <p>
              Relief aHead is a migraine management tool that helps users
              identify triggers and find relief through personalized music
              recommendations. By tracking daily activities like sleep, food
              intake, and other habits, our machine learning model analyzes
              patterns to provide insights into what might be causing your
              migraines. The app generates custom music playlists with an
              integrated player, designed to help prevent migraines and provide
              calming relief.{" "}
            </p>
          </section>

          <section className="about-section">
            <h2>Tech Stack</h2>
            <p>
              Relief aHead is built with modern web technologies for a fast,
              responsive experience. The frontend is powered by React and Vite,
              providing a lightning-fast development experience and optimal
              performance. Our interactive dot grid background uses GSAP for
              smooth animations, while our machine learning model processes your
              data to deliver personalized insights.
            </p>
          </section>
        </div>

        <section className="about-section team-section">
          <h2>The Team</h2>
          <div className="team-list">
            <a
              href="https://www.linkedin.com/in/aakrishlama/"
              target="_blank"
              rel="noopener noreferrer"
              className="team-member"
            >
              <svg
                className="linkedin-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Aakrish Lama
            </a>
            <a
              href="https://www.linkedin.com/in/abdirashiid-sammantar-3b7863238/"
              target="_blank"
              rel="noopener noreferrer"
              className="team-member"
            >
              <svg
                className="linkedin-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Abdirashid Sammantar
            </a>
            <a
              href="https://www.linkedin.com/in/bhuvan-sai-kasukurthi-181238276/"
              target="_blank"
              rel="noopener noreferrer"
              className="team-member"
            >
              <svg
                className="linkedin-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Bhuvan Sai
            </a>
            <a
              href="https://www.linkedin.com/in/ebbekarlstad/"
              target="_blank"
              rel="noopener noreferrer"
              className="team-member"
            >
              <svg
                className="linkedin-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Ebbe Karlstad
            </a>
            <a
              href="https://www.linkedin.com/in/yashwanth-krishna-devanaboina-66ab83212/"
              target="_blank"
              rel="noopener noreferrer"
              className="team-member"
            >
              <svg
                className="linkedin-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Yashwanth Devanaboina
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
