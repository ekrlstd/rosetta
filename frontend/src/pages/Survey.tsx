import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotGrid from "../components/DotGrid";
import Navbar from "../components/Navbar";
import "./Survey.css";

interface SurveyData {
  age: string;
  stress_level: number;
  gender: number;
  menstruation: number;
  sleep_duration: number;
  pain_severity: number;
  light_sensitivity: number;
  noise_sensitivity: number;
  number_of_meals: number;
  water_intake: string;
  sunny: number;
  cloudy: number;
  rainy: number;
  snowy: number;
}

export default function Survey() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SurveyData>({
    age: "",
    stress_level: 5,
    gender: 1,
    menstruation: 0,
    sleep_duration: 8,
    pain_severity: 5,
    light_sensitivity: 0,
    noise_sensitivity: 0,
    number_of_meals: 3,
    water_intake: "",
    sunny: 0,
    cloudy: 0,
    rainy: 0,
    snowy: 0,
  });

  const [selectedWeather, setSelectedWeather] = useState<string>("");

  const handleSliderChange = (field: keyof SurveyData, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (
    field: keyof SurveyData,
    value: string | number,
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleWeatherChange = (weather: string) => {
    setSelectedWeather(weather);
    // Reset all weather columns to 0
    const weatherData = {
      sunny: 0,
      cloudy: 0,
      rainy: 0,
      snowy: 0,
    };
    // Set selected weather to 1
    if (weather === "sunny") weatherData.sunny = 1;
    else if (weather === "cloudy") weatherData.cloudy = 1;
    else if (weather === "rainy") weatherData.rainy = 1;
    else if (weather === "snowy") weatherData.snowy = 1;

    setFormData({ ...formData, ...weatherData });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey submitted:", formData);
    alert("Thank you for submitting your health data!");
    navigate("/results");
  };

  return (
    <div className="survey-container">
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

      <div className="survey-content">
        <h1>Daily Health Survey</h1>
        <p className="survey-subtitle">
          Help us understand your migraine patterns
        </p>
        <div className="survey-card">
          <form onSubmit={handleSubmit}>
            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <select
                id="age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                required
              >
                <option value="">Select your age</option>
                {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${formData.gender === 1 ? "active" : ""}`}
                  onClick={() => handleInputChange("gender", 1)}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${formData.gender === 0 ? "active" : ""}`}
                  onClick={() => handleInputChange("gender", 0)}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Menstruation (only for female) */}
            {formData.gender === 0 && (
              <div className="form-group">
                <label>Currently Menstruating</label>
                <div className="toggle-group">
                  <button
                    type="button"
                    className={`toggle-btn ${formData.menstruation === 1 ? "active" : ""}`}
                    onClick={() => handleInputChange("menstruation", 1)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${formData.menstruation === 0 ? "active" : ""}`}
                    onClick={() => handleInputChange("menstruation", 0)}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Sleep Duration */}
            <div className="form-group">
              <label htmlFor="sleep_duration">
                Sleep Duration:{" "}
                <span className="slider-value">
                  {formData.sleep_duration} hours
                </span>
              </label>
              <input
                id="sleep_duration"
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={formData.sleep_duration}
                onChange={(e) =>
                  handleSliderChange(
                    "sleep_duration",
                    parseFloat(e.target.value),
                  )
                }
                className="slider"
              />
              <div className="slider-labels">
                <span>0h</span>
                <span>12h</span>
              </div>
            </div>

            {/* Stress Level */}
            <div className="form-group">
              <label htmlFor="stress_level">
                Stress Level:{" "}
                <span className="slider-value">{formData.stress_level}</span>
              </label>
              <input
                id="stress_level"
                type="range"
                min="1"
                max="10"
                value={formData.stress_level}
                onChange={(e) =>
                  handleSliderChange("stress_level", parseInt(e.target.value))
                }
                className="slider"
              />
              <div className="slider-labels">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Pain Severity */}
            <div className="form-group">
              <label htmlFor="pain_severity">
                Usual Migraine Pain:{" "}
                <span className="slider-value">{formData.pain_severity}</span>
              </label>
              <input
                id="pain_severity"
                type="range"
                min="1"
                max="10"
                value={formData.pain_severity}
                onChange={(e) =>
                  handleSliderChange("pain_severity", parseInt(e.target.value))
                }
                className="slider"
              />
              <div className="slider-labels">
                <span>Mild</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Light Sensitivity */}
            <div className="form-group">
              <label>Light Sensitivity</label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${formData.light_sensitivity === 1 ? "active" : ""}`}
                  onClick={() => handleInputChange("light_sensitivity", 1)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${formData.light_sensitivity === 0 ? "active" : ""}`}
                  onClick={() => handleInputChange("light_sensitivity", 0)}
                >
                  No
                </button>
              </div>
            </div>

            {/* Noise Sensitivity */}
            <div className="form-group">
              <label>Noise Sensitivity</label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${formData.noise_sensitivity === 1 ? "active" : ""}`}
                  onClick={() => handleInputChange("noise_sensitivity", 1)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${formData.noise_sensitivity === 0 ? "active" : ""}`}
                  onClick={() => handleInputChange("noise_sensitivity", 0)}
                >
                  No
                </button>
              </div>
            </div>

            {/* Number of Meals */}
            <div className="form-group">
              <label htmlFor="number_of_meals">
                Number of Meals Today:{" "}
                <span className="slider-value">{formData.number_of_meals}</span>
              </label>
              <input
                id="number_of_meals"
                type="range"
                min="1"
                max="5"
                value={formData.number_of_meals}
                onChange={(e) =>
                  handleSliderChange(
                    "number_of_meals",
                    parseInt(e.target.value),
                  )
                }
                className="slider"
              />
              <div className="slider-labels">
                <span>1</span>
                <span>5</span>
              </div>
            </div>

            {/* Water Intake */}
            <div className="form-group">
              <label htmlFor="water_intake">Water Intake (Liters)</label>
              <select
                id="water_intake"
                value={formData.water_intake}
                onChange={(e) =>
                  handleInputChange("water_intake", e.target.value)
                }
                required
              >
                <option value="">Select water intake</option>
                <option value="1">1L</option>
                <option value="2">2L</option>
                <option value="3">3L</option>
                <option value="4">4L</option>
                <option value="5">5L</option>
                <option value="5+">5+ L</option>
              </select>
            </div>

            {/* Weather */}
            <div className="form-group">
              <label htmlFor="weather">Weather Today</label>
              <select
                id="weather"
                value={selectedWeather}
                onChange={(e) => handleWeatherChange(e.target.value)}
                required
              >
                <option value="">Select weather</option>
                <option value="sunny">☀️ Sunny</option>
                <option value="cloudy">☁️ Cloudy</option>
                <option value="rainy">🌧️ Rainy</option>
                <option value="snowy">❄️ Snowy</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Submit Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
