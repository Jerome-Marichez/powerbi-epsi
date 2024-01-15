// Table.js
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
	type MRT_SortingState,
	type MRT_Virtualizer,
} from 'material-react-table';

interface TableProps {
	jsonData: any[]; // Change the type based on your data structure
}

export function Table({ jsonData }: TableProps) {
	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => {
			if (jsonData.length === 0) {
				return [];
			}

			// Extracting columns dynamically from the keys of the first item
			const keys = Object.keys(jsonData[0]);

			return keys.map((key) => ({
				accessorKey: key,
				header: key,
			}));
		},
		[jsonData]
	);

	// optionally access the underlying virtualizer instance
	const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(
		null
	);

	const [isLoading, setIsLoading] = useState(true);
	const [sorting, setSorting] = useState<MRT_SortingState>([]);

	useEffect(() => {
		if (jsonData.length > 0) {
			setIsLoading(false);
		}
	}, [jsonData]);

	useEffect(() => {
		// scroll to the top of the table when the sorting changes
		try {
			rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
		} catch (error) {
			console.error(error);
		}
	}, [sorting]);

	const table = useMaterialReactTable({
		columns,
		data: jsonData,
		defaultDisplayColumn: { enableResizing: true },
		enableBottomToolbar: false,
		enableColumnResizing: true,
		enableColumnVirtualization: true,
		enableGlobalFilterModes: true,
		enablePagination: false,
		enableColumnPinning: true,
		enableRowNumbers: true,
		enableRowVirtualization: true,
		muiTableContainerProps: { sx: { maxHeight: '600px' } },
		onSortingChange: setSorting,
		state: { isLoading, sorting },
		rowVirtualizerInstanceRef, // optional
		rowVirtualizerOptions: { overscan: 5 }, // optionally customize the row virtualizer
		columnVirtualizerOptions: { overscan: 2 }, // optionally customize the column virtualizer
	});

	return <MaterialReactTable table={table} />;
}

export default Table;
