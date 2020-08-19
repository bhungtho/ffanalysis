import React from 'react';

function Select_Button(props) {
  return (
    <button type = "button" className = "btn btn-light" onClick = {props.onClick}>
      Select
    </button>
  );
}

export default Select_Button;