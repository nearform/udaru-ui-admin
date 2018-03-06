import Text from '../Text'

const Heading = Text.withComponent('h3')
Heading.displayName = 'Heading'

Heading.defaultProps = {
  regular: true,
  fontSize: 4,
  m: 0
}

Heading.h1 = Heading.withComponent('h1')
Heading.h1.defaultProps = {
  bold: true,
  fontSize: 6,
  my: '.5em'
}

Heading.h2 = Heading.withComponent('h2')
Heading.h2.defaultProps = {
  bold: true,
  fontSize: 5,
  my: '1em'
}

Heading.h3 = Heading.withComponent('h3')
Heading.h3.defaultProps = {
  regular: true,
  fontSize: 4,
  my: '1em'
}

Heading.h4 = Heading.withComponent('h4')
Heading.h4.defaultProps = {
  regular: true,
  fontSize: 3,
  my: '1em'
}

Heading.h5 = Heading.withComponent('h5')
Heading.h5.defaultProps = {
  bold: true,
  fontSize: 2,
  my: '1em'
}

Heading.h6 = Heading.withComponent('h6')
Heading.h6.defaultProps = {
  bold: true,
  caps: true,
  fontSize: 0,
  my: '1em'
}

export default Heading
