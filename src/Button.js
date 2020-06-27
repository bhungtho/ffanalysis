import React from 'react';

function Button(props) {
  return (
    <button type = "button" className = "btn btn-light" onClick = {props.onClick}>
      Select
    </button>
  );
}

export default Button;