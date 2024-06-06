from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)

CORS(app, origins="*")


@app.route('/')
def default():
    return jsonify({"message": "isto é uma Plataforma cloud"})

@app.route('/api')
def api():
    return jsonify({"message": "Hello, World!"})



if __name__ == "__main__":
    app.run(debug=True, port=8080)