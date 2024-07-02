import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "active",
});

const active = atom({
	key: "active",
	default: {
		page: "home",
		category: "",
		search: "",
	},
	effects_UNSTABLE: [persistAtom],
});

export default active;
