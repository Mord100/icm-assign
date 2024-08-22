import React, { useState, useEffect } from 'react';
import LuggageItem from './LuggageItem';

const LuggageList = () => {
  const [luggages, setLuggages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLuggages = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/luggages');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLuggages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLuggages();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredLuggages = luggages.filter(luggage =>
    luggage.departurePoint.toLowerCase().includes(searchTerm) ||
    luggage.destination.toLowerCase().includes(searchTerm) ||
    luggage.ticketNumber.toLowerCase().includes(searchTerm) ||
    luggage.email.toLowerCase().includes(searchTerm) ||
    luggage.phone.toLowerCase().includes(searchTerm)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search luggage..." 
        className="mb-4 p-2 border rounded w-full"
      />
      {filteredLuggages.length > 0 ? (
        filteredLuggages.map((luggage) => (
          <LuggageItem key={luggage._id} luggage={luggage} />
        ))
      ) : (
        <p>No luggage found matching your search criteria.</p>
      )}
    </div>
  );
};

export default LuggageList;
