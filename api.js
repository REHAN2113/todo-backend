require('dotenv').config();
var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
var app = express();

// Configure CORS with allowed methods
app.use(cors({
    origin:"*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Use the DB_URI from the .env file
var conString = process.env.DB_URI;
let database;

// Connect to MongoDB using the DB_URI from the .env
mongoClient.connect(conString)
    .then(client => {
        console.log("Connected to database");
        database = client.db("todo");
    })
    .catch(err => {
        console.error("Error connecting to the database", err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the PORT from the .env file or default to 5050
var port = process.env.PORT || 4040;

app.get("/users",(req,res)=>{



    var database = clientObj.db("todo");
    database.collection("users").find({}).toArray().then(document=>{
             res.send(document);
             res.end();

    })



})

app.get("/get-appointments/:userid",(req,res)=>{
    
        var database = clientObj.db("todo");
        database.collection("appointments").find({UserId:req.params.userid}).toArray().then(document=>{
               
                 res.send(document);
                 res.end();
    
        })
    


})

app.get("/get-appointment/:userid/:id",(req,res)=>{

    const AID = parseInt(req.params.id);
    
        var database = clientObj.db("todo");
        database.collection("appointments").findOne({$and:[{UserId:req.params.userid},{AppointmentId:AID}]}).then(document=>{
                console.log(document);
                 res.send(document);
                 res.end();
    
        })
    
    

})

app.post("/register-user",(req,res)=>{

    var user ={
   UserId : req.body.UserId,
   UserName:req.body.UserName,
   Password:req.body.Password,
   Email:req.body.Email,
   Mobile:req.body.Mobile

    }
   
        var database = clientObj.db("todo");
        database.collection("users").insertOne(user).then(()=>{
            console.log("user Registered");
            res.end();
        });
    
        })
    
    

    app.post("/add-appointment",(req,res)=>{
       var appointment ={
        AppointmentId: parseInt(req.body.AppointmentId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        Time: new Date(req.body.Time),
        UserId: req.body.UserId

       }
      
        var database = clientObj.db("todo");
        database.collection("appointments").insertOne(appointment).then(()=>{
           
            res.end();
        });
    
        

    })

    app.put("/edit-appointment/:userid/:id",(req,res)=>{
        var AID = parseInt(req.params.id);
        var appointment ={
         AppointmentId: parseInt(req.body.AppointmentId),
         Title: req.body.Title,
         Description: req.body.Description,
         Date: new Date(req.body.Date),
         Time: new Date(req.body.Time),
         UserId: req.body.UserId
 
        }
       
         var database = clientObj.db("todo");
         database.collection("appointments").updateOne({$and:[{UserId:req.params.userid},{AppointmentId:AID}]}
         ,{ $set:{
            Title: appointment.Title,
            Description : appointment.Description,
            Date : appointment.Date

         } }
            
        ).then(()=>{
             console.log("appointment edited");
             res.end();
         });
     
         
 
     })

     app.delete('/delete-appointment/:userid/:id', (req, res)=>{
       var AID = parseInt(req.params.id);
       
             var database = clientObj.db("todo");
             database.collection('appointments').deleteOne({$and:[{UserId:req.params.userid},{AppointmentId:AID}]}).then(()=>{
                console.log('Appointment Deleted..');
                res.end();
             });
        
    });
    
    app.listen(4040);
    console.log(`Server Started http://127.0.0.1:4040`);