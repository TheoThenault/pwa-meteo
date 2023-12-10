import {call_notification} from "./scripts/notifications.js"

self.addEventListener("periodicsync", (event) => {
    console.log("periodicsync")
    console.log(event)
    if (event.tag === "custom-periodic-sync") {
      //call_notification("InfoMétéo", new Date().getMinutes())
          try {
            var notification = new Notification("titre", {
              body: "message",
              icon: "../icons/logo-144.png"
            });
            return true;
        } catch (err) {
            console.log('Notification API error: ' + err);
            return false;
        }
    }
});