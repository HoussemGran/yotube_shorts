const mongoose = require('mongoose');
require('dotenv').config();


module.exports =  mongoose.connect('mongodb+srv://HoussemNinja:'+process.env.mongoDbPassword+'@cluster0.d60sb.mongodb.net/?retryWrites=true&w=majority'
, {useNewUrlParser: true, useUnifiedTopology: true}

).then(() => console.log('Connected to MongoDB...'));

