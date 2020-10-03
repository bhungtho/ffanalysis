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
    
    # name = data[id]['Player']
    # player_point_progression(name)
    # compare_player_position(name)
    
    #print(data[id])

    return jsonify(data[id])

@app.route('/api/v1.0/graphs/update', methods=['PUT'])
def update_graphs():
    player_id = int(request.json['id'])
    with open('2019.json') as f:
        data = json.load(f)
    
    f.close()
    
    name = data[player_id]['Player']
    player_point_progression(name)
    compare_player_position(name)
    compare_point_sources(name)

    return ""

@app.route('/api/v1.0/headlines/<int:id>', methods=['GET'])
def get_headlines_api(id):
    with open('2019.json') as f:
        data = json.load(f)
    if id > 619:
        abort(404)

    name = data[id]['Player']

    headlines = get_headlines(name)

    #print(headlines)

    output = jsonify(
        h_one = headlines[0][0],
        l_one = headlines[0][1],
        h_two = headlines[1][0],
        l_two = headlines[1][1],
        h_three = headlines[2][0],
        l_three = headlines[2][1],
        h_four = headlines[3][0],
        l_four = headlines[3][1],
        h_five = headlines[4][0],
        l_five = headlines[4][1],
    )

    #print(output)

    return output



# runs application server
app.run()
