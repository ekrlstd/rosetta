cd backend
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload 