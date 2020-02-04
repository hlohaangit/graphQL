const express=require("express");
const graphqlHTTP= require('express-graphql');
const mongoose = require ('mongoose');
const schema= require('./schema/schema');


const app = express();


//connection to mongodb database
const mongoURL='mongodb+srv://harshit:harshit123@cluster0-kadus.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', ()=>{
    console.log("connected to database");
});

//main route
app.use('/graphiql',graphqlHTTP({
    schema,
    graphiql: true
}));

//opening the port
app.listen(4000,()=>{
    console.log("now listening on port 4000");
});
