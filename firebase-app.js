import {  PolymerElement } from '@polymer/polymer/polymer-element.js';
  
import { firebase } from '@firebase/app';

import './firebase-app-script.js';
import './firebase-database-script.js';
import './firebase-auth-script.js';
import './firebase-storage-script.js';
import './firebase-messaging-script.js';


/**
 * The firebase-app element is used for initializing and configuring your
 * connection to firebase. It is permanently initialized once attached and
 * should not be dynamically bound.
 */
  class FirebaseApp extends PolymerElement {
    static get is() { return 'firebase-app'; }
    // static get template () {
    //   // Template getter must return an instance of HTMLTemplateElement.
    //   // The html helper function makes this easy.
    //   return html `
    //
    //   `;
    // }

    static get  properties () {
      return {
        /**
         * The name of your app. Optional.
         *
         * You can use this with the `appName` property of other Polymerfire elements
         * in order to use multiple firebase configurations on a page at once.
         * In that case the name is used as a key to lookup the configuration.
         */
        name: {
          type: String,
          value: ''
        },

        /**
         * Your API key.
         *
         * Get this from the Auth > Web Setup panel of the new
         * Firebase Console at https://console.firebase.google.com
         *
         * It looks like this: 'AIzaSyDTP-eiQezleFsV2WddFBAhF_WEzx_8v_g'
         */
        apiKey: {
          type: String
        },

        /**
         * The domain name to authenticate with.
         *
         * The same as your Firebase Hosting subdomain or custom domain.
         * Available on the Firebase Console.
         *
         * For example: 'polymerfire-test.firebaseapp.com'
         */
        authDomain: {
          type: String
        },

        /**
         * The URL of your Firebase Realtime Database. You can find this
         * URL in the Database panel of the Firebase Console.
         * Available on the Firebase Console.
         *
         * For example: 'https://polymerfire-test.firebaseio.com/'
         */
        databaseUrl: {
          type: String
        },

        /**
         * The Firebase Storage bucket for your project. You can find this
         * in the Firebase Console under "Web Setup".
         *
         * For example: `polymerfire-test.appspot.com`
         */
        storageBucket: {
          type: String,
          value: null
        },

        /**
         * The Firebase Cloud Messaging Sender ID for your project. You can find
         * this in the Firebase Console under "Web Setup".
         */
        messagingSenderId: {
          type: String,
          value: null
        },

        /**
         * The Firebase app object constructed from the other fields of
         * this element.
         * @type {firebase.app.App}
         */
        app: {
          type: Object,
          notify: true,
          computed: '__computeApp(name, apiKey, authDomain, databaseUrl, storageBucket, messagingSenderId)'
          }
    }
  }

  __computeApp(name, apiKey, authDomain, databaseUrl, storageBucket, messagingSenderId) {
    if (apiKey && authDomain && databaseUrl) {
      var init = [{
        apiKey: apiKey,
        authDomain: authDomain,
        databaseURL: databaseUrl,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId
      }];

      if (name) {
        init.push(name);
      }
      console.debug(firebase);
      firebase.initializeApp.apply(firebase, init);
      this.dispatchEvent(new CustomEvent("firebase-app-initialized",{composed : true,bubbles: true}));
      //this.fire('firebase-app-initialized');
    } else {
      return null;
    }

    return firebase.app(name);
  }
}

// Register the element with the browser.
customElements.define('firebase-app', FirebaseApp);
