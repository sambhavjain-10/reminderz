import { useContext } from "react";

import { AlertContext } from "@contexts";

//components
import ConfirmMessage from "./components/ConfirmMessage/ConfirmMessage";

import styles from "./AlertStack.module.scss";

const AlertStack = () => {
	const {
		// errorsArray,
		// removeError,
		// successArray,
		// removeSuccess,
		// warningsArray,
		// removeWarning,
		confirmMessage,
		removeConfirmMessage,
	} = useContext(AlertContext);
	return (
		<div className={styles.errorStack}>
			{/* {errorsArray?.map(error => (
				<Error error={error} remove={() => removeError(error.id)} key={error.id} />
			))}
			{successArray?.map(success => (
				<Success success={success} remove={() => removeSuccess(success.id)} key={success.id} />
			))}
			{warningsArray?.map(warning => (
				<Warning warning={warning} remove={() => removeWarning(warning.id)} key={warning.id} />
			))} */}
			{confirmMessage && (
				<ConfirmMessage
					message={confirmMessage.msg}
					acceptFunc={confirmMessage.acceptFunc}
					type={confirmMessage.type}
					remove={() => removeConfirmMessage()}
				/>
			)}
		</div>
	);
};

export default AlertStack;
