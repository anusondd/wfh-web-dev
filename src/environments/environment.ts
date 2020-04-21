// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // HOST_API : 'http://119.59.113.155:9090',
  HOST_API : 'http://localhost:9090',
  // HOST_API : 'http://61.19.208.245:9090',
  AUTH_USER: "parking",
  AUTH_PASSWORD: "11-30-2019",
  CODE:'01',
  NAME:'PKS-01',
  CODE_NAME:"PKS",
  firebaseConfig: {
    apiKey: "AIzaSyAeFzMOM8J437ixF7Xggkd8t2hH_rPqCiQ",
    authDomain: "wfh-from.firebaseapp.com",
    databaseURL: "https://wfh-from.firebaseio.com",
    projectId: "wfh-from",
    storageBucket: "wfh-from.appspot.com",
    messagingSenderId: "434775202810",
    appId: "1:434775202810:web:5760c831eb3c4376036243",
    measurementId: "G-FSRVTHQD4T"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
