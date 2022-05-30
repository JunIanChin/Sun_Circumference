const express = require('express')
const app = express()
const nextPiRoute = require('./routes/nextPiRoute')
const resetPiRoute = require('./routes/resetPiRoute')

app.use('/getPiPrecision', nextPiRoute)
app.use('/resetPiPrecision', resetPiRoute)
app.listen(4000)
