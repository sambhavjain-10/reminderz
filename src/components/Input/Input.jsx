import { forwardRef } from "react";
import styles from "./Input.module.scss";

/**
 * This component is used to take input from user.
 *
 * @param props.setValue - It will set the current input value into the state object key which is same as the name of input
 *
 * @component
 * @example
 * const [input, setInput] = useState({name: ""})
 * return (
 *   <Input name="name" value={input} setValue={setInput} />
 * )
 * @example
 * const [input, setInput] = useState("")
 * return (
 *   <Input value={input} setValue={setInput} />
 * )
 */

const Input = forwardRef(
	({ type, value, setValue, name, width = "100%", height = "40px", className, theme = "WHITE", disabled, ...rest }, ref) => {
		const checkObject = typeof value === "object" && !Array.isArray(value) && value !== null;

		const onChange = e => {
			let value = e.target.value;
			if (checkObject) {
				setValue(prevState => {
					return {
						...prevState,
						[name]: value,
					};
				});
			} else {
				setValue(value);
			}
		};

		const getValue = () => {
			if (checkObject) return value[name] || "";
			else return value || "";
		};

		switch (type) {
			case "textarea":
				return (
					<textarea
						value={getValue()}
						onChange={onChange}
						style={{ width, height }}
						name={name}
						disabled={disabled}
						className={`${styles.input} ${styles.textarea} ${styles[theme]} ${className ?? ""}`}
						ref={ref}
						{...rest}
					/>
				);
			default:
				return (
					<input
						value={getValue()}
						onChange={onChange}
						style={{ width, height }}
						name={name}
						type={type}
						disabled={disabled}
						className={`${styles.input} ${styles[theme]} ${className ?? ""}`}
						ref={ref}
						{...rest}
					/>
				);
		}
	}
);

export default Input;
