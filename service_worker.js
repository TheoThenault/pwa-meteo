import {call_notification} from "./scripts/notifications.js"

self.addEventListener("periodicsync", (event) => {
    if (event.tag === "custom-periodic-sync") {
      call_notification("InfoMétéo", new Date().getMinutes())
    }
});