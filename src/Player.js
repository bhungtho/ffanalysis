import React from 'react';

function Player(props) {
  return (
    <div className = 'container'>
      <div className = 'row'>
        <p className = 'font-weight-bold'>Clerical Info</p>
      </div>
      <div className = 'row mb-2'>
        <div className = 'col'>
          <p>Name: {props.state.player.name}</p>
        </div>
        <div className = 'col'>
          <p>Position: {props.state.player.pos}</p>
        </div>
        <div className = 'col'>
          <p>Age: {props.state.player.age}</p>
          </div>
        <div className = 'col'>
          <p>Team: {props.state.player.team}</p>
        </div>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Game Stats (2019)</p>
      </div>
      <div className = 'row mb-2'>
        <div className = 'col'>
          <p>Fantasy Points: {props.state.player.fp}</p>
        </div>
        <div className = 'col'>
          <p>Games: {props.state.player.g}</p>
        </div>
        <div className = 'col'>
          <p>Games Started: {props.state.player.gs}</p>
        </div>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Passing Info (2019)</p>
      </div>
      <div className = 'row mb-2'>
        <div className = 'col'>
          <p>Passing Atts: {props.state.player.p_att}</p>
        </div>
        <div className = 'col'>
          <p>Passing Yds: {props.state.player.p_yd}</p>
        </div>
        <div className = 'col'>
          <p>Passing TDs: {props.state.player.p_td}</p>
        </div>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Rushing Info (2019)</p>
      </div>
      <div className = 'row mb-2'>
        <div className = 'col'>
          <p>Rushing Att: {props.state.player.ru_att}</p>
        </div>
        <div className = 'col'>
          <p>Rushing Yds: {props.state.player.ru_yd}</p>
        </div>
        <div className = 'col'>
          <p>Rushing TDs: {props.state.player.ru_td}</p>
        </div>
      </div>

      <div className = 'row'>
        <p className = 'font-weight-bold'>Receiving Info (2019)</p>
      </div>
      <div className = 'row mb-2'>
        <div className = 'col'>
          <p>Receptions: {props.state.player.rec}</p>
        </div>
        <div className = 'col'>
          <p>Targets: {props.state.player.tgt}</p>
        </div>
        <div className = 'col'>
          <p>Receiving Yds: {props.state.player.re_yd}</p>
        </div>
        <div className = 'col'>
          <p>Receiving TDs: {props.state.player.re_td}</p>
        </div>
      </div>
    </div>
  );
}

export default Player;