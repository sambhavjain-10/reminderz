import Reminder from "./Reminder/Reminder";
import styles from "./Reminders.module.scss";

const Reminders = ({ reminders }) => {
	return (
		<div className={styles.container}>
			{reminders.map(rem => (
				<Reminder key={rem.name} data={rem} />
			))}
		</div>
	);
};

export default Reminders;
