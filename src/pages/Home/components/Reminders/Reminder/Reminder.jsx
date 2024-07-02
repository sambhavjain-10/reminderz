import { Input, Select, Toggle } from "@components";
import { Delete, TriangleArrow } from "@icons";
import { InputThemes } from "@themes";
import moment from "moment";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import InputDateTime from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import InputTime from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import styles from "./Reminder.module.scss";

const FREQUENCY_OPTIONS = {
	mins: "Minutes",
	hours: "Hours",
	days: "Days",
};

const ConvertFromMinutes = mins => {
	let h = Math.floor(mins / 60);
	let d = Math.floor(h / 24);
	h = h - d * 24;
	let m = Math.floor(mins % 60);
	if (mins % 1440 === 0) return { time: d, duration: "days" };
	else if (mins % 60 === 0) return { time: h, duration: "hours" };
	return { time: m, duration: "mins" };
};

const convertToMinutes = (t, d) => {
	if (d === "mins") return t;
	else if (d === "hours") return t * 60;
	return t * 1440;
};

const Reminder = ({ data }) => {
	const [collapse, setCollapse] = useState(data.isNew);
	const [name, setName] = useState(data.name);
	const [repitativeMode, setRepitativeMode] = useState(Boolean(data.periodInMinutes));
	const [time, setTime] = useState(new Date(data.scheduledTime));
	const [frequencyTime, setFrequencyTime] = useState(0);
	const [frequencyDuration, setFrequencyDuration] = useState("mins");

	const onDelete = name => chrome?.alarms.clear(name);

	const onSave = () => {
		const periodInMinutes = parseInt(convertToMinutes(frequencyTime, frequencyDuration));
		const when = repitativeMode ? moment(time, "HH:mm").format("x") : moment(time).format("x");
		chrome?.alarms.create(name, { when: +when, ...(repitativeMode && { periodInMinutes }) }, () => setCollapse(false));
	};

	useEffect(() => {
		const { time: initialTime, duration: initialDuration } = ConvertFromMinutes(data.periodInMinutes ?? 0);
		setFrequencyTime(initialTime);
		setFrequencyDuration(initialDuration);
	}, []);

	return (
		<div className={`${styles.container} ${collapse && styles.expanded}`}>
			<div className={styles.header} onClick={() => setCollapse(prev => !prev)}>
				<div className={styles.text} onClick={e => e.stopPropagation()}>
					{collapse ? (
						<Input
							theme={InputThemes.TRANSPARENT}
							value={name}
							setValue={setName}
							onKeyDown={e => e.key === "Enter" && !e.shiftKey && onEditBlur()}
							autoFocus
						/>
					) : (
						<span>{name}</span>
					)}
				</div>
				<div className={styles.right}>
					{data.scheduledTime && !collapse && <span>Next {moment(data.scheduledTime).fromNow()}</span>}
					<button className={`${styles.arrow} ${collapse && styles.arrowDown}`}>
						<TriangleArrow />
					</button>
				</div>
			</div>
			{collapse && (
				<div className={styles.body}>
					<div className={styles.toggle}>
						One time <Toggle checked={repitativeMode} onChange={() => setRepitativeMode(prev => !prev)} /> Repetitive
					</div>
					{repitativeMode ? (
						<>
							<InputTime value={time} onChange={val => setTime(val)} />
							<br />
							<br />
							<label>Frequency:</label>
							<br />
							<Input value={frequencyTime} setValue={setFrequencyTime} theme={InputThemes.PRIMARY} placeholder="Type here" />
							<br />
							<Select value={frequencyDuration} setValue={setFrequencyDuration} options={FREQUENCY_OPTIONS} />{" "}
						</>
					) : (
						<InputDateTime value={time} onChange={val => setTime(val)} />
					)}
					<div className={styles.buttons}>
						<button className={styles.deleteBtn} onClick={() => onDelete(data.name)}>
							<Delete size="1.2rem" /> Delete
						</button>
						<button className={styles.saveBtn} onClick={onSave}>
							Save
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Reminder;
