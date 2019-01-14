import { getNodes } from './lib'

describe('nodes', () => {
  test('returns an array of nodes if connection is valid', () => {
    const node1 = { foo: 'bar' }
    const node2 = { abc: 'xyz' }
    const conn = {
      edges: [{ node: node1 }, { node: node2 }],
    }

    expect(getNodes(conn)).toEqual([node1, node2])
  })
})
