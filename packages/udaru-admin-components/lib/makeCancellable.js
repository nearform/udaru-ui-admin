// https://github.com/facebook/react/issues/5465#issuecomment-157888325
export const makeCancellable = promise => {
  let hasCanceled_ = false

  return {
    promise: new Promise((resolve, reject) => {
      promise.then(
        val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
        error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
      )
    }),
    cancel() {
      hasCanceled_ = true
    }
  }
}
