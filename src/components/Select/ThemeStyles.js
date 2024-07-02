export const themeStyles = ({
	width,
	height,
	menuOnTop,
	borderRadius,
	borderColor,
	numberOfOptionsVisible,
	iconIsRotatable,
	border = true,
	background,
	...rest
}) => {
	const roundedStyles = {
		control: (provided, state) => ({
			...provided,
			border: border === true ? "1px solid #E1E2E7" : "none",
			borderRadius: borderRadius ?? "10px",
			height: height ?? "40px",
			minHeight: rest.isMulti ? "40px" : "32px",
			width: width ?? "100%",
			cursor: "pointer",
			background: background ? background : "white",
			boxShadow: "none",
			"&:hover": {
				boxShadow: "none",
			},
			"&:before": {
				color: "#aaa",
				lineHeight: "34px",
				// paddingLeft: "20px",
				position: "absolute",
			},
		}),
		dropdownIndicator: (current, { selectProps: { menuIsOpen } }) => ({
			...current,
			color: "#567191",
			transition: "0.5s",
			padding: " 0px 18.33px ",
			...(menuIsOpen &&
				iconIsRotatable && {
					transform: "rotate(180deg)",
				}),
		}),
		indicatorSeparator: provided => ({
			...provided,
			display: "none",
		}),
		singleValue: provided => ({
			...provided,
			fontSize: "1rem",
			fontWeight: "400",
			color: "#394759",
		}),
		menu: current => ({
			...current,
			zIndex: "2",
			borderRadius: "10px",
			width: width ?? "100%",
			overflowX: "hidden",
			boxShadow: "5px 5px 24px rgba(41, 43, 88, 0.12)",
			...(menuOnTop && { bottom: "40px", top: "unset" }),
		}),
		menuList: current => ({
			...current,
			padding: "10px",
			maxHeight: parseInt(numberOfOptionsVisible) > 0 ? `${parseInt(numberOfOptionsVisible) * 40 + 2 * 10}px` : "220px",
		}),
		option: (current, { isSelected, isFocused }) => ({
			...current,
			...(isSelected && {
				background: "#F0F8FE",
				color: "black",
				wordWrap: "break-word",
			}),
			...(isFocused && {
				background: "#F0F8FE",
				color: "#394759",
				fontWeight: isSelected ? "600" : "400",
				wordWrap: "break-word",
			}),
			borderRadius: "15px",
			fontWeight: isSelected ? "600" : "400",
			minHeight: "auto",
			justifyContent: "space-between",
			padding: "10px 15px",
			fontSize: "1rem",
			cursor: "pointer",
			wordWrap: "break-word",
		}),
	};

	return { roundedStyles };
};
