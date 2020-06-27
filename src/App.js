import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ff_data from 'media/result.json';

var ff_json = require('./media/2019.json');

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
        name: null,
        pos: null,
        age: null,
        team: null,
        fp: null,
        g: null,
        gs: null,
        p_yd: null,
        p_td: null,
        p_att: null,
        ru_yd: null,
        ru_td: null,
        ru_att: null,
        rec: null,
        tgt: null,
        re_yd: null,
        re_td: null,
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
        const n_fp = response.data.FantasyPoints;
        const n_games = response.data.G;
        const n_started = response.data.GS;

        // passing info
        const n_p_yd = response.data.PassingYds;
        const n_p_td = response.data.PassingTD;
        const n_p_att = response.data.PassingAtt;

        // rushing info
        const n_ru_yd = response.data.RushingYds;
        const n_ru_td = response.data.RushingTD;
        const n_ru_att = response.data.RushingAtt;

        // receiving info
        const n_rec = response.data.Rec;
        const n_tgt = response.data.Tgt;
        const n_re_yd = response.data.ReceivingYds;
        const n_re_td = response.data.ReceivingTD;

        this.setState({
          player: {
            name: n_name,
            pos: n_pos,
            age: n_age,
            team: n_team,

            fp: n_fp,
            g: n_games,
            gs: n_started,

            p_yd: n_p_yd,
            p_td: n_p_td,
            p_att: n_p_att,

            ru_yd: n_ru_yd,
            ru_td: n_ru_td,
            ru_att: n_ru_att,

            rec: n_rec,
            tgt: n_tgt,
            re_yd: n_re_yd,
            re_td: n_re_td,
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
        <p className = 'font-weight-bold'>Clerical Info</p>
      </div>
      <div className = 'row'>
        <p>Name: {props.state.player.name}</p>
      </div>
      <div className = 'row'>
        <p>Position: {props.state.player.pos}</p>
      </div>
      <div className = 'row'>
        <p>Age: {props.state.player.age}</p>
        </div>
      <div className = 'row mb-2'>
        <p>Team: {props.state.player.team}</p>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Game Stats (2019)</p>
      </div>
      <div className = 'row'>
        <p>Fantasy Points: {props.state.player.fp}</p>
      </div>
      <div className = 'row'>
        <p>Games: {props.state.player.g}</p>
      </div>
      <div className = 'row mb-2'>
        <p>Games Started: {props.state.player.gs}</p>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Passing Info (2019)</p>
      </div>
      <div className = 'row'>
        <p>Passing Atts: {props.state.player.p_att}</p>
      </div>
      <div className = 'row'>
        <p>Passing Yds: {props.state.player.p_yd}</p>
      </div>
      <div className = 'row mb-2'>
        <p>Passing TDs: {props.state.player.p_td}</p>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Rushing Info (2019)</p>
      </div>
      <div className = 'row'>
        <p>Rushing Att: {props.state.player.ru_att}</p>
      </div>
      <div className = 'row'>
        <p>Rushing Yds: {props.state.player.ru_yd}</p>
      </div>
      <div className = 'row mb-2'>
        <p>Rushing TDs: {props.state.player.ru_td}</p>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Receiving Info (2019)</p>
      </div>
      <div className = 'row'>
        <p>Receptions: {props.state.player.rec}</p>
      </div>
      <div className = 'row'>
        <p>Targets: {props.state.player.tgt}</p>
      </div>
      <div className = 'row'>
        <p>Receiving Yds: {props.state.player.re_yd}</p>
      </div>
      <div className = 'row'>
        <p>Receiving TDs: {props.state.player.re_td}</p>
      </div>
    </div>
  );
}

export default App;
