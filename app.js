// const express = require('express')
import express from 'express'
import db from './models/index'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import apiRoutes from './api/api.routes'
const dotenv = require("dotenv").config({ path: path.join(__dirname, './', '/.env') }).parsed

// creamos un servidor express
const app = express()

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// CORS
app.use(cors());

app.use('/api', apiRoutes)
app.get('/', (req, res) => {
  res.send('Welcome to my API!')
})
            // variable de entorno
const PORT = +process.env.PORT || +dotenv.PORT;

db.sequelize
  .sync()
  .then((data) => {
    console.log('Postgres connection has been established successfully: \x1b[32m%s\x1b[0m', 'online');
  })
  .catch((err) => {
    console.error('Unable to connect to the database Postgres:', err);
  });

// quedamos escuchando peticiones
const server  = app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Express server corriendo en el port ${PORT}: \x1b[32m%s\x1b[0m`, 'online');
  }
})