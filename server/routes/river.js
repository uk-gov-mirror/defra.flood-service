const joi = require('@hapi/joi')
const boom = require('@hapi/boom')
const services = require('../services/index')

module.exports = {
  method: 'GET',
  path: '/river/{riverId}',
  handler: async (request, h) => {
    try {
      return services.getRiverById(request.params.riverId)
    } catch (err) {
      return boom.badRequest('Failed to get stations by river', err)
    }
  },
  options: {
    description: 'Get stations by river name',
    validate: {
      params: joi.object({
        riverId: joi.string().required()
      })
    }
  }
}
