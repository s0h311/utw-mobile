const SQRT_OF_3 = 1.73205080757

export function getHexagonCoordinates({
  rightLatitude,
  midLongitute,
  longDiagonal,
}: {
  rightLatitude: number
  midLongitute: number
  longDiagonal: number
}): { latitude: number; longitude: number }[] {
  const sideLength = longDiagonal / 2
  const shortDiagonal = SQRT_OF_3 * sideLength

  const leftLatitude = rightLatitude - longDiagonal
  const topLongitude = midLongitute + shortDiagonal
  const bottomLongitute = midLongitute - shortDiagonal

  const bottomRightCorner = {
    latitude: rightLatitude - sideLength / 2,
    longitude: bottomLongitute,
  }
  const bottomLeftCorner = {
    latitude: leftLatitude + sideLength / 2,
    longitude: bottomLongitute,
  }
  const leftCorner = {
    latitude: leftLatitude,
    longitude: midLongitute,
  }
  const topLeftCorner = {
    latitude: leftLatitude + sideLength / 2,
    longitude: topLongitude,
  }
  const topRightCorner = {
    latitude: rightLatitude - sideLength / 2,
    longitude: topLongitude,
  }

  return [
    { latitude: rightLatitude, longitude: midLongitute },
    bottomRightCorner,
    bottomLeftCorner,
    leftCorner,
    topLeftCorner,
    topRightCorner,
  ]
}
