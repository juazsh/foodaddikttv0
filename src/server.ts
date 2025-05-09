import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { logIncomingRequest } from './modules/middleware'
import { handleUserAccessRequest, handleVerifyAccessRequest } from './handlers/access'
import { guard } from './modules/auth'
import router from './router'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({limit: '500mb', strict: false}))
app.use(express.urlencoded({extended: true}))
app.use(logIncomingRequest)

app.get('/', (req, res) => res.json({message: 'FoodAddicts API.', version: 'v0'}))

app.use('/api', guard, router)
app.post('/requestaccess', handleUserAccessRequest)
app.post('/verifyaccess', handleVerifyAccessRequest)

export default app