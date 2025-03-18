import fsExtra from 'fs-extra';
import { join } from 'path';

const initTests = async () => {
	let hasFile = false;
	try {
		await fsExtra.readFile(join('..', '.upptimerc.yml'));
		hasFile = true;
	} catch (error) {}
	if (!hasFile) await fsExtra.copyFile(join('.', '.upptimerc.yml'), join('..', '.upptimerc.yml'));
};
initTests();
