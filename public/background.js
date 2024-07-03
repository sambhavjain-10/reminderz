/* eslint-disable no-undef */

async function playNotif(source = "notif_1.wav", volume = 1) {
	console.log("func", source, volume);
	await createOffscreen();
	await chrome.runtime.sendMessage({ play: { source, volume } });
}

// Create the offscreen document if it doesn't already exist
async function createOffscreen() {
	if (await chrome.offscreen.hasDocument()) return;
	await chrome.offscreen.createDocument({
		url: "offscreen.html",
		reasons: ["AUDIO_PLAYBACK"],
		justification: "testing", // details for using the API
	});
}

chrome.alarms.onAlarm.addListener(alarm => {
	chrome.storage.local.get(["notif_source", "notif_volume"]).then(result => {
		console.log("result", result);
		chrome.notifications.create({
			type: "basic",
			iconUrl: "logo.png",
			title: alarm.name,
			message: "Time to check your reminders!",
			priority: 2,
			requireInteraction: true,
		});
		playNotif(result.notif_source, result.notif_volume);
	});
});

// const STORAGE_KEY = "user-preference-alarm-enabled";

// async function checkAlarmState() {
//   const { alarmEnabled } = await chrome.storage.get(STORAGE_KEY);

//   if (alarmEnabled) {
//     const alarm = await chrome.alarms.get("my-alarm");

//     if (!alarm) {
//       await chrome.alarms.create({ periodInMinutes: 1 });
//     }
//   }
// }

// checkAlarmState();
