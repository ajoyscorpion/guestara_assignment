// mongoose to interact with MongoDB
const mongoose = require('mongoose')

// database connection string from the environment variables
const connectionString = process.env.DATABASE

// connection to MongoDB Atlas using mongoose
mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Mongo db Atlas connected successfully");
}).catch((err)=>{
    console.log(`Mongo db Connection Error : ${err}`);
})