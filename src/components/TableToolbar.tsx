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

  // const handleExport = () => {
  //   const rows = table
  //     .getSortedRowModel()
  //     .rows.map((row: any) => row.original);

  //   exportToCSV(rows);
  // };

  const handleExportSelected = () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row: any) => row.original);

    exportToCSV(selectedRows);
  };

  return (
    <>
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
      <input
        type="text"
        placeholder="Search tracks, artists, genre..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />

      <button onClick={handleExportSelected} 
      disabled={table.getSelectedRowModel().rows.length === 0}>
        Export Selected
      </button>
    </div>

    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      {table.getAllLeafColumns().map((column: any) => (
        <label key={column.id} style={{ fontSize: "0.9rem", textTransform: "capitalize" }}>
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />{" "}
          {column.id}
        </label>
      ))}
    </div>

    </>
  );
}
