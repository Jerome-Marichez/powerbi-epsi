import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef,
	type MRT_SortingState,
	type MRT_Virtualizer,
} from 'material-react-table';

interface TableProps {
	jsonData: { [key: string]: string }[];
	filteredJSON: (data: { [key: string]: string }[]) => void;
}

/**
 * @param jsonData A data set 
 * @param filteredJSON A function which will update the data with the filter apply
 * @returns A instance of Tanstack
 */
const Table: React.FC<TableProps> = ({ jsonData, filteredJSON }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [sorting, setSorting] = useState<MRT_SortingState>([]);
	const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

	useEffect(() => {
		if (jsonData.length > 0) {
			setIsLoading(false);
		}
	}, [jsonData]);

	useEffect(() => {
		try {
			rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
		} catch (error) {
			console.error(error);
		}
	}, [sorting]);

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => {
			if (jsonData.length === 0) {
				return [];
			}

			const keys = Object.keys(jsonData[0]);

			return keys.map((key) => ({
				accessorKey: key,
				header: key,
			}));
		},
		[jsonData]
	);

	const table = useMaterialReactTable({
		columns,
		data: jsonData,
		defaultDisplayColumn: { enableResizing: true },
		enableBottomToolbar: true,
		enableColumnResizing: true,
		enableColumnVirtualization: true,
		enableGlobalFilterModes: true,
		enablePagination: true,
		rowCount: 50,
		enableColumnPinning: true,
		enableEditing: true,
		enableRowNumbers: true,
		editDisplayMode: "cell",
		enableRowVirtualization: true,
		muiTableContainerProps: { sx: { maxHeight: '600px' } },
		onSortingChange: setSorting,
		state: { isLoading, sorting },
		rowVirtualizerInstanceRef,
	});

	const rowsFiltered = table.getFilteredRowModel().flatRows.map((v) => v.original);
	filteredJSON(rowsFiltered);

	return <MaterialReactTable table={table} />;
};

export const TableMemorized = React.memo(Table);