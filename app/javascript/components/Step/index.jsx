import React, { Component } from 'react'
import PropTypes from 'prop-types'

const isEven = num => {
  return num % 2 === 0
}

class Step extends Component {
  _renderKnight = () => {
    const {
      x_position,
      y_position,
      position: {
        startPosition,
        endPosition,
        currentPosition,
      }
    } = this.props

    if (x_position == currentPosition[0] && y_position == currentPosition[1]){
      return <span>&#9822;</span>
    }

    if (x_position == endPosition[0] && y_position == endPosition[1]) {
      return <span>&#127937;</span>
    }

    return null
  }

  render() {
    const {
      x_position,
      y_position,
      position: {
        startPosition,
        endPosition,
      },
      clickCallback
    } = this.props
    const bgColor = (isEven(x_position) && isEven(y_position)) || (!isEven(x_position) && !isEven(y_position)) ? 'white' : 'black'

    return (
      <div className={bgColor} onClick={clickCallback}>
        {this._renderKnight()}
      </div>
    )
  }
}

Step.propTypes = {}

export default Step
