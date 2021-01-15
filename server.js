const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// DataBase Connection
mongoose.connect('mongodb://localhost/blog')
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected')
});

// Create app => express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set Views
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/assets'));

// Get Articles
const Article = require('./models/article')

// Get The Home Page
app.get('/', (req, res)=>{
    Article.find({}, (error, articles)=> {
        if(error){
            console.log(error)
        }else{
            res.render('index',{
                title: 'Home',
                articles : articles
            })
        }

    })
})

// Get The Add Article Page
app.get('/add', (req, res)=> {
    res.render('add', {
        title: 'Add Article'
    })
})

// Add Articles
app.post('/add', (req, res)=> {
    const article = new Article();
    if(req.body.title != '' && req.body.author != '' && req.body.body != ''){
        article.title = req.body.title
        article.author = req.body.author
        article.body = req.body.body

        article.save(()=> {
            res.redirect('/')
        })
    }
})

// Delete Articles
app.delete('/:id', (req, res)=> {
    const query = {_id:req.params.id}

    Article.remove(query, ()=> {
        res.send('Success')
    })
})

// Listen To The Server
// app.listen(5000,  ()=> {
//     console.log('http://localhost:5000')
// })

app.listen(process.env.PORT || 3000)

