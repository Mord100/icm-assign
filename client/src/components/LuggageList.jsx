import React, { useState, useEffect } from 'react';
import LuggageItem from './LuggageItem'; 

const LuggageList = () => {
  const [luggages, setLuggages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4">
      {luggages.map((luggage) => (
        <LuggageItem key={luggage._id} luggage={luggage} />
      ))}
    </div>
  );
};

export default LuggageList;
