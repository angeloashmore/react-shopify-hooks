// Returns an array of object keys deeply. Child keys are separated by `.`.
export const keysDeep = obj =>
  Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => keysDeep(obj[key]).map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj))
