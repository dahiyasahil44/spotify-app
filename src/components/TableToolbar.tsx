import debounce from "lodash.debounce";
import { useMemo } from "react";
import { exportToCSV } from "../utils/csvExport";

export function TableToolbar({ table }: any) {
  const onSearch = useMemo(
    () =>
      debounce((value: string) => {
        table.setGlobalFilter(value);
      }, 300),
    [table]
  );

  const handleExport = () => {
    const rows = table
      .getSortedRowModel()
      .rows.map((row: any) => row.original);

    exportToCSV(rows);
  };

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
      <input
        type="text"
        placeholder="Search tracks, artists, genre..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />

      <button onClick={handleExport}>
        Download CSV
      </button>
    </div>
  );
}
