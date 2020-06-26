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


/*
class Button extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <button type = "button" className = "btn btn-light" onClick = {this.props.handleClick}>
        Select
      </button>
    );
  }
}
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      player: {
        age: null,
        att: null,
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
        r_td: null,
        r_yd: null,
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
    //console.log(this.state.selected);
  }

  handleClick() {
    //console.log(this.state.selected);
    //console.log('http://localhost:5000/api/v1.0/data/' + this.state.selected.value)
    axios
      .get('http://localhost:5000/api/v1.0/data/' + this.state.selected.value).then((response) => {
        const n_name = response.data.Player;
        const n_pos = response.data.Pos;
        const n_age = response.data.Age;
        const n_team = response.data.Tm;

        //console.log(n_name)

        this.setState({
          player: {
            name: n_name,
            pos: n_pos,
            age: n_age,
            team: n_team
          }
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-md-4"></div>
          <div className = "col-md-4">
            <p>FFAnalysis</p>
          </div>
          <div className = "col-md-4"></div>
        </div>
        <div className = "row">
          <div className = "col-md-4"></div>
          <div className = "col-md-4">
            <Dropdown 
              action = {this.handler}
            />
          </div>
          <div className = "col-md-4">
            <Button 
              onClick = {() => this.handleClick()}
            />
          </div>
        </div>
        <div className = "container">
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

function Player (props) {
  return (
    <div className = 'row'>
      <div className = "col-md-3">
        <p>Name: {props.state.player.name}</p>
      </div>
      <div className = "col-md-3">
        <p>Position: {props.state.player.pos}</p>
      </div>
      <div className = "col-md-3">
        <p>Age: {props.state.player.age}</p>
      </div>
      <div className = "col-md-3">
        <p>Team: {props.state.player.team}</p>
      </div>
    </div>
  );
}

export default App;
