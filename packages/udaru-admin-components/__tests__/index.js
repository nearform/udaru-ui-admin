import * as lib from 'index'

it('should export an object', () => {
  expect(lib).toBeDefined()
  expect(Object.keys(lib).length).toBeGreaterThan(0)
})
