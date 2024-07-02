/* eslint-disable no-console */
import { TriangleArrow } from "@icons";
import ReactSelect, { components } from "react-select";
import "./Select.scss";
import { themeStyles } from "./ThemeStyles";

/**
 * This component is used to render a Select Option Component.
 *
 * @component
 * @example
 * const [value, setValue] = useState("option 1")
 *
 * return (
 * 	<Select
 *  	options={{
 *      option_1: "Option 1",
 *      option_2: "Option 2",
 *      option_3: "Option 3"
 *    }}
 *		value={value}
 *		setValue={setValue}
 *	/>
 * )
 */

const Select = ({
	options,
	value,
	setValue,
	theme = "rounded",
	width,
	height,
	borderRadius,
	borderColor,
	iconIsRotatable = "true",
	border,
	background,
	placeholder,
	menuOnTop,
	disabled,
	icon,
	isSearchable,
	isClearable,
	name,
	numberOfOptionsVisible = "5",
	...rest
}) => {
	const { roundedStyles } = themeStyles({
		width,
		height,
		menuOnTop,
		borderRadius,
		borderColor,
		border,
		background,
		iconIsRotatable,
		numberOfOptionsVisible,
		rest,
	});
	const setSelected = selected => {
		if (rest.isMulti && typeof value === "object" && !Array.isArray(value)) {
			setValue(prev => ({
				...prev,
				[name]: selected?.map(opt => opt.value),
			}));
		} else if (rest.isMulti) {
			setValue(selected?.map(opt => opt.value));
		} else if (name !== null) {
			setValue(prev => ({ ...prev, [name]: selected?.value }));
			console.log(value);
		} else {
			setValue(selected?.value);
		}
	};

	let selectedOption;
	if (!Array.isArray(options)) {
		options = Object.keys(options ?? {})?.map(op => ({
			label: options[op],
			value: op,
		}));

		options?.forEach(option => {
			const val = name ? value[name] : value;
			if (option.value === val) selectedOption = option;
		});
	} else if (rest.isMulti && typeof value === "object" && !Array.isArray(value)) {
		selectedOption = value[name]?.map(val => options.find(option => option.value === val));
	} else if (rest.isMulti) {
		selectedOption = value?.map(val => options.find(option => option.value === val));
	} else {
		options?.forEach(option => {
			const val = name ? value[name] : value;
			if (option.value === val) selectedOption = option;
		});
	}
	const DropdownIndicator = props => {
		return <components.DropdownIndicator {...props}>{icon ? icon : <TriangleArrow color="#000" />}</components.DropdownIndicator>;
	};
	// const LoadingIndicator = (props) => {
	// 	return <Spinner {...props} color={Colors.blueShade1} />;
	// };
	return (
		<ReactSelect
			options={options}
			value={selectedOption}
			onChange={setSelected}
			components={{ DropdownIndicator }}
			styles={roundedStyles}
			placeholder={placeholder}
			isSearchable={isSearchable}
			isClearable={isClearable}
			isDisabled={disabled}
			classNamePrefix="prospectjet-select"
			// menuIsOpen={true}
			{...rest}
		/>
	);
};

Select.defaultProps = {
	theme: "rounded",
	width: "100%",
	height: "40px",
	menuOnTop: false,
	disabled: false,
	isSearchable: false,
	name: null,
};

export default Select;
