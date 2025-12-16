import type { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import type { SpotifyTrack } from "../types/spotify";
import { useMemo, useState } from "react";
import { TableToolbar } from "./TableToolbar";
import type { SortingState } from "@tanstack/react-table";

export function DataTable({data}:{data: SpotifyTrack[]}){
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const columns = useMemo<ColumnDef<SpotifyTrack>[]>(() => [
        { accessorKey: "track_name", header: "Track" },
        { accessorKey: "track_artist", header: "Artist" },
        { accessorKey: "track_album_name", header: "Album" },
        { accessorKey: "playlist_genre", header: "Genre" },
        { accessorKey: "track_popularity", header: "Popularity" },
        { accessorKey: "tempo", header: "Tempo" },
        { accessorKey: "energy", header: "Energy" },
        { accessorKey: "danceability", header: "Danceability" },
        { accessorKey: "duration_ms", header: "Duration" },
        { accessorKey: "track_album_release_date", header: "Release Date" },
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: {sorting, globalFilter},
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <TableToolbar table={table} />

            <table width="100%" border={1} cellPadding={8}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup=>(
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header=>(
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ cursor: "pointer" }}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{ asc: "🔼", desc: "🔽" }[header.column.getIsSorted() as string] ?? ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                        <td colSpan={columns.length} align="center">
                            No results found
                        </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                                )}
                            </td>
                            ))}
                        </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
                </button>

                <span>
                Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
                <strong>{table.getPageCount()}</strong>
                </span>

                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
                </button>

                <select style={{ padding: "0.5rem", width: "100px" }}
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                {[25, 50, 100].map(size => (
                    <option key={size} value={size}>
                    Show {size}
                    </option>
                ))}
                </select>
            </div>

            <p style={{ marginTop: "0.5rem" }}>
                Showing{" "}
                <strong>
                {table.getRowModel().rows.length}
                </strong>{" "}
                of{" "}
                <strong>
                {table.getFilteredRowModel().rows.length}
                </strong>{" "}
                results
            </p>
        </>
    )


}