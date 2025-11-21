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

