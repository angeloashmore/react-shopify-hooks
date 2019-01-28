import { flushEffects } from 'react-testing-library'

// Helper function to bypass query loading states.
export const flushEffectsAndWait = (ms = 20) =>
  new Promise(resolve => {
    flushEffects()
    return setTimeout(resolve, ms)
  })
