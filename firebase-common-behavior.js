/**
@license
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file or at
https://github.com/firebase/polymerfire/blob/master/LICENSE
*/
import {  PolymerElement } from '../@polymer/polymer/polymer-element.js';

import './firebase-app-script.js';

import { AppNetworkStatusBehavior } from '@polymer/app-storage/app-network-status-behavior.js';

import {Polymer} from '../@polymer/polymer/lib/legacy/polymer-fn.js';

/** @polymerBehavior Polymer.FirebaseCommonBehavior */
export const FirebaseCommonBehaviorImpl = {
  properties: {


    /**
    * @type {!firebase.app.App|undefined}
    */
    app: {
      type: Object,
      notify: true,
      observer: '__appChanged'
    },

    appName: {
      type: String,
      notify: true,
      value: '',
      observer: '__appNameChanged'
    }
  },

  __appNameChanged: function(appName) {
    if (this.app && this.app.name === appName) {
      return;
    }

    try {
      if (appName == null) {
        this.app = firebase.app();
      } else {
        this.app = firebase.app(appName);
      }
    } catch (e) {
      // appropriate app hasn't been initialized yet
      var self = this;
      window.addEventListener('firebase-app-initialized',
          function onFirebaseAppInitialized(event) {
            console.debug("iniiited");
            window.removeEventListener(
                'firebase-app-initialized', onFirebaseAppInitialized);
            self.__appNameChanged(self.appName);
          });
    }
  },

  __appChanged: function(app) {
    if (app && app.name === this.appName) {
      return;
    }

    this.appName = app ? app.name : '';
  },

  __onError: function(err) {
    this.fire('error', err);
  }
};

/** @polymerBehavior */
export const FirebaseCommonBehavior = [
  AppNetworkStatusBehavior,
  FirebaseCommonBehaviorImpl
];
