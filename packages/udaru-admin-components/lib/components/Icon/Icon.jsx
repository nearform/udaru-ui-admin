import React from 'react'
import PropTypes from 'prop-types'
import Icons from './icons'

const Icon = ({color, size, path, name}) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
    },
  }

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 1024 1024"
    >
      <path
        style={styles.path}
        d={Icons[name]}
      ></path>
    </svg>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
}

Icon.defaultProps = {
  size: 16,
  color: "black"
}

export default Icon