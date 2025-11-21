import DotGrid from "../components/DotGrid";
import Navbar from "../components/Navbar";
import "./Results.css";

type SeverityLevel = 1 | 2 | 3 | 4;

export default function Results() {
  // This will be set automatically based on user's assessment results
  const severityLevel: SeverityLevel = 4; // Default - will come from your assessment data

  const yogaData: Record<SeverityLevel, Array<{name: string, description: string, image: string}>> = {
    1: [
      { name: "Cat-Cow", description: "Calms the nervous system and relieves tension.", image: "https://media1.popsugar-assets.com/files/thumbor/FcTiEzA4dpzP5LND0I0csu36jQE=/1456x1456/filters:format_auto():quality(85):extract_cover()/2025/01/10/960/n/1922729/tmp_TSf6dQ_46ee51111cabbf45_PS24_Fitness_CatCow_Horizontal.jpg" },
      { name: "Mountain Pose", description: "Improves posture and reduces tension headaches.", image: "https://yogaindiafoundation.com/wp-content/uploads/2017/11/Parvatasana-scaled.jpeg" },
      { name: "Standing Forward Fold", description: "Releases neck and shoulder tension.", image: "https://cdn.yogajournal.com/wp-content/uploads/2021/11/Uttanasana-Pose_Andrew-Clark_2400x1350.jpeg" },
      { name: "Seated Neck Stretch", description: "Gently stretches neck muscles.", image: "https://publish.purewow.net/wp-content/uploads/sites/2/2017/02/yoga-neck.jpg?fit=680%2C860" }
    ],
    2: [
      { name: "Child's Pose", description: "Calms the mind and relieves stress.", image: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=400" },
      { name: "Seated Twist", description: "Releases tension in the spine.", image: "https://cdn.yogajournal.com/wp-content/uploads/2020/10/ccd06167.jpg" },
      { name: "Bridge Pose", description: "Promotes relaxation and improves circulation.", image: "https://images.squarespace-cdn.com/content/v1/5ea57caad08f387b2e9827bd/1589065441325-J7E0I26U8JDIYZC3DN10/Straight%2BArm%2BBridge.jpg" },
      { name: "Supported Forward Fold", description: "Deep stretching for moderate tension.", image: "https://www.theyogacollective.com/wp-content/uploads/2019/11/AdobeStock_193776776-e1572640128210.jpeg" }
    ],
    3: [
      { name: "Legs-Up-The-Wall", description: "Deep relaxation for severe headaches.", image: "https://cdn.yogajournal.com/wp-content/uploads/2021/12/Legs-Up-the-Wall-Pose_Andrew-Clark_2400x1350.jpeg" },
      {name: "Reclining Bound Angle", description: "Opens the chest and promotes deep breathing.", image: "https://media.yogavastu.com/wp-content/uploads/2020/01/2-supta-baddhakonasana-student-Iyengar-yoga-restorative-pranayama-strengthen-foundations-1600x1000.jpg" },
      { name: "Corpse Pose", description: "Complete relaxation to reset the nervous system.", image: "https://cdn.yogajournal.com/wp-content/uploads/2012/03/savasana-corpse-pose.jpg?width=730" },
      { name: "Supported Child's Pose", description: "Extra support for severe pain.", image: "https://www.theyogacollective.com/wp-content/uploads/2019/10/4143473057707883372_IMG_8546-2-e1572149256273.jpg" }
    ],
    4: [
      { name: "Supported Savasana", description: "Complete rest with full body support.", image: "https://media.yogauonline.com/app/uploads/2022/08/06025845/0.-How-to-practice-Supported-Savasana-or-Relaxation-Pose-also-known-as-Salamba-Savasana-1.webp" },
      { name: "Restorative Side-Lying", description: "Gentle position that minimizes movement.", image: "https://media.yogauonline.com/app/uploads/2023/07/10001407/3-Variation-of-Side-Lying-Supported-Stretch-Pose-arm-variation.webp" },
      { name: "Gentle Supine Relaxation", description: "Minimal movement for debilitating pain.", image: "https://cdn.prod.website-files.com/67691f03eb5bfa3289b3dae7/67691f03eb5bfa3289b3ea25_How-To-Do-Reclined-Spinal-Twist-Pose.jpg" }
    ]
  };

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

        <div className="top-section">
          {/* Music Section - Original Spotify Design */}
          <div className="music-section">
            <h2>Relief Music</h2>
            <p className="section-description">Curated music therapy to help ease your migraine symptoms</p>
            <div className="spotify-embed-large">
              <iframe
                src="https://open.spotify.com/embed/track/6MMrsE9vd6ZzsElO5nwm6h"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Music Player"
              ></iframe>
            </div>
          </div>

          {/* Results Section - Empty */}
          <div className="results-section">
            <h2>Your Results</h2>
            <p className="section-description">Your migraine assessment results will appear here</p>
            <div className="results-placeholder">
              <div className="placeholder-icon">📊</div>
              <p>Complete the assessment to see your personalized results</p>
            </div>
          </div>
        </div>

        {/* Yoga Exercises Section - Auto-updates based on severity level */}
        <div className="yoga-section">
          <h2>Recommended Yoga & Stretches</h2>
          <p className="section-description">Gentle exercises and poses designed for migraine relief</p>
          <div className="yoga-grid">
            {yogaData[severityLevel].map((pose, index) => (
              <div key={index} className="yoga-card">
                <div className="yoga-image-container">
                  <img src={pose.image} alt={pose.name} className="yoga-image" />
                </div>
                <div className="yoga-info">
                  <h3>{pose.name}</h3>
                  <p>{pose.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
