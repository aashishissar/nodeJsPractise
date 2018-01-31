const express = require('express');
const hbs =require('hbs');
const fs =require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


//adding some changes by nikhil..

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
    var now = new Date().toString();
    var log =`${now}:${req.method}:${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n',()=>{
        if(err)
        {
            console.log('erro');
        }
    });
    next();
});



hbs.registerHelper('getCurrentYear',() =>{
   return  new Date().getFullYear() ;
});

hbs.registerHelper('screamIt',(textToStream) =>{
    return  textToStream.toUpperCase();
 });

app.get('/',(req,res)=>{
    // res.send(    
    //     {
    //         name :'aashish',
    //         likes :[
    //             'biking',
    //             'cities'
    //         ]

    //     }
    // );
    res.render('home.hbs',{
        pageTitle :'Home pagedsafds',
        currentyear : new Date().getFullYear(),
        welcomeMessage :'Welcome to home page'
    });

    //res.send('<h1>hello express</h1>');
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
      pageTitle :'about page',
      currentyear : new Date().getFullYear()
  });
});

// bad 

app.get('/bad',(req,res)=>{
    res.send(
        {
            errorMessage :'error'
                }
    );
});




app.listen(3000,()=>{
    console.log('server is up on port 3000');
});