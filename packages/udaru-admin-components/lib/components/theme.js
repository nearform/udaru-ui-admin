// Adapted from default theme on https://github.com/jxnblk/styled-system

// breakpoint values
// any array length works with styled-system
const breakpoints = ['500px', '800px', '1200px']

const colors = {
  primary: '#337ab7',
  primaryActive: '#02A171',
  danger: '#d9534f',
  lightGrey: '#D8D8D8',
  lightGrey2: '#888',
  lightGrey3: '#eee',
  darkGrey: '#555',
  black: '#333',
  green: '#5cb85c',
  lightBlue: '#5bc0de',
  orange: '#f0ad4e'
}

export { colors }

export const radius = '4px'

export const maxContainerWidth = '1280px'

// boxShadows
export const boxShadows = [
  `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`
]

export const speeds = {
  slow: '1s',
  medium: '.4s',
  fast: '.2s'
}

export const easings = {
  easeOut: 'cubic-bezier(0,.6,.3,1)',
  expoEaseOut: 'cubic-bezier(0,1,.3,1)',
  bounce: 'cubic-bezier(0,1.2,.5,1.4)'
}

// space is used for margin and padding scales
// it's recommended to use powers of two to ensure alignment
// when used in nested elements
// numbers are converted to px
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

// typographic scale
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128]

// for any scale, either array or objects will work
const lineHeights = [1, 1.125, 1.25, 1.5]

const fontWeights = {
  normal: 500,
  bold: 700
}

const letterSpacings = {
  normal: 'normal',
  caps: '0.25em'
}

// border-radius
const radii = [0, 2, 4, 8]

const borders = [0, '1px solid', '2px solid']

const shadows = [`0 1px 2px 0 ${colors.text}`, `0 1px 4px 0 ${colors.text}`]

const theme = {
  breakpoints,
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
  radius,
  borders,
  shadows,
  boxShadows,
  speeds,
  easings
}

export default theme
