import { isProd } from '@/config';
import * as serviceWorker from '@/service-worker';

console.log('Hello BalmJS - https://balm.js.org/');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
isProd && serviceWorker.register();
