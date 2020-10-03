import React from 'react';

function Headlines(props) {
  return (
    <table class="table">
        <thead>
            <tr>
                <th scope = "col">#</th>
                <th scope = "col">Headline</th>
                <th scope = "col">Link</th>
            </tr>
        </thead>
            <tbody>
                <tr>
                    <th scope = "row">1</th>
                    <td>{props.state.player.h_one}</td>
                    <td>{props.state.player.l_one}</td>
                </tr>
                <tr>
                    <th scope = "row">2</th>
                    <td>{props.state.player.h_two}</td>
                    <td>{props.state.player.l_two}</td>
                </tr>
                <tr>
                    <th scope = "row">3</th>
                    <td>{props.state.player.h_three}</td>
                    <td>{props.state.player.l_three}</td>
                </tr>
                <tr>
                    <th scope = "row">4</th>
                    <td>{props.state.player.h_four}</td>
                    <td>{props.state.player.l_four}</td>
                </tr>
                <tr>
                    <th scope = "row">5</th>
                    <td>{props.state.player.h_five}</td>
                    <td>{props.state.player.l_five}</td>
                </tr>
            </tbody>
    </table>
  );
}

export default Headlines;