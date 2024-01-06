'use client'
import { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState({ imageUrl: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         setLoading(true);
        //         const response = await fetch('/api/getImage');
        //         const result = await response.json();
        //         setData(result);
        //         setLoading(false);
        //     } catch (err) {
        //         setError(true);
        //         setLoading(false);
        //     }
        // };

        // fetchData();

        // // Set up a timer to fetch new data every 5 minutes (300000 milliseconds)
        // const intervalId = setInterval(fetchData, 300000);

        // // Clean up the interval on component unmount
        // return () => clearInterval(intervalId);
      const result = {
        imageUrl: 'https://litoralguia.com.br/wordpress/wp-content/files/litoralguia.com.br/2021/12/imagem1.png',
        text: 'imagem aleatória de saquarema'
      };
      setData(result);
      setLoading(false);
    }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading data</p>;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <img src={data.imageUrl} alt="Generated Image" className="max-w-sm rounded-lg shadow-lg" />
          <p className="mt-5 text-lg text-gray-700">{data.text}</p>
      </div>
    );
}
