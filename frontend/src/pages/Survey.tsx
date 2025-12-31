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
    exercise_days: string;
    caffeine_intake: string;
    screen_time: string;
}

export default function Survey() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
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
        caffeine_intake: "",
        screen_time: "",
        exercise_days: "",
        sunny: 0,
        cloudy: 0,
        rainy: 0,
        snowy: 0,
    });

    const [selectedWeather, setSelectedWeather] = useState<string>("");
    const totalPages = 5;

    const handleSliderChange = (field: keyof SurveyData, value: number) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInputChange = (field: keyof SurveyData, value: string | number) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleWeatherChange = (weather: string) => {
        setSelectedWeather(weather);
        const weatherData = { sunny: 0, cloudy: 0, rainy: 0, snowy: 0 };

        if (weather === "sunny") weatherData.sunny = 1;
        else if (weather === "cloudy") weatherData.cloudy = 1;
        else if (weather === "rainy") weatherData.rainy = 1;
        else if (weather === "snowy") weatherData.snowy = 1;

        setFormData({ ...formData, ...weatherData });
    };

    const handleNext = () => {
        if (currentPage === 0 && !formData.age) {
            alert("Please select your age");
            return;
        }
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleExitSurvey = () => {
        if (window.confirm("Are you sure you want to exit the survey? Your progress will be lost.")) {
            navigate("/");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.age) {
            alert("Please select your age");
            return;
        }

        if (!selectedWeather) {
            alert("Please select the weather");
            return;
        }

        // Handle optional fields - default to 0 if not filled
        let waterIntakeValue = 0;
        if (formData.water_intake) {
            waterIntakeValue = formData.water_intake === "5+" ? 6 : Number(formData.water_intake);
        }

        const caffeineValue = formData.caffeine_intake ? Number(formData.caffeine_intake) : 0;
        const screenTimeValue = formData.screen_time ? Number(formData.screen_time) : 0;
        const exerciseValue = formData.exercise_days ? Number(formData.exercise_days) : 0;

        const payload = {
            age: Number(formData.age),
            stress_level: formData.stress_level,
            gender: formData.gender,
            menstrual_cycle: formData.menstruation,
            sleep_duration: formData.sleep_duration,
            pain_severity: formData.pain_severity,
            light_sensitivity: formData.light_sensitivity,
            noise_sensitivity: formData.noise_sensitivity,
            food_intake: formData.number_of_meals,
            water_intake: waterIntakeValue,
            weather_sunny: formData.sunny,
            weather_rainy: formData.rainy,
            weather_cloudy: formData.cloudy,
            weather_snowy: formData.snowy,
            exercise_frequency: exerciseValue,
            caffeine_intake: caffeineValue,
            screen_time: screenTimeValue
        };

        // console.log("Sending payload →", payload);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
            const response = await fetch(`${apiUrl}/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Backend error:", error);
                alert("Server error: " + JSON.stringify(error.detail || error));
                return;
            }

            const data = await response.json();
            // console.log("Prediction result:", data);
            navigate("/results", { state: data });

        } catch (error) {
            console.error("Network error:", error);
            alert("Network error. Make sure backend is running.");
        }
    };

    const progressPercentage = ((currentPage + 1) / totalPages) * 100;

    return (
        <div className="survey-container">
            <DotGrid dotSize={6} baseColor="#271E37" activeColor="#5227FF" gap={25} proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
            <Navbar />

            <div className="survey-content">
                <h1>Daily Health Survey</h1>
                <p className="survey-subtitle">Help us understand your migraine patterns</p>

                <div className="survey-card">
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
                        </div>
                        <p className="progress-text">Step {currentPage + 1} of {totalPages}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Page 0: Demographics */}
                        {currentPage === 0 && (
                            <div className="survey-page">
                                <div className="form-group">
                                    <label htmlFor="age">Age *</label>
                                    <select id="age" value={formData.age} onChange={(e) => handleInputChange("age", e.target.value)} required>
                                        <option value="">Select your age</option>
                                        {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                                            <option key={age} value={age}>{age}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="toggle-group">
                                        <button type="button" className={`toggle-btn ${formData.gender === 1 ? "active" : ""}`} onClick={() => handleInputChange("gender", 1)}>Male</button>
                                        <button type="button" className={`toggle-btn ${formData.gender === 0 ? "active" : ""}`} onClick={() => handleInputChange("gender", 0)}>Female</button>
                                    </div>
                                </div>

                                {formData.gender === 0 && (
                                    <div className="form-group">
                                        <label>Currently Menstruating</label>
                                        <div className="toggle-group">
                                            <button type="button" className={`toggle-btn ${formData.menstruation === 1 ? "active" : ""}`} onClick={() => handleInputChange("menstruation", 1)}>Yes</button>
                                            <button type="button" className={`toggle-btn ${formData.menstruation === 0 ? "active" : ""}`} onClick={() => handleInputChange("menstruation", 0)}>No</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Page 1: Health Metrics */}
                        {currentPage === 1 && (
                            <div className="survey-page">
                                <div className="form-group">
                                    <label htmlFor="sleep_duration">Sleep Duration: <span className="slider-value">{formData.sleep_duration} hours</span></label>
                                    <input id="sleep_duration" type="range" min="0" max="12" step="0.5" value={formData.sleep_duration} onChange={(e) => handleSliderChange("sleep_duration", parseFloat(e.target.value))} className="slider" />
                                    <div className="slider-labels"><span>0h</span><span>12h</span></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stress_level">Stress Level: <span className="slider-value">{formData.stress_level}</span></label>
                                    <input id="stress_level" type="range" min="1" max="10" value={formData.stress_level} onChange={(e) => handleSliderChange("stress_level", parseInt(e.target.value))} className="slider" />
                                    <div className="slider-labels"><span>Low</span><span>High</span></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pain_severity">Usual Migraine Pain: <span className="slider-value">{formData.pain_severity}</span></label>
                                    <input id="pain_severity" type="range" min="1" max="10" value={formData.pain_severity} onChange={(e) => handleSliderChange("pain_severity", parseInt(e.target.value))} className="slider" />
                                    <div className="slider-labels"><span>Mild</span><span>Severe</span></div>
                                </div>
                            </div>
                        )}

                        {/* Page 2: Sensitivities */}
                        {currentPage === 2 && (
                            <div className="survey-page">
                                <div className="form-group">
                                    <label>Light Sensitivity</label>
                                    <div className="toggle-group">
                                        <button type="button" className={`toggle-btn ${formData.light_sensitivity === 1 ? "active" : ""}`} onClick={() => handleInputChange("light_sensitivity", 1)}>Yes</button>
                                        <button type="button" className={`toggle-btn ${formData.light_sensitivity === 0 ? "active" : ""}`} onClick={() => handleInputChange("light_sensitivity", 0)}>No</button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Noise Sensitivity</label>
                                    <div className="toggle-group">
                                        <button type="button" className={`toggle-btn ${formData.noise_sensitivity === 1 ? "active" : ""}`} onClick={() => handleInputChange("noise_sensitivity", 1)}>Yes</button>
                                        <button type="button" className={`toggle-btn ${formData.noise_sensitivity === 0 ? "active" : ""}`} onClick={() => handleInputChange("noise_sensitivity", 0)}>No</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Page 3: Diet */}
                        {currentPage === 3 && (
                            <div className="survey-page">
                                <div className="form-group">
                                    <label htmlFor="number_of_meals">Number of Meals Today: <span className="slider-value">{formData.number_of_meals}</span></label>
                                    <input id="number_of_meals" type="range" min="0" max="5" value={formData.number_of_meals} onChange={(e) => handleSliderChange("number_of_meals", parseInt(e.target.value))} className="slider" />
                                    <div className="slider-labels"><span>0</span><span>5</span></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="water_intake">Water Intake (Liters) - Optional</label>
                                    <select id="water_intake" value={formData.water_intake} onChange={(e) => handleInputChange("water_intake", e.target.value)}>
                                        <option value="">None</option>
                                        <option value="1">1L</option>
                                        <option value="2">2L</option>
                                        <option value="3">3L</option>
                                        <option value="4">4L</option>
                                        <option value="5">5L</option>
                                        <option value="5+">5+ L</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="caffeine_intake">Caffeine Intake (Cups) - Optional</label>
                                    <select id="caffeine_intake" value={formData.caffeine_intake} onChange={(e) => handleInputChange("caffeine_intake", e.target.value)}>
                                        <option value="">None</option>

                                        {Array.from({ length: 10 }, (_, i) => i + 1).map(cup => (
                                            <option key={cup} value={cup}>{cup} Cup{cup > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Page 4: Lifestyle */}
                        {currentPage === 4 && (
                            <div className="survey-page">
                                <div className="form-group">
                                    <label htmlFor="screen_time">Screen Time (Hours) - Optional</label>
                                    <select id="screen_time" value={formData.screen_time} onChange={(e) => handleInputChange("screen_time", e.target.value)}>

                                        {Array.from({ length: 13 }, (_, i) => i).map(hour => (
                                            <option key={hour} value={hour}>{hour} Hour{hour !== 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exercise_days">Exercise Days (Last 7 Days) - Optional</label>
                                    <select id="exercise_days" value={formData.exercise_days} onChange={(e) => handleInputChange("exercise_days", e.target.value)}>
                                        <option value="">None</option>
                                        {Array.from({ length: 8 }, (_, i) => i).map(day => (
                                            <option key={day} value={day}>{day} Day{day !== 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="weather">Weather Today *</label>
                                    <select id="weather" value={selectedWeather} onChange={(e) => handleWeatherChange(e.target.value)} required>
                                        <option value="">Select weather</option>
                                        <option value="sunny">☀️ Sunny</option>
                                        <option value="cloudy">☁️ Cloudy</option>
                                        <option value="rainy">🌧️ Rainy</option>
                                        <option value="snowy">❄️ Snowy</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="survey-navigation">
                            <button type="button" className="nav-btn prev-btn" onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
                            <button type="button" className="exit-survey-btn" onClick={handleExitSurvey}>Exit Survey</button>
                            {currentPage < totalPages - 1 ? (
                                <button type="button" className="nav-btn next-btn" onClick={handleNext}>Next</button>
                            ) : (
                                <button type="submit" className="nav-btn submit-btn">Submit</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}