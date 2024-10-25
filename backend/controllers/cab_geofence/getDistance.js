import Trip from "../../models/trip.js";
import User from "../../models/user.js";
import { manager } from "../notification/manager.js";

export const getDistance  = async (req,res) => {
    try {
        const {point , tripId} = req.body;


        const trip = await Trip.findById(tripId);
        if(!trip){
            res.status(400).json({message : "unvalid trip"});
        }
        

        const companions = trip.companions;
        companions.map(async(companion) => {
            const targetPoint = companion.targetPoint;
            const geofence = turf.circle(point, radius, { units: 'kilometers' });
            console.log("GEOFENCE", geofence)

            const isInside = turf.booleanPointInPolygon(targetPoint, geofence);
            
            if (isInside) {
                const user = await User.findById(companion.userId);
                const phone = "+91"+ process.env.PHONE_NUMBER;
                manager(phone, "Cab is near, be ready !");
            }
        })

        res.status(200).json({message : "success", tripStatus: trip.status});   


    } catch (error) {
        console.log("error in get distance controller" , error);
        res.status(500).json({message : "failed"});
    }
}