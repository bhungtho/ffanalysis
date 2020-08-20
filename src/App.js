import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Select_Button from './Select_Button.js';
import Clear_Button from './Clear_Button.js'
import Dropdown from './Dropdown.js'
import Player from './Player.js';
import Images from './Images.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button_pressed: false,
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

  componentDidMount() {
    const name = localStorage.getItem('name');
    const pos = localStorage.getItem('pos');
    const age = localStorage.getItem('age');
    const team = localStorage.getItem('team');
    const fp = localStorage.getItem('fp');
    const g = localStorage.getItem('g');
    const gs = localStorage.getItem('gs');
    const p_yd = localStorage.getItem('p_yd');
    const p_td = localStorage.getItem('p_td');
    const p_att = localStorage.getItem('p_att');
    const ru_yd = localStorage.getItem('ru_yd');
    const ru_td = localStorage.getItem('ru_td');
    const ru_att = localStorage.getItem('ru_att');
    const rec = localStorage.getItem('rec');
    const tgt = localStorage.getItem('tgt');
    const re_yd = localStorage.getItem('re_yd');
    const re_td = localStorage.getItem('re_td');

    this.setState({
      button_pressed: localStorage.getItem('button_pressed'),
      player: {
        name: name,
        pos: pos,
        age: age,
        team: team,

        fp: fp,
        g: g,
        gs: gs,

        p_yd: p_yd,
        p_td: p_td,
        p_att: p_att,

        ru_yd: ru_yd,
        ru_td: ru_td,
        ru_att: ru_att,

        rec: rec,
        tgt: tgt,
        re_yd: re_yd,
        re_td: re_td,
      }
    });
  }

  update_graphs() {
    axios.put('http://localhost:5000/api/v1.0/graphs/update', {id: this.state.selected.value});
  }

  get_player_data() {
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

        localStorage.setItem('button_pressed', this.state.button_pressed);

        localStorage.setItem('name', this.state.player.name);
        localStorage.setItem('pos', this.state.player.pos);
        localStorage.setItem('age', this.state.player.age);
        localStorage.setItem('team', this.state.player.team);
        localStorage.setItem('fp', this.state.player.fp);
        localStorage.setItem('g', this.state.player.g);
        localStorage.setItem('gs', this.state.player.gs);
        localStorage.setItem('p_yd', this.state.player.p_yd);
        localStorage.setItem('p_td', this.state.player.p_td);
        localStorage.setItem('p_att', this.state.player.p_att);
        localStorage.setItem('ru_yd', this.state.player.ru_yd);
        localStorage.setItem('ru_td', this.state.player.ru_td);
        localStorage.setItem('ru_att', this.state.player.ru_att);
        localStorage.setItem('rec', this.state.player.rec);
        localStorage.setItem('tgt', this.state.player.tgt);
        localStorage.setItem('re_yd', this.state.player.re_yd);
        localStorage.setItem('re_td', this.state.player.re_td);
      })
      .catch(error => console.log(error));
  }

  handleSelect() {
    this.setState({button_pressed: true});
    this.update_graphs();
    this.get_player_data();
  }

  handleClear() {
    this.setState({button_pressed: false});
  }

  render() {
    return (
      <div>
        <div className = "page-header">
          <h1 class = "display-4">
              FFAnalysis
          </h1>
          <p class = "lead">
            This is a tool meant for the analysis of NFL players for fantasy football purposes. Simply select a player and press 'Select'!
          </p>
        </div>
        <hr/>
        <div className = "container-fluid">
          <div className = "row mb-2">
            <div className = "col">
              <Dropdown 
                action = {this.handler}
              />
            </div>
            <div className = "col">
              <div class = "btn-group" role = "group">
                <Select_Button 
                  onClick = {() => this.handleSelect()}
                />
                <Clear_Button 
                  onClick = {() => this.handleClear()}
                />
              </div>
            </div>
          </div>
          <hr/>
          <div className = "row mb-2">
            {this.state.button_pressed &&
              <Images 
                state = {this.state}
              />
            }
          </div>
          <div className = "row mb-2">
            {this.state.button_pressed &&
              <Player 
                state = {this.state}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;