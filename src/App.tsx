import './App.css'
import { useSpotifyData } from './hooks/useSpotifyData'
import { DataTable } from "./components/DataTable";

function App() {
  const {data, error, loading} = useSpotifyData();

  // console.log(data)

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading Spotify Tracks...</h2>
        <p>Please wait while we fetch 30,000 songs 🎧</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <header style={{ marginBottom: "1rem" }}>
        <h1>Spotify Tracks Dashboard</h1>
        <p>
          Showing <strong>{data.length.toLocaleString()}</strong> tracks
        </p>
      </header>

      <DataTable data={data} />
    </div>
  )
}

export default App
