import Papa from "papaparse";

export function exportToCSV(rows: any[]) {
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "spotify_tracks.csv";
  link.click();
}
