import React from 'react';
//import Graph_One from './media/compplayer.png';
//import Graph_Two from './media/playerptprog.png';
//import Graph_Three from './media/playerptprog.png';

class Images extends React.Component {
    render() {
        var graph_one = require('./media/compplayer.png');
        var graph_two = require('./media/playerptprog.png');
        var graph_three = require('./media/playerptprog.png');

        return (
            <div>
                <div className = 'container'>
                    <div className = 'row'>
                            <div className = 'col-md-4'>
                                <img class = 'img-fluid' src = {graph_one} alt = 'graph one'></img>
                            </div>
                            <div className = 'col-md-4'>
                                <img class = 'img-fluid' src = {graph_two} alt = 'graph two'></img>
                            </div>
                            <div className = 'col-md-4'>
                                <img class = 'img-fluid' src = {graph_three} alt = 'graph three'></img>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Images;