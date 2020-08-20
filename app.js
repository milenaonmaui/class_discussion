const express = require('express');
const app = express();
const postRoutes = require('./routes/post')

//now router work as middleware. Call it via app.use

app.use("/", postRoutes)
const port = 8080;
app.listen(port, () => {
    console.log('Server listening on port 8080')
})