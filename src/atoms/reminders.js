import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "reminders",
});

const reminders = atom({
	key: "reminders",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export default reminders;
