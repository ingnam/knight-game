import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'

import Step from 'components/Step'

class App extends Component {
  state = {
    startPosition: [0, 0],
    endPosition: [5, 5],
    knightPosition: [0, 0],
    // currentMove: [0, 0],
  }

  _handleClick = (knightPosition) => {
    this.setState({knightPosition})
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
            clickCallback={() => this._handleClick([i, j])}
          />
        )
      }
      board.push(<div className="board-row">{squareRows}</div>)
    }

    return (
      <div className="chessboard">
        {board}
        {/* <div className="black">&#9822;</div> */}
      </div>
    )
  }
}

App.propTypes = {
  name: PropTypes.string
}

export default App
