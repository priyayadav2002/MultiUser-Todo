const express = require('express');
const { users }=require('./db')
const cors=require('cors')
const app= express();
const port = 8080;

app.use(express.json())
app.use(cors())
app.post('/signup',(req,res)=>{
    let user=req.body;
    users.findOne({username:user.username})
        .then((data)=> {
            console.log(data);
            if (data) return res.status(409).send('Email already exists!')
            else
                users.create(user)
                    .then(()=>res.status(200).send("account created"))
        })


})







app.post( '/login',(req,res)=>{
    let user=req.body;
    console.log(user);
    users.findOne({username:user.username,password:user.password})
        .then((data)=>{
            console.log(data)
             if(data)
                res.send("Logged in")
            else 
                res.status(401).send('Wrong email or password')

        })
})






app.post("/display",(req,res)=>{
  let username=req.body.username

  console.log(req.body)

users.findOne({username}).then((data)=>{

  if(data)
    res.send(data)

  else{
    res.status(400).send("error")
  }  
})


})

app.post("/add",(req,res)=>{
  let username=req.body.username
  let newtodo=req.body.todo
  let description=req.body.description
  users.updateOne({username},{$push:{todos:{todo:newtodo,description,completed:false}}}).then(()=>{
    res.send("todo added")
  })
})

app.post("/delete",async(req,res)=>{
  let username=req.body.username
let id=req.body.id
console.log(req.body);
  
  const user = await users.findOne({ username });

 

  const todoIndex = user.todos.findIndex(todo => todo._id.toString() === id);

  if (todoIndex === -1) {
    return res.status(200).json({ message: 'Todo not found' });
  }

  
  user.todos.splice(todoIndex, 1);

 
  await user.save();
  res.send("todo deleted");

})










app.listen(port,()=>console.log(`listeningon ${port}`));