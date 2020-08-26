const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const dotenv=require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const fs = require('fs')

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

//Middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use("/", postRoutes)
app.use("/", authRoutes)
app.use("/", userRoutes)
app.get('/', (req,res) => {
    fs.readFile('docs/apiDocumentation.json', (err, data) => {
        if(err) {
            res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
})
//handle unauthorized error
app.use(function(err, req, res, next){
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({error: "Unauthorized request"})
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server listening on port 8080')
})