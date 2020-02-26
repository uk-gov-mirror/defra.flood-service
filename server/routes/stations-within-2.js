const joi = require('@hapi/joi')
const boom = require('@hapi/boom')
const floodsService = require('../services/index')

module.exports = {
  method: 'GET',
  path: '/stations-within-2/{x1}/{y1}/{x2}/{y2}',
  handler: async (request, h) => {
    try {
      const { x1, y1, x2, y2 } = request.params
      const result = await floodsService.getStationsWithin2([x1, y1, x2, y2])
      return result
    } catch (err) {
      return boom.badRequest('Failed to get stations search', err)
    }
  },
  options: {
    description: 'Get stations with bbox',
    validate: {
      params: joi.object({
        x1: joi.number().required(),
        y1: joi.number().required(),
        x2: joi.number().required(),
        y2: joi.number().required()
      })
    }
  }
}