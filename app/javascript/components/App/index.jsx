import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { moveValid, setRandomPosition } from '../utilities'
import './style.css'

import Step from 'components/Step'

const helpInitialState = {
  shortestPath: [],
  helpLoaded: false,
  helpIndex: 1,
}

class App extends Component {
  state = {
    currentPosition: [0, 0],
    endPosition: [7, 7],
    shortestPath: [],
    helpLoaded: false,
    helpIndex: 1
  }

  _resetHelp = () =>
    this.setState({
      shortestPath: [],
      helpLoaded: false,
      helpIndex: 1,
    })

  _checkGameStatus = () => {
    const { currentPosition, endPosition } = this.state

    if ((currentPosition[0] == endPosition[0]) && (currentPosition[1] == endPosition[1])){
      alert("Congratulation. You Win!!!")
      this._handleStart()
    }
  }

  _handleMove = (move) => {
    if (moveValid(this.state.currentPosition, move)){
      this.setState({ currentPosition: move }, () => {
        this._checkGameStatus()
      })
    } else {
      alert("Invalid move")
    }
  }

  _handleStart = () =>
    this.setState({
      currentPosition: setRandomPosition(),
      endPosition: setRandomPosition(),
      ...helpInitialState,
    })

  _moveAutomatically = () => {
    const { shortestPath, helpIndex } = this.state

    this.setState(
      {
        currentPosition: shortestPath[helpIndex]
      },
      () =>
        this.setState({
          helpIndex: helpIndex + 1
        }, () => this._checkGameStatus())
    )
  }

  _handleHelpClick = () => {
    const { currentPosition, endPosition, helpLoaded, shortestPath, helpIndex } = this.state

    if (!helpLoaded){
      axios.get('/help', {
        params: {
          start_position: currentPosition,
          end_position: endPosition,
        }
      })
      .then(response => {
        this.setState({
          helpLoaded: true,
          shortestPath: response.data.path
        })
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this._moveAutomatically()
      })
    } else {
      this._moveAutomatically()
    }
  }

  _renderStep = (position, bgColor) => {
    return (
      <div className={bgColor}>{`${position[0]}, ${position[1]}`}</div>
    )
  }

  render(){
    const board = []

    for (let i = 0; i < 8; i++) {
      const squareRows = []

      for (let j = 0; j < 8; j++) {
        squareRows.push(
          <Step
            x_position={i}
            y_position={j}
            position={this.state}
            clickCallback={() => this._handleMove([i, j])}
          />
        )
      }
      board.push(<div className="board-row">{squareRows}</div>)
    }

    return (
      <div className="chessboard">
        {board}
        <button onClick={this._handleStart}>Start</button>
        <button onClick={this._handleHelpClick}>Help</button>
      </div>
    )
  }
}

App.propTypes = {
  name: PropTypes.string
}

export default App
