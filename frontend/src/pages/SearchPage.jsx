import { useState } from 'react';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import axios from 'axios';
import { Search, Loader } from 'lucide-react'; // Importing the Loader icon from lucide-react
import TripCard from '../components/TripCard';

const SearchPage = () => {
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [leavingFromCoords, setLeavingFromCoords] = useState([]);
  const [goingToCoords, setGoingToCoords] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Searching for:', { leavingFromCoords, goingToCoords });

    // Set loading to true when search begins
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8000/api/trip/find',
        {
          source: leavingFromCoords,
          destination: goingToCoords,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setTrips(res.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }

    // Set loading to false when search is complete
    setLoading(false);
  };

  const handleLeavingFromSelect = (value) => {
    if (value) {
      setLeavingFrom(value.properties.formatted);
      setLeavingFromCoords([value.properties.lon, value.properties.lat]);
    }
  };

  const handleGoingToSelect = (value) => {
    if (value) {
      setGoingTo(value.properties.formatted);
      setGoingToCoords([value.properties.lon, value.properties.lat]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Search for Rides</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <GeoapifyContext apiKey={import.meta.env.VITE_GEO_API_KEY}>
            <div>
              <label className="block text-gray-700">Leaving From</label>
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter departure city"
                type="city"
                value={leavingFrom}
                placeSelect={handleLeavingFromSelect}
              />
            </div>

            <div>
              <label className="block text-gray-700">Going To</label>
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter destination city"
                type="city"
                value={goingTo}
                placeSelect={handleGoingToSelect}
              />
            </div>
          </GeoapifyContext>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <Search className="mr-2" />
            Search
          </button>
        </form>

        {/* Display loading spinner if loading */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader className="animate-spin" /> {/* Loading spinner */}
              <span className="ml-2 text-gray-600">Loading rides...</span>
            </div>
          ) : trips.length > 0 ? (
            <ul>
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No rides found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
