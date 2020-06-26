import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ff_data from 'media/result.json';

var ff_json = require('./media/result.json');

var data = [];

function Button(props) {
  return (
    <button type = "button" className = "btn btn-light" onClick = {props.onClick}>
      Select
    </button>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      player: {
        age: null,
        cmp: null,
        points: null,
        fumbles: null,
        fum_lost: null,
        games: null,
        started: null,
        interceptions: null,
        p_att: null,
        p_td: null,
        p_yd: null,
        name: null,
        pos: null,
        rec: null,
        ru_td: null,
        ru_yd: null,
        ru_att: null,
        tgt: null,
        team: null,
        y_r: null,
        t_yd: null,
      },
    };

    this.handler = this.handler.bind(this);
  }

  handler(selected) {
    this.setState({
      selected: selected,
    });
  }

  handleClick() {
    axios
      .get('http://localhost:5000/api/v1.0/data/' + this.state.selected.value).then((response) => {
        // clerical info
        const n_name = response.data.Player;
        const n_pos = response.data.Pos;
        const n_age = response.data.Age;
        const n_team = response.data.Tm;

        // game stats
        const n_games = response.data.G;
        const n_started = response.data.GS;

        // rushing info
        

        this.setState({
          player: {
            name: n_name,
            pos: n_pos,
            age: n_age,
            team: n_team,

            games: n_games,
            started: n_started,
          }
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col"></div>
          <div className = "col">
            <p>FFAnalysis</p>
          </div>
          <div className = "col"></div>
        </div>
        <div className = "row mb-2">
          <div className = "col"></div>
          <div className = "col">
            <Dropdown 
              action = {this.handler}
            />
          </div>
          <div className = "col">
            <Button 
              onClick = {() => this.handleClick()}
            />
          </div>
        </div>
        <div className = "row mb-2">
          <Player 
            state = {this.state}
          />
        </div>

      </div>
    );
  }
}

class Dropdown extends React.Component {
  state = {
    selected: null,
  }

  handleChange = selected => {
    this.setState({selected});
    //console.log('Option selected:', selected);
    this.props.action(selected);
  };

  load_json() {
    for(let i = 0; i < ff_json.length; i++) {
      var temp = ff_json[i];
      var temp_two = {label: temp.Player, value: temp.field1};
      data[i] = temp_two;
    }
  }

  render() {
    const {selected} = this.state;

    this.load_json();
    return (
      <Select 
        value = {selected}
        onChange = {this.handleChange}
        options = {data} 
      />

    );
  }
}

function Player(props) {
  return (
    <div className = 'container'>
      <div className = 'row'>
        <p>Name: {props.state.player.name}</p>
      </div>
      <div className = 'row'>
        <p>Position: {props.state.player.pos}</p>
      </div>
      <div className = 'row'>
        <p>Age: {props.state.player.age}</p>
        </div>
      <div className = 'row'>
        <p>Team: {props.state.player.team}</p>
      </div>
    </div>
  );
}

export default App;
