const express = require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port=80;

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//serving the static file
app.use(express.urlencoded({ extended: true}));
//PUG SPECIFIC STUFF
app.set('view engine','pug');//set the template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//END POINTS
 app.get('/',(req,res)=>{

     res.status(200).render('index.pug');
 });
 app.post('/',(req,res)=>{
    // console.log(req.body);
    name=req.body.name
    age=req.body.age
    gender=req.body.gender
    address=req.body.address
    more=req.body.more
    let outputtowrite=`the name of the  client is ${name}, ${age} year old,${gender},residing at ${address},more about him:/her ${more}`
    fs.appendFileSync('output.txt','\n'+outputtowrite.toString(),(err)=>{
        if(err)
        console.log(err);
    });
    const params={'message': 'Your form has been submitted successfully'};
     res.status(200).render('index.pug',params);
 })
//START THE SERVER
app.listen(port,() =>{
    console.log('the app is listening at port 80');
})
