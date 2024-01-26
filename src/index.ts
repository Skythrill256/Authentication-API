import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './router'
dotenv.config()

const app = express()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors ({
  credentials: true,
}))

app.use(compression())

app.use(cookieParser())

app.use (bodyParser.json())

const server = http.createServer(app)

server.listen(PORT, ()=>{
  console.log(`listening on port https://localhost:${PORT}`)
})

mongoose.Promise = Promise

mongoose.connect(MONGODB_URL)

mongoose.connection.on('error',(error: Error)=> console.log('Error'))

app.use('/', router())
