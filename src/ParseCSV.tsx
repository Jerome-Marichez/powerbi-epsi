import React, { useState } from 'react';
import Papa from 'papaparse';

interface ParseCSVProps {
	onDataLoad: React.Dispatch<React.SetStateAction<{ [key: string]: string }[] | boolean>>;
}

/**
 * 
 * @params A callback who update a state in the main parent
 * @returns A parse CSV drag & drop area who convert CSV to JSON
 */
export function ParseCSV(props: ParseCSVProps): JSX.Element {
	const [fileLoad, setFileLoad] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];

		if (file) {
			parseCSV(file);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			parseCSV(file);
		}
	};

	const parseCSV = (file: File) => {
		const fileName = file.name.toLowerCase();

		if (fileName.endsWith('.csv')) {
			setErrorMessage(null);

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
		} else {
			setErrorMessage('Fichier au mauvais format 🤬, veuillez rééssayer en rafraichissant la page');
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			className='animated-border'
		>
			<input
				type="file"
				style={{ display: 'none' }}
				onChange={handleFileChange}
				accept=".csv"
				id="fileInput"
			/>
			{errorMessage ? (
				<div>
					<h2>{errorMessage}</h2>
				</div>
			) : fileLoad ? (
				<div>
					<h2>Fichier CSV chargé avec succès ! 😀</h2>
				</div>
			) : (
				<label htmlFor="fileInput">
					<h2>📁 Glissez-déposez votre fichier CSV ou cliquez pour sélectionner</h2>
				</label>
			)}
		</div>
	);
}
