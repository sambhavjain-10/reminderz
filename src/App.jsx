/* eslint-disable no-undef */
import { activeAtom, settingsAtom } from "@atoms";
import { PAGES } from "@constants";
import { useRecoilValue } from "recoil";
import styles from "./App.module.scss";
import { AlertProvider } from "./contexts";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import AlertStack from "./components/AlertStack/AlertStack";

const App = () => {
	const page = useRecoilValue(activeAtom).page;
	const settings = useRecoilValue(settingsAtom);

	const renderPage = () => {
		switch (page) {
			case PAGES.HOME:
				return <Home />;
			case PAGES.SETTINGS:
				return <Settings />;
			default:
				return <Home />;
		}
	};

	return (
		<AlertProvider>
			<AlertStack />
			<div
				className={styles.container}
				style={{
					width: settings.width,
					height: settings.height,
				}}
			>
				{renderPage()}
			</div>
		</AlertProvider>
	);
};

export default App;
