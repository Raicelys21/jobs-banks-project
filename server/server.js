
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("uploads"));


mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
 }).then(() => console.log('Connected to the database!')
 ).catch(err => console.log(err));

 
 app.use('/api', require("./routes/routes"))

 app.listen(port, () => console.log(`server running at http://localhost:${port}`));
    