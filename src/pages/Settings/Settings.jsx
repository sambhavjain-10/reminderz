import { activeAtom, settingsAtom } from "@atoms";
import { PAGES } from "@constants";
import { useSetRecoilState, useRecoilState } from "recoil";
import styles from "./Settings.module.scss";
import { SketchPicker } from "react-color";
import { useRef, useState } from "react";
import { Close, Tick } from "@icons";

const NOTIF_SOUNDS = ["notif_1.wav", "notif_2.wav", "notif_3.mp3", "notif_4.mp3"];

const THEMES = [
	{
		name: "t_0",
		background: "white",
		primaryColor: "black",
	},
	{
		name: "t_1",
		background: "linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%)",
		primaryColor: "black",
	},
	{
		name: "t_2",
		background: "linear-gradient(160deg, #0093e9 0%, #80d0c7 100%)",
		primaryColor: "white",
	},
];

const Settings = () => {
	const setActive = useSetRecoilState(activeAtom);
	const [savedSettings, setSavedSettings] = useRecoilState(settingsAtom);
	const audioRef = useRef(null);

	//settings
	const [settings, setSettings] = useState(savedSettings);

	//size
	const handleSizeChange = (e, type) => {
		setSettings(prev => ({
			...prev,
			[type]: 300 + (e.target.value / 100) * (type === "height" ? 300 : 500),
		}));
	};

	//theme
	const handleTheme = theme => {
		setSettings(prev => ({
			...prev,
			theme: {
				...prev.theme,
				...theme,
			},
		}));
	};

	const handleNotifChange = sound => {
		audioRef.current.src = sound;
		audioRef.current.play();
		chrome.storage.local.set({ notif_source: sound, notif_volume: 1 }).then(() => {
			setSettings(prev => ({
				...prev,
				notif: sound,
			}));
		});
	};

	//saved settings
	const handleSaveSettings = () => {
		setSavedSettings(settings);
		onClose();
	};

	const onClose = () => {
		setActive(prev => ({ ...prev, page: PAGES.HOME }));
	};

	return (
		<div className={styles.settings}>
			<div className={styles.header}>
				<h4>Settings</h4>
				<button onClick={onClose} className={styles.closeBtn}>
					<Close />
				</button>
			</div>
			<div className={styles.options}>
				<div>
					<span>Height: </span>
					<input
						type="range"
						value={((settings.height - 300) / 300) * 100}
						max={100}
						min={0}
						onChange={e => handleSizeChange(e, "height")}
					/>
				</div>
				<div>
					<span>Width: </span>
					<input
						type="range"
						value={((settings.width - 300) / 500) * 100}
						max={100}
						min={0}
						onChange={e => handleSizeChange(e, "width")}
					/>
				</div>
				<div>
					<span>Notification Sound:</span>
					<div className={styles.sounds}>
						<audio ref={audioRef} hidden />
						{NOTIF_SOUNDS.map(sound => (
							<div key={sound} className={styles.sound} onClick={() => handleNotifChange(sound)}>
								{sound === settings.notif && <Tick />}
							</div>
						))}
					</div>
				</div>
				<div>
					<span>Theme:</span>
					<div className={styles.themes}>
						{THEMES.map(theme => (
							<div key={theme.name} className={`${styles[theme.name]}`} onClick={() => handleTheme(theme)}>
								{theme.name === settings?.theme?.name && <Tick />}
							</div>
						))}
					</div>
				</div>
			</div>
			<button className={styles.saveBtn} onClick={handleSaveSettings}>
				Save
			</button>
		</div>
	);
};

export default Settings;
