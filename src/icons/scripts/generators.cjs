const { toPascalCase } = require("./utils.cjs");
const { writeFileSync } = require("fs");

const generateIconComponentFile = (icons, { dir }) => {
	const indexContent = [
		"import Icon from './Icon';",
		"",
		icons.map(icon => `export const ${toPascalCase(icon)} = props => <Icon {...props} name="${icon}" />;`).join("\n"),
	].join("\n");

	writeFileSync(`${dir}/index.jsx`, indexContent);
	console.log("Icon component file created! ✅");
};

const generateWebIconMap = (icons, { dir }) => {
	const iconMapContent = [
		icons.map(icon => `import { ReactComponent as ${toPascalCase(icon)} } from './${icon}.svg';`).join("\n"),
		"",
		"export default {",
		icons.map(icon => `"${icon}": ${toPascalCase(icon)}, `).join("\n"),
		"};",
	].join("\n");

	writeFileSync(`${dir}/icon-map.js`, iconMapContent);
	console.log("Web Icon Map created! ✅");
};

module.exports = {
	generateIconComponentFile,
	generateWebIconMap,
};
