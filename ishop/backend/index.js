const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');
const CategoryRouter = require('./routers/CategoryRouter');


server.use(express.json());
server.use(cors(
    {
        origin: ['http://localhost:5173']
    }
))
server.use('/category', CategoryRouter);
server.use(express.static('Public'))

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName: "ishop"
    }
).then(
    () => {
        server.listen(
            5000,
            () => {
                console.log("Server start at port 5000");
            }
        )
    }
).catch(
    (error) => {
        console.log("Database not connected");
        console.log(error);
    }
)


