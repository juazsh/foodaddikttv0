import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const stage = process.env.STAGE || 'local'

let envConfig

if(stage == 'production')
  envConfig = require('./prod').default
else if(stage === 'testing')
  envConfig = require('./testing').default
else
  envConfig = require('./local').default

export default merge({
  stage,
  env: process.env.NODE_ENV,
  port: 8989,
  emailSettings: {
    emailHost: process.env.EMAIL_HOST,
    emailPort: Number(process.env.EMAIL_PORT),
    emailAddress: process.env.EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD
  },
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbURL: process.env.DATABASE_URL,
    smsAPIKey: process.env.SMS_API_KEY,
    smsAPIToken: process.env.SMP_API_TOKEN,
    smsAPIUrl: process.env.SMP_API_URL,
  }
}, envConfig)