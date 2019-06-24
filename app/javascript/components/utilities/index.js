const validMoves = (position) => {
  const moveSets = [
    [-1, -2],
    [-2, -1],
    [-2, +1],
    [-1, +2],
    [+1, -2],
    [+2, -1],
    [+2, +1],
    [+1, +2]
  ]

  return moveSets.map(moveSet => {
    const xPosition = position[0] + moveSet[0]
    const yPosition = position[1] + moveSet[1]

    if ((xPosition >= 0 && xPosition <= 7) && (yPosition >= 0 && yPosition <= 7)){
      return [xPosition, yPosition]
    }
  }).filter(move => move)
}

export function moveValid(currentPosition, nextMove) {
  const possibleMoves = JSON.stringify(validMoves(currentPosition))
  const move = JSON.stringify(nextMove)

  return (possibleMoves.indexOf(move) != -1)
}

export function setRandomPosition(params) {
  return [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
}
