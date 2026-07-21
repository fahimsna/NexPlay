const mongoose = require("mongoose");


const upcomingSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    genre:{
        type:String,
        required:true
    },

    poster:{
        type:String,
        required:true
    },

    trailerURL:{
        type:String
    },

    releaseDate:{
        type:String
    },

    description:{
        type:String
    }

});


module.exports = mongoose.model(
    "Upcoming",
    upcomingSchema
);