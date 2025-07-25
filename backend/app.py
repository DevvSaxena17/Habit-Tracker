from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# MongoDB config (use env vars in production)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://mongo:27017/habitdb")
mongo = PyMongo(app)

@app.route("/api/users", methods=["GET"])
def get_users():
    users = list(mongo.db.users.find({}, {"_id": 0}))
    return jsonify(users)

@app.route("/api/habits", methods=["GET"])
def get_habits():
    habits = list(mongo.db.habits.find({}, {"_id": 0}))
    return jsonify(habits)

@app.route("/api/habits", methods=["POST"])
def add_habit():
    data = request.json
    mongo.db.habits.insert_one(data)
    return jsonify({"msg": "Habit added"}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000) 