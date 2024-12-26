const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routing/userRouter');

// create server start 
const server = express();
server.use(express.json());
server.use(cors(
    {
        origin: ["http://localhost:5173"]
    }
))

server.use('/user', userRouter);

// create server end


// connect server with mongodb start

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName: "wsjp57"
    }
).then(
    () => {
        // Server run start at port 5000 start
        server.listen(
            5000,
            () => {
                console.log("Server is started at Port 5000");
            }
        )
        // Server run start at port 5000 end
    }
).catch(
    () => {
        console.log("not Connected");
    }
)

// connect server with mongodb end



