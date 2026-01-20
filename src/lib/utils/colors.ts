export function generateRandomColor(): string {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function getContrastColor(hexcolor: string): string {
	const r = parseInt(hexcolor.substr(1, 2), 16);
	const g = parseInt(hexcolor.substr(3, 2), 16);
	const b = parseInt(hexcolor.substr(5, 2), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? '#000000' : '#FFFFFF';
}
