import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    source : {
        type : Array,
        required : true
    },
    destination : {
        type : Array,
        required : true
    },
    waypoints : {
        type : Array,
        default : []
    },
    companions : {
        type : Array,
        default : []
    },
    available_seats : {
        type : Number,
        required : true
    },
    ride_creator : {
        type: String,
        required : true
    },
    cab_number: {
        type : String,
        required : true
    },
    driver_name : { 
        type : String,
        required : true
    },
    driver_phone : {
        type : String,
    },
    ride_status  : {
        type : String,
        enum: ["active" , "unactive" , "completed"],
        default : "active"
    },
    price : {
        type : Number,
        required : true
    }
    
}, {timestamps: true})

const Trip= mongoose.model("Trip",userSchema);

export default Trip;

/*
TRIP SCHEMA

ride_creator
driver_name
cab_number
driver_phoneNo

source
destination
companion : []
available_seats

ride_status = [created, started, completed*/