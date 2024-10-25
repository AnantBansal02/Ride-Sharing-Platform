import Trip from "../../models/trip.js";

const createTrip = async(req,res) => {
    
    
    // trip owner id, start location, end location
    
    // create trip id, cost

    try {

        const { fullName , cab_number , driver_phone , driver_name , source , destination , price , available_seats} = req.body;

        if(!fullName || !cab_number || ! driver_name || !driver_phone || !source || !destination || !price || !available_seats){
            res.status(400).json({
                message : "missing or wring fields in create trip route"
            })
        }

        const newTrip = new Trip({
            ride_creator: fullName,
            driver_name,
            driver_phone,
            cab_number,
            source,
            destination,
            price,
            available_seats
        })

        await newTrip.save()

        res.status(200).json(newTrip)
        
    } catch (error) {
        console.log("Error in create Trip : ", error);
        res.status(500).json({
            message: "ride creation failed Internal server error"
        })
    }
} 

export default createTrip;