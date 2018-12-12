const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to write to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my site!'
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Bad request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});