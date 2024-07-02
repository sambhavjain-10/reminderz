import Reminder from "./Reminder/Reminder";
import styles from "./Reminders.module.scss";

const Reminders = ({ reminders, refreshReminders }) => {
	return (
		<div className={styles.container}>
			{reminders.map(rem => (
				<Reminder key={rem.name} data={rem} refreshReminders={refreshReminders} />
			))}
		</div>
	);
};

export default Reminders;
