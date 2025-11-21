def get_recommendations_for_level(level: int):
    """
    Returns yoga, exercises, meditation, and massage recommendations 
    for migraine severity levels (1–4).
    """

    levels = {
        # ---------------------------------------------------
        # LEVEL 1 (0–25%) — Mild Episodic
        # ---------------------------------------------------
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
                "Box Breathing (4-4-4-4)",
                "Gratitude Breathing"
            ],
            "massage": [
                "Gentle Scalp Massage",
                "Light Temple Circles",
                "Occipital Base Massage (Thumb Glide)"
            ]
        },

        # ---------------------------------------------------
        # LEVEL 2 (25–50%) — Moderate Episodic
        # ---------------------------------------------------
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
                "Diaphragmatic Breathing",
                "Soft Ambient Meditation"
            ],
            "massage": [
                "Neck & Shoulder Massage (Finger Glide)",
                "Jaw Relaxation Massage",
                "Ear-to-Shoulder Pressure Release",
                "Upper Trap (Pin & Stretch)"
            ]
        },

        # ---------------------------------------------------
        # LEVEL 3 (50–75%) — Severe High-Frequency
        # ---------------------------------------------------
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
            ],
            "massage": [
                "Temple & Forehead Pressure (Very Gentle)",
                "Occipital Release (Hold Technique)",
                "Sinus Drainage Massage (Light Stroke)",
                "Chevron Scalp Massage"
            ]
        },

        # ---------------------------------------------------
        # LEVEL 4 (75–100%) — Very Severe Chronic
        # ---------------------------------------------------
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
                "4–6 Rhythmic Breathing",
                "Passive Sensory Reduction Audio"
            ],
            "massage": [
                "Feather-Light Scalp Touch",
                "Self-Pressure at Base of Skull (No Circles)",
                "No-Rub Temple Hold (Just Light Pressure)",
                "Cold Pack on Forehead or Neck"
            ]
        }
    }

    return levels.get(level, {})
