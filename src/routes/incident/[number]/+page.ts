import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { number } = params;
	return { number };
};
