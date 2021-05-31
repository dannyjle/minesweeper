import React, { Component } from 'react'

export class App extends React.Component {
  state = {
    id: null,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    // difficulty: 0,
  }

  handleClickCell = async (rowIndex, colIndex) => {
    const body = { row: rowIndex, col: colIndex }

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()

    this.setState(game)
    this.checkGameState()

    console.log('Clicked')
  }
  handleNewGame = async () => {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    const game = await response.json()

    this.setState(game)
    let status = document.querySelector('.game')
    status.textContent = `FIREFIGHTER!`
    this.checkGameState()

    console.log('New game')
  }
  handleFlag = async (rowIndex, colIndex) => {
    const body = { row: rowIndex, col: colIndex }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
    this.checkGameState()

    console.log('Flag')
  }
  namingCell = cell => {
    switch (cell) {
      case 'F':
        return 'waterCell'
      case '*':
        return 'fireCell'
      case '_':
        return 'blankCell'
      default:
        return 'numberCell'
    }
  }

  changeCellIcon = cell => {
    switch (cell) {
      case 'F':
        return <i>💦</i>
      case '*':
        return <i>🔥</i>
      case '_':
        return ' '
      default:
        return cell
    }
  }

  checkGameState() {
    let status = document.querySelector('.game')
    if (this.state.state === 'won') {
      status.textContent = `THE FIRE WAS NO MATCH FOR YOU!`
    }
    if (this.state.state === 'lost') {
      status.textContent = `YOU DIDN'T PUT OUT THE FIRE :(`
    }
  }

  componentDidMount() {
    this.handleNewGame()
  }

  render() {
    return (
      <div>
        <h1>
          <div className="game">FIREFIGHTER!</div>
          <p>
            <button onClick={this.handleNewGame}>New Game</button>
          </p>
        </h1>
        <ul>
          {this.state.board.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
              return (
                <li
                  key={colIndex}
                  onClick={() => this.handleClickCell(rowIndex, colIndex)}
                  onContextMenu={() => this.handleFlag(rowIndex, colIndex)}
                  onContextMenuCapture={event => event.preventDefault()}
                  className={this.namingCell(cell)}
                >
                  {this.changeCellIcon(cell)}
                </li>
              )
            })
          })}
        </ul>
      </div>
    )
  }
}
