import { Tick } from "@icons";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ name, checked, size = 20, style, onChange, className, ...rest }) => {
	return (
		<label
			className={`${styles.checkbox} ${className ?? ""}`}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				...style,
			}}
		>
			<input
				type="checkbox"
				name={name}
				checked={checked}
				onClick={() => {
					onChange(!checked);
				}}
				onChange={() => null}
				{...rest}
				style={{
					width: `${size}px`,
					height: `${size}px`,

					...style,
				}}
			/>
			<span className={`${styles.checkmark}`}>
				<Tick size="1rem" />
			</span>
		</label>
	);
};

export default Checkbox;
