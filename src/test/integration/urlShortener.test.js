/* eslint-env jest */

const superagent = require('superagent')
const { baseUrl } = require('../../cfg')
const _ = require('lodash')
const faker = require('faker')
const fakedUrl = faker.internet.url()
let shortened = ''

describe('/shorten', () => {
  describe('/', () => {
    test('should create a shortened url', async () => {
      const response = await superagent.post(`${baseUrl}/shorten`).send({ url: fakedUrl })

      const fetchedProperties = _.keys(response.body)
      const expectedProperties = [
        'status',
        'data',
        'errors'
      ]

      expect(_.difference(expectedProperties, fetchedProperties).length).toEqual(0)

      const shortenedUrl = response.body.data.shortened

      shortened = _.last(_.split(shortenedUrl, '/'))

      expect(shortened).not.toBe('')
    })
  })

  describe('/:shortId', () => {
    test('should return empty shortened url', async () => {
      const response = await superagent.get(`${baseUrl}/shorten/${faker.random.word()}`)

      const fetchedProperties = _.keys(response.body)
      const expectedProperties = [
        'status',
        'data',
        'errors'
      ]

      expect(_.difference(expectedProperties, fetchedProperties).length).toEqual(0)

      const { originalUrl } = response.body.data
      expect(originalUrl).toBe('')
    })

    test('should return original url from a shortened url', async () => {
      const response = await superagent.get(`${baseUrl}/shorten/${shortened}`)

      const fetchedProperties = _.keys(response.body)
      const expectedProperties = [
        'status',
        'data',
        'errors'
      ]

      expect(_.difference(expectedProperties, fetchedProperties).length).toEqual(0)

      const { originalUrl } = response.body.data

      expect(originalUrl).toEqual(fakedUrl)
    })
  })
})
