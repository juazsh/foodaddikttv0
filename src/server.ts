import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { logIncomingRequest } from './modules/middleware'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({limit: '500mb', strict: false}))
app.use(express.urlencoded({extended: true}))
app.use(logIncomingRequest)

app.get('/', (req, res) => res.json({message: 'FoodAddicts API.', version: 'v0'}))


export default app