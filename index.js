const express = require('express'); //here we simply require the express library
const server = express(); //this saves an instance of express inside server so we can access all its (express's) methods and stuff
const bodyParser = require('body-parser');
const cors = require('cors');
server.use(cors());
server.use(bodyParser.json()); // for JSON data body
server.use(express.static('build'))//Used to create static web hosting on your node server (similar to http-server module)
server.use(bodyParser.urlencoded({ extended: false })) //for urlencoded data body
const morgan = require('morgan');
server.use(morgan('dev'));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true});

const session = require('express-session')

const Schema = mongoose.Schema;

const taskSchema = new Schema({ //this basically sets the configuration of the to-be-made collection(s)
  title: String,
  status: Boolean,
  pinned: Boolean,
  anim: Boolean,
  // date: {type: Date, default: Date.now}
});


const Task = mongoose.model('Task', taskSchema); //here a collection of the name Task is made
// const Light = mongoose.model('Light', taskSchema); //here a collection of the name Light is made

server.post("/tasks", function(req, res){
  const task = new Task();
  task.title = req.body.title;
  task.status = req.body.status;
  task.pinned = req.body.pinned;
  task.anim = req.body.anim;
  task.save()
  res.json(task);
  console.log(task);
})

server.put("/tasks/status", function(req,res){
  Task.update(
    {title: req.body.title}, 
    {$set: {status: req.body.status}}, 
    {new: true}
  ).then(res=>{
    res.json();
  })
})

server.delete("/tasks/:id", function(req, res){
  console.log("del",req.params.id);  
  Task.findOneAndDelete({_id:req.params.id}).then(docs=>{
    // data: docs
    res.json(docs)
  })   
})

server.get(`/tasks`, function(req,res){
  Task.find({}, function(err, doc){
    console.log(doc);
    res.json(doc);    
  })
})

/* server.post("/color", function(req, res){
  Color.arr = req.body.Array
  Color.save();
  res.json(Color);
})

server.get('/color', function(req, res){
  Color.find({}, function(err, doc){
    console.log(doc);
    res.json(doc);
  })
})
 */

/* server.get("/query/:a",function(req, res){
  Task.findOne({title: req.params.a}, function(err,docs){ //here the condition we set is that title should equal to the query set in the URL like : task/studying so it'll return the studying document
    console.log(docs);  
    res.json(docs); //here the found document will be stored in an array called docs
  })
})  */

/* server.get("/lumen/:b",function(req,res){
  Light.findOne({title: req.params.b}, function(err, doc){
    console.log(doc);
    res.json(doc);
  })
}) */


/* let task = new Task();  // here an obejct of the instance of Task is made
task.title= "shopping"; //from here on the instance of Task is accessed through task and documents of the specified fields are made
task.status= true;
task.date = new Date();
task.save();


let p = new Task();
p.title = "studying";
p.status = false;
p.date = "2010-05-30";
p.save(); 

res.json(task+p); */

/* server.get("/tasks", function(req, res){
  Task.find({},function(err, docs){
    console.log(docs);    
    res.json(docs)
  })  
}) */

/* server.post("/light", function(req, res){
  let t = new Light();
  t.title = "abcd";
  t.status = true;
  t.date = "2010-05-30";
  t.save();
  res.json(t);
}) */

/* server.put("/shine/:ccc", function(req,res){
  Light.findOneAndUpdate({title: req.params.ccc}, {$set:{title:'rock'}},  {new:true} ,function(err,doc){
    console.log(doc);
    res.json(doc);
  })
}) */

/* server.put("/change/:vvv",function(req,res){
  Light.findOneAndUpdate({title: req.params.vvv}, {title: "newTitle"}, {overwrite: true}, function(err, doc){
    console.log(doc);
    res.json(doc);    
  })
}) */

/* server.delete("/del/:name",function(req,res){
  Light.findOneAndDelete({title: req.params.name},function(err,doc){ //here we have passed an argument in the URL which is then matched to a document and then deleted this deleted document is then stored in doc which is then passed as the response
    console.log(doc);
    res.json(doc);
  })
}) */


/* server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }   // make secure : true incase you are using HTTPS
})) */

/* server.get('/user', function(req, res) {
    if (req.session.views) {
      req.session.views++
      res.json({views:req.session.views})
    } else {
      req.session.views = 1
      res.send('welcome to the session demo. refresh!')
    }
  }) */


/* server.get("/send",function(req,res){
    res.send("HELLO WORLD!");
})

server.get("/jsonreq",function(req,res){
    res.json({
        name: 'Jack'
    });
})

server.get("/demo",function(req,res) {
    console.log(req.query);
    res.send(req.query);//initially, this will return an empty object because we haven't passed any query string in the url. so we do that by writitng ?name=Youstart&subject=express
    
})

server.get("/demo/:name/:age/:subject",function(req,res){
    console.log(req.params) // prints all data in request object
    res.send(req.params);  // send back same data in response object
})

server.post("/login",function(req,res){
    console.log(req.body);
    res.json(req.body);
}) */

server.listen(8080,function(){
    console.log('server has started');    
})
