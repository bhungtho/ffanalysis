import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Select_Button from './Select_Button.js';
import Clear_Button from './Clear_Button.js'
import Dropdown from './Dropdown.js'
import Player from './Player.js';
import Images from './Images.js';
import Headlines from './Headlines.js'

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
        
        h_one: null,
        l_one: null,
        h_two: null,
        l_two: null,
        h_three: null,
        l_three: null,
        h_four: null,
        l_four: null,
        h_five: null,
        l_five: null,
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

    const h_one = localStorage.getItem('h_one');
    const h_two = localStorage.getItem('h_two');
    const h_three = localStorage.getItem('h_three');
    const h_four = localStorage.getItem('h_four');
    const h_five = localStorage.getItem('h_five');

    const l_one = localStorage.getItem('l_one');
    const l_two = localStorage.getItem('l_two');
    const l_three = localStorage.getItem('l_three');
    const l_four = localStorage.getItem('l_four');
    const l_five = localStorage.getItem('l_five');

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

        h_one: h_one,
        h_two: h_two,
        h_three: h_three,
        h_four: h_four,
        h_five: h_five,

        l_one: l_one,
        l_two: l_two,
        l_three: l_three,
        l_four: l_four,
        l_five: l_five,

      }
    });
  }

  update_graphs() {
    axios.put('http://localhost:5000/api/v1.0/graphs/update', {id: this.state.selected.value});
  }

  get_headlines() {
    axios.get('http://localhost:5000/api/v1.0/headlines/' + this.state.selected.value).then((response) => {     
      const n_h_one = response.data.h_one;
      const n_h_two = response.data.h_two; 
      const n_h_three = response.data.h_three;
      const n_h_four = response.data.h_four; 
      const n_h_five = response.data.h_five;

      const n_l_one = response.data.l_one;
      const n_l_two = response.data.l_two; 
      const n_l_three = response.data.l_three;
      const n_l_four = response.data.l_four; 
      const n_l_five = response.data.l_five;
      
      this.setState({
        player: {
          h_one: n_h_one,
          h_two: n_h_two,
          h_three: n_h_three,
          h_four: n_h_four,
          h_five: n_h_five,

          l_one: n_l_one,
          l_two: n_l_two,
          l_three: n_l_three,
          l_four: n_l_four,
          l_five: n_l_five,
        }
      });
    }).catch(error => console.log(error));

    localStorage.setItem('h_one', this.state.player.h_one);
    localStorage.setItem('h_two', this.state.player.h_two);
    localStorage.setItem('h_three', this.state.player.h_three);
    localStorage.setItem('h_four', this.state.player.h_four);
    localStorage.setItem('h_five', this.state.player.h_five);

    localStorage.setItem('l_one', this.state.player.l_one);
    localStorage.setItem('l_two', this.state.player.l_two);
    localStorage.setItem('l_three', this.state.player.l_three);
    localStorage.setItem('l_four', this.state.player.l_four);
    localStorage.setItem('l_five', this.state.player.l_five);
  }

  get_player_data() {
    axios.get('http://localhost:5000/api/v1.0/data/' + this.state.selected.value).then((response) => {
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

    }).catch(error => console.log(error));
  }

  handleSelect() {
    this.setState({button_pressed: true});
    this.update_graphs();
    this.get_player_data();
    //this.get_headlines();
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
          {/*
            <div className = "row mb-2">
              {this.state.button_pressed &&
                <Headlines 
                  state = {this.state}
                />
              }
            </div>
          */}
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