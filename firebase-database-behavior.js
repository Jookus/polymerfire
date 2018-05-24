/**
@license
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file or at
https://github.com/firebase/polymerfire/blob/master/LICENSE
*/
// import {Polymer, AppStorageBehavior} from '../@polymer/polymer/lib/legacy/polymer-fn.js';
import {PolymerElement} from '../@polymer/polymer/polymer-element.js';
import { AppStorageBehavior } from '../@polymer/app-storage/app-storage-behavior.js';
import { firebase } from '../@firebase/app';

// import { Deferred } from '@firebase/util';
import './firebase-common-behavior.js';
import './firebase-database-script.js';

/** @polymerBehavior Polymer.FirebaseDatabaseBehavior */


// Polymer.FirebaseDatabaseBehaviorImpl = {

 class FirebaseDatabaseBehavior extends PolymerElement {
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

    db: {
      type: Object,
      computed: '__computeDb(app)'
    },

    ref: {
      type: Object,
      computed: '__computeRef(db, path, disabled)',
      observer: '__refChanged'
    },

    /**
     * Path to a Firebase root or endpoint. N.B. `path` is case sensitive.
     * @type {string|null}
     */
    path: {
      type: String,
      value: null,
      observer: '__pathChanged'
    },

    /**
     * When true, Firebase listeners won't be activated. This can be useful
     * in situations where elements are loaded into the DOM before they're
     * ready to be activated (e.g. navigation, initialization scenarios).
     */
      disabled: {
        type: Boolean,
        value: false
      }
    }
  }
  static get observers() {
    return    [
    '__onlineChanged(online)'
  ];
}

  /**
   * Set the firebase value.
   * @return {!firebase.Promise<void>}
   */
  _setFirebaseValue(path, value) {
    _log('Setting Firebase value at', path, 'to', value)
    var key = value && value.$key;
    var leaf = value && value.hasOwnProperty('$val');
    if (key) {
      value.$key = null;
    }
    var result = db.ref(path).set(leaf ? value.$val : value);
    if (key) {
      value.$key = key;
    }
    return result;
  }

  __computeDb(app) {
    return app ? app.database() : null;
  }

  __computeRef(db, path) {
    if (db == null ||
        path == null ||
        !__pathReady(path) ||
        disabled) {
      return null;
    }

    return db.ref(path);
  }


  __refChanged(ref, oldRef){
    return;
  }


  __pathChanged(path, oldPath) {

    if (
      !disabled && !isEmpty(data)
    ) {
      syncToMemory(function() {
        data = zeroValue;
        __needSetData = true;
      });
    }
  }

  __pathReady(path) {
    return path && path.split('/').slice(1).indexOf('') < 0;
  }

  __onlineChanged(online) {
    if (!ref) {
      return;
    }

    if (online) {
      db.goOnline();
    } else {
      db.goOffline();
    }
  }
}




// /** @polymerBehavior */
// Polymer.FirebaseDatabaseBehavior = [
//   Polymer.AppStorageBehavior,
//   Polymer.FirebaseCommonBehavior,
//   Polymer.FirebaseDatabaseBehaviorImpl
// ];
