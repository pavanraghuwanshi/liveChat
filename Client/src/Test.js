import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Test = ()=> {
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    // Listen for live data from the server
    socket.on('live-data', (data) => {
      setLiveData(data);
    });

    return () => {
      socket.off('live-data');
    };
  }, []);

  return (
    <div className="App">
      <h1>Live Device Data</h1>
      {liveData ? (
        <pre>{JSON.stringify(liveData, null, 2)}</pre>
      ) : (
        <p>No live data available</p>
      )}
    </div>
  );
}

export default Test;
