import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: 1,
    board: [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ],
    state: 'new',
    mines: 10,
  }

  render() {
    return (
      <div>
        <h1>
          Minesweeper!
          <button>New Game</button>
        </h1>
        <ul>
          {this.state.board.map(function (row) {
            return row.map(function (cell, columnIndex) {
              return <li key={columnIndex}>{cell}</li>
            })
          })}
        </ul>
      </div>
    )
  }
}
