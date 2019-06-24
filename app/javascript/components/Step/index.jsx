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
        knightPosition,
      }
    } = this.props

    if (x_position == knightPosition[0] && y_position == knightPosition[1]){
      return <span>&#9822;</span>
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
      <div className={bgColor} onClick={clickCallback}>{`${x_position}, ${y_position}`}{this._renderKnight()}</div>
    )
  }
}

Step.propTypes = {
  name: PropTypes.string
}

export default Step
