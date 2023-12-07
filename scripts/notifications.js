export { call_notification, requestPermission, nonPersistentNotification, persistentNotification }

function call_notification(title, message)
{
    requestPermission()
    nonPersistentNotification()
    //persistentNotification()
}

function requestPermission() {
    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }

    Notification.requestPermission(function (result) {
        console.log("Notificaition API: " + result);
    });
}


function nonPersistentNotification() {
    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }

    try {
        var notification = new Notification("Hi there - non-persistent!");
    } catch (err) {
        alert('Notification API error: ' + err);
    }
}

function persistentNotification() {
    console.log("persistent notifs");
    if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
      alert('Persistent Notification API not supported!');
      return;
    }
    
    try {
        console.log("try");
        navigator.serviceWorker.ready.then((registration) => {
            console.log("serviceworker.ready");
            registration.showNotification("Vibration Sample", {
                body: "Buzz! Buzz!",
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: "vibration-sample",
            });
        });
      navigator.serviceWorker.getRegistration()
        .then((reg) => reg.showNotification("Hi there - persistent!"))
        .catch((err) => alert('Service Worker registration error: ' + err));
    } catch (err) {
      alert('Notification API error: ' + err);
    }
}
// ############################################################################
// ############################################################################
// Tests pour la page test_notifications



/***
 * 
 * 
 * var $status = document.getElementById('status');

if ('Notification' in window) {
  $status.innerText = Notification.permission;
}

function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    $status.innerText = result;
  });
}

function nonPersistentNotification() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  try {
    var notification = new Notification("Hi there - non-persistent!");
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}

function persistentNotification() {
  if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
    alert('Persistent Notification API not supported!');
    return;
  }
  
  try {
    navigator.serviceWorker.getRegistration()
      .then((reg) => reg.showNotification("Hi there - persistent!"))
      .catch((err) => alert('Service Worker registration error: ' + err));
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}
 * 
 * 
 * 
 */