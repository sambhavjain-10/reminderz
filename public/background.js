/* eslint-disable no-undef */

async function playNotif(source = "notif.wav", volume = 1) {
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
	chrome.notifications.create({
		type: "basic",
		iconUrl: "logo.png",
		title: alarm.name,
		message: "Time to check your reminders!",
		priority: 2,
		requireInteraction: true,
		silent: false,
	});
	playNotif();
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
