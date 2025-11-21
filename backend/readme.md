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

For spotify:
Backend folder run: brew install mkcert
run this in the Rossetta folder: sudo nano /etc/hosts
mkcert -install
mkcert test-spotify-site.local # DO NOT PUT THIS IN THE BACKEND
127.0.0.1 test-spotify-site.local # past this into the /etc/hosts and save


# dont follow this pls.
uvicorn app.main:app \
  --host test-spotify-site.local \
  --port 5001 \
  --ssl-keyfile test-spotify-site.local-key.pem \
  --ssl-certfile test-spotify-site.local.pem \
  --reload


# run the docker file 
cd backend
docker build --no-cache -t rosetta-backend .
docker run -p 8000:8000 rosetta-backend

{
  "age": 28,
  "stress_level": 8,
  "gender": 1,
  "menstrual_cycle": 0,
  "sleep_duration": 2,
  "pain_severity": 7,
  "light_sensitivity": 1,
  "noise_sensitivity": 1,
  "food_intake": 3,
  "water_intake": 4,
  "exercise_frequency": 0,
  "caffeine_intake": 1,
  "screen_time": 0,
  "weather_sunny": 0,
  "weather_cloudy": 1,
  "weather_rainy": 4,
  "weather_snowy": 8
}


