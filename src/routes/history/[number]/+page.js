export function load({ params }) {
	const { number } = params;
	return { slug: number };
}
