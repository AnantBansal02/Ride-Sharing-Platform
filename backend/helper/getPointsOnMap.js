import mapboxSdk from "@mapbox/mapbox-sdk";
import directionsService from "@mapbox/mapbox-sdk/services/directions.js";
import * as turf from "@turf/turf";

const mapboxClient = mapboxSdk({
  accessToken: process.env.MAPBOX_ACCESS_TOCKEN,
});

const directionsClient = directionsService(mapboxClient);

export async function getRoute(source, destination, n) {
  try {

    const response = await directionsClient
      .getDirections({
        profile: "driving",
        geometries: "geojson",
        waypoints: [{ coordinates: source }, { coordinates: destination }],
      })
      .send();

    const route = response.body.routes[0].geometry;
    const totalDistance = calculateTotalDistance(route);

    const temppoints = divideRouteIntoEqualPoints(route, n);
    const points =[];
    points.push(source);
    for(let i=0;i<temppoints.length;i++){
      points.push(temppoints[i]);
    }
    points.push(destination);


    // console.log(points, totalDistance);

    return { points, totalDistance };
  } catch (error) {
    console.error("Error getting route:", error);
  }
}

function divideRouteIntoEqualPoints(route, n) {
  const line = turf.lineString(route.coordinates);
  const totalDistance = turf.length(line, { units: "kilometers" });
  const segmentDistance = totalDistance / (n - 1);

  const points = [];
  for (let i = 0; i < n; i++) {
    const pointAtDistance = turf.along(line, segmentDistance * i, {
      units: "kilometers",
    });
    points.push(pointAtDistance.geometry.coordinates);
  }

  return points;
}

function calculateTotalDistance(route) {
  const line = turf.lineString(route.coordinates);
  const totalDistance = turf.length(line, { units: "kilometers" });
  return totalDistance;
}
