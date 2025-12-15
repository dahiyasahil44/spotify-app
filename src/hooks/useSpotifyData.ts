import { useState, useEffect } from "react";
import Papa from "papaparse";
import type { SpotifyTrack } from "../types/spotify";


export function useSpotifyData() {
    const [data, setData] = useState<SpotifyTrack[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(()=>{
        Papa.parse("/spotify_songs.csv", {
            download: true,
            header: true,
            delimiter: ",",
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (result: { data: SpotifyTrack[]; }) => {
                // console.log("Parsed data:", result.data);
                setData(result.data as SpotifyTrack[]);
                setLoading(false);
            },
            error: (err: any) => {
                console.error(err);
                setError("Failed to parse Spotify dataset");
                setLoading(false);
            },
        });


    },[]);

    return { data, loading, error };
}