import flask
import json
from flask import request, jsonify, abort
from flask_cors import CORS
from scripts import *

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>NFL Players</h1><p>Prototype API for accessing the data of NFL players.</p>"

@app.route('/api/v1.0/data', methods=['GET'])
def get_data():
    with open('2019.json') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/v1.0/data/<int:id>', methods=['GET'])
def get_player(id):
    with open('2019.json') as f:
        data = json.load(f)
    if id > 619:
        abort(404)
    
    name = data[id]['Player']
    player_point_progression(name)
    compare_player_position(name)
    
    return jsonify(data[id])

# runs application server
app.run()
