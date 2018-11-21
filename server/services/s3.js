const AWS = require('aws-sdk')
const agent = require('proxy-agent')
const config = require('../config').s3
const proxy = config.httpProxy

AWS.config.credentials = {
  accessKeyId: config.accessKey,
  secretAccessKey: config.secretAccessKey
}

AWS.config.httpOptions = {
  agent: proxy ? agent(proxy) : AWS.config.httpOptions.agent,
  timeout: config.httpTimeoutMs
}

// S3 default is set to undefined, so setting to 3 as per rest of aws service default
AWS.config.maxRetries = 3

function forecast () {
  const s3 = new AWS.S3()
  const params = {
    Key: config.key,
    Bucket: config.bucket
  }

  return s3.getObject(params)
    .promise()
    .then(data => JSON.parse(data.Body))
}

function ffoi (id) {
  const s3 = new AWS.S3()
  const params = { Bucket: config.bucket, Key: 'ffoi/' + id + '.json' }

  return s3.getObject(params)
    .promise()
    .then(data => JSON.parse(data.Body))
}

module.exports = { forecast, ffoi }