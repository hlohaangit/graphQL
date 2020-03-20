const express = require('express');
const graphqlHTTP= require('express-graphql');
const schema = require('./schema/schema')
const cors = require('cors');
const mongoose = require('mongoose');


const app=express();
app.listen(4000,()=>{
    console.log('now listening at 4000');
})

app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));



//connecting to mongodb
mongoose.connect('mongodb://localhost/graphQL',{ useNewUrlParser: true , useUnifiedTopology: true }); 
mongoose.connection.once('open',function(){
    console.log("connected to mongoDB")
}).on('error',function(error){
    console.log("connection error :", error);

})





