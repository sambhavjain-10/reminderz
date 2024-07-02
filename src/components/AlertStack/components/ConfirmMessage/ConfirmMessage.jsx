import styles from "./ConfirmMessage.module.scss";

//component
import { Caution, Close, Tick } from "@icons";

const ConfirmMessage = ({ message, remove, acceptFunc }) => {
	const handleClose = e => {
		e.preventDefault();
		setTimeout(() => remove(), 100);
	};

	return (
		<div className={`${styles.errorBox} ${styles.isActive}`}>
			<div className={styles.errorText}>
				<Caution color="white" />
				{message?.split("\n").map(line => (
					<>
						{line} <br />
					</>
				))}
			</div>
			<div className={styles.buttons}>
				<div
					className={styles.yes}
					onClick={e => {
						acceptFunc();
						handleClose(e);
					}}
				>
					<Tick />
				</div>
				<div
					className={styles.no}
					onClick={e => {
						handleClose(e);
					}}
				>
					<Close />
				</div>
			</div>
		</div>
	);
};

export default ConfirmMessage;
