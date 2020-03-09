/* eslint-env jest */

const { formatPayload } = require('../../minions/transformResponse')({})

describe('formatPayload', () => {
  test('should format payload to have 3 properties', () => {
    const response = formatPayload({
      status: 400
    })

    expect(response).toEqual(expect.objectContaining({
      status: 400,
      data: {},
      errors: []
    }))
  })
})
