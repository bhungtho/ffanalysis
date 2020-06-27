import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from './Button.js';
import Dropdown from './Dropdown.js'
import Player from './Player.js';

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

export default App;
