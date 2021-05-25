import React, { Component } from 'react'

export class App extends Component {
  state = {
    data: [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ],
  }

  render() {
    return (
      <div>
        <h1>Minesweeper!</h1>
        <ul>
          {this.state.data.map(function (row) {
            return row.map(function (cell, columnIndex) {
              return <li key={columnIndex}>{cell}</li>
            })
          })}
        </ul>
      </div>
    )
  }
}
