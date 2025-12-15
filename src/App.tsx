import './App.css'
import { useSpotifyData } from './hooks/useSpotifyData'

function App() {
  const {data, error, loading} = useSpotifyData();

  console.log(data)

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {data.map((track, index) => (
            <div key={index}>
              <h2>{track.track_name}</h2>
              <p>{track.track_artist}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
