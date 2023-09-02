const mongoose = require('mongoose');

module.exports =  mongoose.connect('mongodb+srv://HoussemNinja:houssemess123@cluster0.d60sb.mongodb.net/?retryWrites=true&w=majority'
, {useNewUrlParser: true, useUnifiedTopology: true}

).then(() => console.log('Connected to MongoDB...'));

