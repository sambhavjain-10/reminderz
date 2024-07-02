import { InputThemes } from "@themes";
import { forwardRef } from "react";
import styles from "../Input.module.scss";

const InputSingle = (
	{ type, value, setValue, name, width = "100%", height = "40px", className, theme = "PRIMARY", style, ...rest },
	ref
) => {
	const onChange = e => setValue(e.target.value);

	switch (type) {
		case "textarea":
			return (
				<textarea
					value={value}
					onChange={onChange}
					style={{ width, height, ...style }}
					name={name}
					className={`${styles.input} ${styles[InputThemes[theme.toUpperCase()]]} ${className ?? ""}`}
					ref={ref}
					{...rest}
				/>
			);
		default:
			return (
				<input
					value={value}
					onChange={onChange}
					name={name}
					style={{ width, height, ...style }}
					type={type}
					className={`${styles.input} ${styles[InputThemes[theme.toUpperCase()]]} ${className ?? ""}`}
					ref={ref}
					{...rest}
				/>
			);
	}
};

export default forwardRef(InputSingle);
