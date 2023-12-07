export {getAServiceWorker, createServiceWorker}

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
        navigator.serviceWorker.register('../service_worker.js', { scope: "./" })
          .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(function(error) {
            console.error('Service Worker registration failed:', error);
          });
    }
}
