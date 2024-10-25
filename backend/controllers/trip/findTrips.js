
import {getValidTrips} from "../../helper/getValidTrips.js";
import Trip from "../../models/trip.js";

const findTrip = async (req,res) => {

    try {

        const documents = await Trip.find({});

        const source = req.body.source;
        const destination = req.body.destination;

    

        const mappedDocuments = [];


        for(let i=0;i<documents.length;i++){
            const flag = await getValidTrips(documents[i], source, destination);
            if(flag){
                mappedDocuments.push(documents[i]);
            }
        }

        res.status(200).json(mappedDocuments);
        
    } catch (error) {

        console.log("Error in find trips (servber error)", error);
        res.status(500).json({message: "failed"});
        
    }
}

export default findTrip;


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

ride_status = [created, started, completed]




const { MongoClient } = require('mongodb');

// MongoDB connection URI (replace with your MongoDB connection string)
const uri = 'mongodb://localhost:27017';  // Example for a local MongoDB server

// MongoDB client setup
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        
        // Select the database and collection
        const database = client.db('myDatabase'); // Replace with your database name
        const collection = database.collection('myCollection'); // Replace with your collection name

        // Retrieve all documents from the collection
        const documents = await collection.find({}).toArray();

        // Map over the documents to perform an operation
        const mappedDocuments = documents.map(doc => {
            // Example operation: Add a new field to each document
            return {
                ...doc,
                newField: 'This is a new field'
            };
        });

        // Log the mapped documents
        console.log(mappedDocuments);

    } finally {
        // Close the connection to the MongoDB server
        await client.close();
    }
}

run().catch(console.error);










*/