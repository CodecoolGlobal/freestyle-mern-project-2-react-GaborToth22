const express = require('express') ;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
app.use(express.json());
app.use(cors());
let Login = require('./model/login.js')
mongoose.connect('mongodb+srv://Gabor22:eLW9EkRK3s1nHPwb@cluster0.jcq3ouo.mongodb.net/Fitness?retryWrites=true&w=majority')
    .then(console.log("successfull connected"))
    .catch(err => {console.log(err)})




app.post("/api/test", (req,res) => {
    console.log(req.body);
})

app.post("/api/signin", (req,res)=>{
    Login.create({
        username: req.body.useName,
        password: req.body.pass,
        createdAt: Date.now()
    })
    .then(login => res.json(login))
    .catch(err => {console.log(err)})
})

app.get("/api/signin/", async (req,res)=>{
    try{
        let allUserData = await Login.find();
        let usernames = allUserData.map(user => user.username)
        res.json(usernames)
    }catch(err){
        console.log(err)
    }
})
    
app.get("/api/login/:name", async (req,res)=>{  
    try{
        let user = await Login.findOne({ username: req.params.name });
        if(user === null){
            res.status(406).json("Nincs ilyen falhasználó")
        }else{
            res.json(user.password)
        }
        
    }catch(err){
        console.log(err)
    }
})

app.get('/api/logedInUser/:username', async(req,res)=>{
    try{
        //console.log(req.params.username)
        const user = await Login.find({username: req.params.username})
        //console.log(user)
        res.status(200).json(user)
    }catch(err){
        console.log(err)
    }
})

app.patch('/api/exsercise/:username', async (req,res)=>{
    try{
        //console.log(req.body)
        const newUserData = req.body
        //console.log(newUserData)
        const user = await Login.findOneAndUpdate({username: req.params.username}, { exsercises: newUserData[0].exsercises },
            { new: true });
        
        res.json(user)
        console.log(user)
    }catch(err){
        console.log(err)
    }
})  


app.listen(port, () => {console.log(`http://localhost:${port}`)})