import { Plus } from "@icons";
import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Reminders from "./components/Reminders/Reminders";
import Title from "./components/Title/Title";

const defaultReminder = () => ({
	name: "Reminder",
	scheduledTime: new Date().getTime(),
	isNew: true,
});

const Home = () => {
	const [reminders, setReminders] = useState([]);

	const onAddReminder = () => {
		setReminders(prev => [defaultReminder(), ...prev]);
	};

	useEffect(() => {
		chrome?.alarms?.getAll(alarms => {
			console.log(alarms);
			setReminders(alarms);
		});
	}, []);

	return (
		<>
			<Title />
			<Reminders reminders={reminders} />
			<button onClick={onAddReminder} className={styles.addBtn}>
				<Plus />
			</button>
		</>
	);
};

export default Home;
