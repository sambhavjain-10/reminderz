const { readdirSync } = require("fs");
const { isSVG, removeExtension } = require("./utils.cjs");
const { generateWebIconMap, generateIconComponentFile } = require("./generators.cjs");

//These paths are from root

const ICON_SOURCE_FOLDER = "src/icons/assets";
const ICON_OUTPUT_FOLDER = "src/icons/Icon";

const icons = readdirSync(ICON_SOURCE_FOLDER).filter(isSVG).map(removeExtension);

try {
	generateIconComponentFile(icons, { dir: ICON_OUTPUT_FOLDER });
	generateWebIconMap(icons, { dir: ICON_SOURCE_FOLDER });
} catch (e) {
	console.error(e);
}
