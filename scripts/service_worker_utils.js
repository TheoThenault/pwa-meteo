export {getAServiceWorker, createServiceWorker, registerHourlyCheck}

function getAServiceWorker()
{
    // Checks if a service worker exists, if not creates one
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(registration) {
            if (registration.active) {
            console.log('Service Worker is registered and active.');
            } else {
            console.log('Service Worker is registered but not active.');
            }
        }).catch(function(error) {
            console.error('Error during service worker registration:', error);
            createServiceWorker();
        });
    } else {
        console.log('Service Worker is not supported in this browser.');
    }
}

function createServiceWorker()
{
    // Starts a service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service_worker.js', { scope: "./", type: "module" })
          .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(function(error) {
            console.error('Service Worker registration failed:', error);
          });
    }
}

async function registerHourlyCheck() {
    if ('serviceWorker' in navigator) {

        const status = await navigator.permissions.query({
            name: 'periodic-background-sync',
        });
        if (status.state === 'granted') {
            console.log("Periodic background sync can be used.")
        } else {
            console.log("Periodic background sync cannot be used.")
        }
          
        navigator.serviceWorker.ready.then(async registration => {
            try {
              await registration.periodicSync.register('custom-periodic-sync', { minInterval: 30 * 1000 });
              console.log('Periodic background sync registered.');
            } catch (err) {
              console.error(err.name, err.message);
            }
        });
          

        // navigator.serviceWorker.ready.then((registration) => {
        //     registration.periodicSync.register("custom-periodic-sync", {minInterval: 2 * 60 * 1000}).then((result) => 
        //     {
        //         console.log("periodic sync registered")
        //         console.log(result)
        //     })
        // }).catch((reason) => {
        //     console.log("Periodic Sync could not be registered!");
        //     console.log(reason)
        // });
    }
}
  