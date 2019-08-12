import { urlBase64ToUint8Array } from './helper';
import config from '../config';

const subscribeNotification = async () => {
  const registration = await navigator.serviceWorker.register('../service-worker.js', { scope: '/' });

  console.log('Service Worker registered successfully.');
  console.log('Registering push');

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(config.WEB_PUSH_PUBLIC_VAPID_KEY)
  });

  console.log('Registered push');
  console.log('Sending push');

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });

  console.log('Sent push');
};

export {
  subscribeNotification
};
