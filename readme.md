## Cloud Platform

### Google Cloud Platform

Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, file storage, and YouTube. Alongside a set of management tools, it provides a series of modular cloud services including computing, data storage, data analytics and machine learning.

### Requirements

- Python 3.6 or higher
- Google Cloud SDK
- Google Cloud Storage
- NPM

### Installation

1. Clone the repository

2. Get Google Cloud keys and save them in the server folder with the name `credentials.json`

3. Install the dependencies inside the server folder

```bash
pip install -r requirements.txt
```

4. Install the dependencies inside the client folder

```bash
npm install
```

5. Inside the server folder, in server.py, change the IP address to your VM that runs Open Nebula

```python
IP = "104.199.41.215" # Change this to your VM IP
```

6. To run the server, execute the following command inside the server folder

```bash
python server.py
```

7. To run the client, execute the following command inside the client folder

```bash
npm run dev
```

8. Open your browser and go to http://localhost:5173
