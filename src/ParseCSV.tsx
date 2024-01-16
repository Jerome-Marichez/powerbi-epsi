import React, { useState } from 'react';
import Papa from 'papaparse';


interface PropsParseCSV {
	onDataLoad: React.Dispatch<React.SetStateAction<any[] | boolean>>;
}

/**
 * @param props onLoad a Callback function called when the JSON is loaded
 * @returns A drag & drop area where we can upload our CSV file
 */
export function ParseCSV(props: PropsParseCSV): JSX.Element {

	const [fileLoad, setFileLoad] = useState<boolean>(false);


	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];

		if (file) {
			parseCSV(file);
		}
	};

	const parseCSV = (file: File) => {
		Papa.parse(file, {
			complete: (result: any) => {
				const header = result.data[0];
				const data = result.data.slice(1);

				const jsonData = data.map((row: any) => {
					const obj: { [key: string]: string } = {};
					header.forEach((col: any, index: number) => {
						obj[col] = row[index];
					});
					return obj;
				});

				setFileLoad(true);
				props.onDataLoad(jsonData);
			},
			header: false,
		});
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div onDrop={handleDrop} onDragOver={handleDragOver} style={{ padding: "20px", border: "2px dashed green", textAlign: "center" }}>

			{fileLoad ? (
				<div>
					<h2>Fichier CSV Chargées avec succès !</h2>
				</div>
			) : (
				<div>
					<h2>Glissez déposer votre fichier CSV</h2>
				</div>
			)}
		</div>
	);
};
