'use client'
import { useState, useEffect } from 'react';

// const loadingImageUrl = 'https://www.istockphoto.com/br/v%C3%ADdeo/anima%C3%A7%C3%A3o-do-%C3%ADcone-do-c%C3%ADrculo-de-carregamento-em-fundo-branco-pr%C3%A9-carregador-loopable-gm1302436594-394176682'
const loadingImageUrl = 'https://as1.ftcdn.net/v2/jpg/02/22/75/60/1000_F_222756095_dxtA68MXpsnN5WE5UeeHEFDChCSfdWq7.jpg'
const errorImage = 'https://thumbs.dreamstime.com/z/error-rubber-stamp-word-error-inside-illustration-109026446.jpg?ct=jpeg'

function ParametersTable({ parameters }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parameter Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(parameters).map(([parameterName, parameterData]) => (
            <tr key={parameterName}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parameterName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parameterData.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


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

    let imageUrl
    let text
    let parameters = {}
    if (loading) {
      imageUrl = loadingImageUrl;
      text = 'Loading...'
    } else if (error) {
      imageUrl = errorImage
      text = 'Error!'
    } else {
      imageUrl = data.imageUrl
      text = data.text
      parameters = data.parameters
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          {/* <img src={imageUrl} alt="Generated Image" className="max-w-sm rounded-lg shadow-lg" /> */}
          <img src={imageUrl} alt="Generated Image" className="w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-lg shadow-lg" />
          <p className="mt-5 text-lg text-gray-700">{text}</p>
          <ParametersTable parameters={parameters} />
          <button
            onClick={handleRegenerateClick}
            className="mt-5 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Regenerate
          </button>
      </div>
    );
}
