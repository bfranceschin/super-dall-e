'use client'
import { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState({ imageUrl: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api');
        const result = await response.json();
        console.log(result)
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
      const intervalId = setInterval(fetchData, 300000); // Fetch new data every 5 minutes
      return () => clearInterval(intervalId);
    }, []);

    // Button click handler to manually trigger data refresh
    const handleRegenerateClick = () => {
        fetchData();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <img src={data.imageUrl} alt="Generated Image" className="max-w-sm rounded-lg shadow-lg" />
          <p className="mt-5 text-lg text-gray-700">{data.text}</p>
          <button
            onClick={handleRegenerateClick}
            className="mt-5 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Regenerate
          </button>
      </div>
    );
}
