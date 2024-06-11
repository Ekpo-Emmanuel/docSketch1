import * as React from 'react'


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { ArrowUpAZ, ArrowUpZA  } from 'lucide-react';


type ChildComponentProps = {
    data: any[];
    columns: any[];
}

export default function AllFiles3(props: ChildComponentProps) {
    const { data, columns } = props
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
      data,
      columns,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    })

  return (
  <div>
    <table>
      <thead>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
            <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                    )}
                {{
                asc: '🔼',
                desc: '🔽',
                }[header.column.getIsSorted() as string] ?? null}
            </th>
            ))}
        </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row: any) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell: any) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup: any) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header: any) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  </div>
  )
}
