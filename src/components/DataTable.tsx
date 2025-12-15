import type { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { SpotifyTrack } from "../types/spotify";
import { useMemo, useState } from "react";

export function DataTable({data}:{data: SpotifyTrack[]}){
    const [sorting, setSorting] = useState([]);

    const columns = useMemo<ColumnDef<SpotifyTrack>[]>(() => [
        { accessorKey: "track_name", header: "Track" },
        { accessorKey: "track_artist", header: "Artist" },
        { accessorKey: "playlist_genre", header: "Genre" },
        { accessorKey: "track_popularity", header: "Popularity" },
        { accessorKey: "tempo", header: "Tempo" },
        { accessorKey: "track_album_release_date", header: "Release Date" },
        { accessorKey: "explicit", header: "Explicit" },
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup=>(
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header=>(
                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string] ?? ""}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map(row=>(
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell=>(
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )


}