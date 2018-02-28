import { makeCancellable } from 'makeCancellable'

it('returns a valid object', () => {
  const cancellablePromise = makeCancellable(
    new Promise(resolve => resolve(true))
  )

  expect(cancellablePromise).toBeDefined()
  expect(cancellablePromise.promise).toBeDefined()
  expect(cancellablePromise.cancel).toBeDefined()
})

it('resolves a normal promise value', () => {
  const response = 'valid response'
  const cancellablePromise = makeCancellable(
    new Promise(resolve => resolve(response))
  )

  return expect(cancellablePromise.promise).resolves.toBe(response)
})

it('resolves a normal promise value', () => {
  const error = 'oops there was an error'
  const cancellablePromise = makeCancellable(
    new Promise((resolve, reject) => reject(error))
  )

  return expect(cancellablePromise.promise).rejects.toBe(error)
})

it('cancels running promise with resolve', () => {
  const cancellablePromise = makeCancellable(
    new Promise((resolve, reject) => resolve('valid response'))
  )
  cancellablePromise.cancel()

  return expect(cancellablePromise.promise).rejects.toEqual({
    isCanceled: true
  })
})

it('cancels running promise with reject', () => {
  const cancellablePromise = makeCancellable(
    new Promise((resolve, reject) => reject('oops'))
  )
  cancellablePromise.cancel()

  return expect(cancellablePromise.promise).rejects.toEqual({
    isCanceled: true
  })
})
