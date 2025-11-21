def get_recommendations_for_level(level: int):
    """
    Returns yoga, exercises, and meditation recommendations 
    for a specific migraine severity level (1–4).
    """

    levels = {
        # ---------------------------------------
        # LEVEL 1 (0–25%) — Mild Episodic
        # ---------------------------------------
        1: {
            "yoga": [
                "Cat-Cow",
                "Mountain Pose",
                "Standing Forward Fold",
                "Seated Neck Stretch"
            ],
            "exercises": [
                "Neck Rolls",
                "Shoulder Shrugs",
                "Light Posture Reset"
            ],
            "meditation": [
                "2–3 Minute Mindfulness",
                "Breathing Reset (Box Breathing)",
                "Short Gratitude Breathing"
            ]
        },

        # ---------------------------------------
        # LEVEL 2 (25–50%) — Moderate Episodic
        # ---------------------------------------
        2: {
            "yoga": [
                "Child’s Pose",
                "Seated Twist",
                "Bridge Pose",
                "Supported Forward Fold"
            ],
            "exercises": [
                "Scapular Retractions",
                "Wall Angels",
                "Upper Trap Release"
            ],
            "meditation": [
                "3–5 Minute Body Scan",
                "Calm Sound Meditation",
                "Diaphragmatic Breathing"
            ]
        },

        # ---------------------------------------
        # LEVEL 3 (50–75%) — Severe High-Frequency
        # ---------------------------------------
        3: {
            "yoga": [
                "Legs-Up-The-Wall",
                "Supported Butterfly Pose",
                "Reclined Hero",
                "Reclined Bound Angle"
            ],
            "exercises": [
                "Neck Isometrics (Very Light)",
                "Eye Relaxation Routine",
                "Gentle Chin Tucks"
            ],
            "meditation": [
                "5–7 Min Grounding Meditation",
                "Soft Ambience Breathing",
                "Guided Tension Release"
            ]
        },

        # ---------------------------------------
        # LEVEL 4 (75–100%) — Very Severe Chronic
        # ---------------------------------------
        4: {
            "yoga": [
                "Supported Child’s Pose",
                "Supported Savasana",
                "Reclined Bound Angle (Fully Supported)",
                "Dark Room Resting Pose"
            ],
            "exercises": [],
            "meditation": [
                "7–10 Min Migraine Relief Meditation",
                "Low-Stimulation Breathing (4–6 Pattern)",
                "Passive Sensory Reduction Audio"
            ]
        }
    }

    return levels.get(level, {})
