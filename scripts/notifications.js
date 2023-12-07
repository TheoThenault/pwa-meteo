export { call_notification, requestPermission, nonPersistentNotification, persistentNotification }

function call_notification(title, message)
{
    requestPermission()
    
    var success = nonPersistentNotification(title, message)
    
    if(!success)
    {
      success = persistentNotification(title, message)
      if(!success)
      {
        alert("Erreur de notifications");
      }
    }
}


function requestPermission() {
    if (!('Notification' in window)) {
        console.log('Notification API not supported!');
        return;
    }

    Notification.requestPermission(function (result) {
        console.log("Notificaition API: " + result);
    });
}


function nonPersistentNotification(title, message) {
    if (!('Notification' in window)) {
      console.log('Notification API not supported!');
        return false;
    }

    try {
        var notification = new Notification(title);
    } catch (err) {
        console.log('Notification API error: ' + err);
        return false;
    }
}

function persistentNotification(title, message) {
    console.log("persistent notifs");
    if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
      console.log('Persistent Notification API not supported!');
      return false;
    }
    
    try {
        console.log("try");
        navigator.serviceWorker.ready.then((registration) => {
            console.log("serviceworker.ready");
            registration.showNotification(title, {
                body: message
            });
        });

        // console.log("try 2");
        // navigator.serviceWorker.getRegistration()
        //     .then((reg) => reg.showNotification("Hi there - persistent!"))
        //     .catch((err) => alert('Service Worker registration error: ' + err));
    } catch (err) {
      console.log('Notification API error: ' + err);
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