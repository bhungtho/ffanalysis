import React from 'react';

function Clear_Button(props) {
  return (
    <button type = "button" className = "btn btn-light" onClick = {props.onClick}>
      Clear
    </button>
  );
}

export default Clear_Button;