const RED_HEX = "#FF0000"
const RED_RGB = webglUtils.hexToRgb(RED_HEX)
const BLUE_HEX = "#0000FF"
const BLUE_RGB = webglUtils.hexToRgb(BLUE_HEX)
const GREEN_HEX = "#00FF00"
const GREEN_RGB = webglUtils.hexToRgb(GREEN_HEX)
const RECTANGLE = "RECTANGLE"
const TRIANGLE = "TRIANGLE"
const LETTER_F = "LETTER_F"
const CUBE = "CUBE"
const TYPE_F = "TYPE_F"
const PYRAMID = "PYRAMIND"
const origin = {x: 0, y: 0, z: 0}
const sizeOne = {width: 1, height: 1, depth: 1}

let camera = {
  translation: {x: -3, y: -20, z: 90},
  rotation: {x: 15, y: 180, z: 0}
}

let lightSource = [0, -0.2, 0.6]

let shapes = [
  {
    type: CUBE,
    position: origin,
    dimensions: sizeOne,
    color: BLUE_RGB,
    translation: {x:  0, y: 10, z: -70},
    scale:       {x:   0.2, y:   0.2, z:   0.2},
    rotation:    {x:   0, y:  0, z:   0},
  },
  {
    type: CUBE,
    position: origin,
    dimensions: sizeOne,
    color: RED_RGB,
    translation: {x: 50, y: 0, z: 80},
    scale:       {x:   0.2, y:   0.2, z:   0.2},
    rotation:    {x:   0, y:  0, z:   0},
  },
  // {
  //   type: CUBE,
  //   position: origin,
  //   dimensions: sizeOne,
  //   color: RED_RGB,
  //   translation:  {x: -20, y: 0, z: 0},
  //   scale:       {x:   0.5, y:   0.5, z:   0.5},
  //   rotation:     {x: 0, y: 0, z: 0}
  // },
]