const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/post')
const dotenv=require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
//db
console.log('Attempt to connecto to db ', process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true}
    )
    .then(() => {console.log('DB connected')})

mongoose.connection.on('error', err => {
    console.log(`DB connection error ${err.message}`)
});

//now router work as middleware. Call it via app.use
app.use(bodyParser.json())
app.use("/", postRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server listening on port 8080')
})