import React from 'react';
import Select from 'react-select';

var ff_json = require('./media/2019.json');
var data = [];

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

export default Dropdown;