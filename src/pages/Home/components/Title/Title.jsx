import { activeAtom, settingsAtom } from "@atoms";
import { Input } from "@components";
import { InputThemes } from "@themes";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "./Title.module.scss";
import { Settings } from "@icons";
import { PAGES } from "@constants";

const Title = () => {
	const titleRef = useRef(null);
	const [active, setActive] = useRecoilState(activeAtom);
	const [settings, setSettings] = useRecoilState(settingsAtom);
	const [editTitle, setEditTitle] = useState(false);

	useEffect(() => {
		if (editTitle) titleRef.current.focus();
	}, [editTitle]);

	const onLinkClick = page => {
		setActive(prev => ({ ...prev, page }));
	};

	return (
		<div className={styles.title}>
			{editTitle ? (
				<Input
					value={settings.title}
					setValue={value => setSettings(prev => ({ ...prev, title: value }))}
					onBlur={() => setEditTitle(false)}
					onKeyDown={e => e.key === "Enter" && setEditTitle(false)}
					height="fit-content"
					theme={InputThemes.TRANSPARENT}
					ref={titleRef}
				/>
			) : (
				<span title="Double click to edit" onDoubleClick={() => setEditTitle(true)}>
					{settings.title}
				</span>
			)}
			<button
				onClick={() => onLinkClick(PAGES.SETTINGS)}
				className={`${styles.settingsBtn} ${active.page === PAGES.SETTINGS ? styles.active : ""}`}
			>
				<Settings />
			</button>
		</div>
	);
};

export default Title;
