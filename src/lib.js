import { useState, useEffect } from 'react'

export const usePromise = promise => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.resolve(promise)
      .then(setResult)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  return { result, error, isLoading }
}
