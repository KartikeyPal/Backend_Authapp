const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.URL

exports.connectDB = ()=>{
    mongoose.connect(url, {
   
}).then(()=>{
    console.log("DB connection successful");
}).catch((err)=>{
    console.log("DB connection issue");
        console.error(err);
		process.exit(1);
})
}