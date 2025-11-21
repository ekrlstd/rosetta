def get_recommendations_for_level(level: int):
    """
    Returns exercises, yoga, and meditation recommendations for a migraine level.
    """

    levels = {
        1: {
            "yoga": ["Cat-Cow", "Mountain Pose", "Forward Fold"],
            "exercises": ["Neck Rolls", "Shoulder Shrugs"],
            "meditation": ["2-Minute Mindfulness", "Gratitude Breathing"]
        },
        2: {
            "yoga": ["Seated Twist", "Child’s Pose", "Bridge Pose"],
            "exercises": ["Scapular Retractions", "Wall Angels"],
            "meditation": ["3–5 Minute Body Scan"]
        },
        3: {
            "yoga": ["Legs-Up-The-Wall", "Supported Butterfly", "Reclined Hero"],
            "exercises": ["Neck Isometrics", "Eye Relaxation"],
            "meditation": ["5-Min Grounding", "Soft Ambience Breathing"]
        },
        4: {
            "yoga": ["Supported Child’s Pose", "Reclined Bound Angle", "Corpse Pose"],
            "exercises": [],
            "meditation": ["7–10 Min Migraine Meditation", "4–6 Rhythmic Breathing"]
        },
        5: {
            "yoga": ["Supported Savasana", "Seated Forward Fold"],
            "exercises": [],
            "meditation": ["Pain-Relief Body Scan", "Low-Frequency Binaural Beats"]
        },
        6: {
            "yoga": ["Dark Room Savasana"],
            "exercises": [],
            "meditation": ["Passive Breathing", "Migraine Relief Guided Track"]
        }
    }

    return levels.get(level, {})
