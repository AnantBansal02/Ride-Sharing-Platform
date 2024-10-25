import checkIfPointInGeofence from "./getNearestLocation.js";
import { getRoute } from "./getPointsOnMap.js";



export const getValidTrips  = async (trip , source , destination) => {

    const numberOfPoints = 20;

    // if(trip.available_seats===trip.companions.length){
    //     return false;
    // }

    // if(trip.status != "active"){
    //     return false;
    // }

    const routePoints = await getRoute(trip.source, trip.destination, numberOfPoints);

    const totalDistance = routePoints.totalDistance;
    const radius = 2*(totalDistance/numberOfPoints);
    const targetSourceLocation = source;
    const targetDestinationLocation = destination;
    let flag = 0;
    const startGeofenceLocation = checkIfPointInGeofence(routePoints.points, radius, targetSourceLocation, flag);
    let destinationGeofenceLocation = null;
    if(startGeofenceLocation.inside){
        flag = 1;
        destinationGeofenceLocation = checkIfPointInGeofence(routePoints.points, radius, targetDestinationLocation, flag)
        if(destinationGeofenceLocation.inside){
            //trip permitted
    
            const startIndex = startGeofenceLocation.index;
            const endIndex = destinationGeofenceLocation.index;
            console.log("INDEX",[startIndex,endIndex]);
    
    
            if(startIndex < endIndex){
                console.log("TRIP PERMITTED")
                return true;
                /*
                    check if there are seats availabe in the car
                    update the companion array in the trip
                
                */
            }
    
    
        }else{
            return false;
        }
    }else{
        return false;
    }
}