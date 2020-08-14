import React from 'react';
import Graph_One from './media/compplayer.png';
import Graph_Two from './media/playerptprog.png';
import Graph_Three from './media/playerptprog.png';

class Images extends React.Component {
    render() {
        return (
            <div>
                <div className = 'container'>
                    <div className = 'row'>
                            <div className = 'col-md-4'>
                                <img class = 'img-fluid' src = {Graph_One} alt = 'graph one'></img>
                            </div>
                            <div className = 'col-md-4'>
                                <img class = 'img-fluid' src = {Graph_Two} alt = 'graph two'></img>
                            </div>
                            <div className = 'col-md-4'>
                                <img class = 'img-fluid' src = {Graph_Three} alt = 'graph three'></img>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Images;