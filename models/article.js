const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
})

const Article = module.exports = mongoose.model('Article', articleSchema);