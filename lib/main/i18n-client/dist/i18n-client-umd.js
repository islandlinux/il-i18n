(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('sprintf-js'), require('i18next'), require('i18next-xhr-backend')) :
  typeof define === 'function' && define.amd ? define(['sprintf-js', 'i18next', 'i18next-xhr-backend'], factory) :
  (global.i18nClient = factory(global.vsprintf,global.i18next,global.i18nextXHRBackend));
}(this, (function (vsprintf,i18next,i18nextXHRBackend) { 'use strict';

  vsprintf = vsprintf && vsprintf.hasOwnProperty('default') ? vsprintf['default'] : vsprintf;
  i18next = i18next && i18next.hasOwnProperty('default') ? i18next['default'] : i18next;
  i18nextXHRBackend = i18nextXHRBackend && i18nextXHRBackend.hasOwnProperty('default') ? i18nextXHRBackend['default'] : i18nextXHRBackend;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * I18nClient
   *
   * @version 0.3.0 #4 Add values to client
   *          0.3.0 #3 Implement promises
   *          0.2.0 #2 Create adapter for i18next
   *
   * @author Dallas Vogels <dvogels@islandlinux.org>
   *
   * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
   */

  var I18nClient = function () {
      /**
       * @since 0.3.0
       *
       * @param {Object} i18nLibrary
       * @param {Object} sprintf
       */
      function I18nClient(i18nLibrary, sprintf) {
          classCallCheck(this, I18nClient);

          this.i18nLibrary = i18nLibrary;
          this.sprintf = sprintf;
      }

      /**
       * @since 0.2.0
       *
       * @param {String} key
       *
       * @return {Boolean}
       */


      createClass(I18nClient, [{
          key: 'exists',
          value: function exists(key) {
              return this.i18nLibrary.exists(key);
          }

          /**
           * @since 0.2.0
           *
           * @param {Object} configuration
           *
           * @returns {Promise}
           */

      }, {
          key: 'initialize',
          value: function initialize(configuration) {
              var result;

              result = this.i18nLibrary.initialize(configuration);

              return result;
          }

          /**
           * @since 0.2.0
           *
           * @returns {Object}
           */

      }, {
          key: 'getConfiguration',
          value: function getConfiguration() {
              return this.i18nLibrary.getConfiguration();
          }

          /**
           * @since 0.3.0
           *
           * @param {String} key
           * @param {Array} values
           * @returns {String}
           */

      }, {
          key: 'translate',
          value: function translate(key, values) {
              var result;

              result = this.i18nLibrary.translate(key);

              if (values) {
                  result = this.sprintf(result, values);
              }

              return result;
          }
      }]);
      return I18nClient;
  }();

  // EOF

  /**
   * Adapter for i18next
   *
   * @version 0.3.0 #3 Implement promises
   *          0.2.0 #2 Create adapter for i18next
   *
   * @author Dallas Vogels <dvogels@islandlinux.org>
   *
   * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
   */

  var I18nextAdapter = function () {

      /**
       * @since 0.2.0
       *
       * @param {i18next} i18nLibrary
       * @param {i18nextXHRBackend} backend
       */
      function I18nextAdapter(i18nLibrary, backend) {
          classCallCheck(this, I18nextAdapter);

          this.i18nLibrary = i18nLibrary;
          this.backend = backend;
      }

      /**
       * @since 0.2.0
       *
       * @param {String} key
       *
       * @return {Boolean}
       */


      createClass(I18nextAdapter, [{
          key: 'exists',
          value: function exists(key) {
              return this.i18nLibrary.exists(key);
          }

          /**
           * @since 0.3.0
           *
           * @param {Object} configuration
           *
           * @returns {Promise}
           */

      }, {
          key: 'initialize',
          value: function initialize(configuration) {
              var promise;

              var i18nLibrary = this.i18nLibrary;
              var backend = this.backend;

              promise = new Promise(function (resolve, reject) {
                  i18nLibrary.use(backend).init(configuration, function (err, localize) {

                      if (typeof localize === 'undefined') {
                          localize = err;
                          err = undefined;
                      } else {
                          if (!!err && typeof err !== 'undefined' && err !== null) {
                              reject('[ng-i18next] i18next error: ' + err);
                          }
                      }

                      resolve('[ng-i18next] initialized');
                  });
              });

              return promise;
          }

          /**
           * @since 0.2.0
           *
           * @returns {Object}
           */

      }, {
          key: 'getConfiguration',
          value: function getConfiguration() {
              return this.i18nLibrary.options;
          }

          /**
           * @since 0.2.0
           *
           * @param {String} key
           * @returns {String}
           */

      }, {
          key: 'translate',
          value: function translate(key) {
              return this.i18nLibrary.t(key);
          }
      }]);
      return I18nextAdapter;
  }();

  // EOF

  /**
   * i18n library
   *
   * @version
   *
   * 0.5.0 #11 Update packages for npm and bower
   * 0.4.0 #5 Add babel support for transpile
   * 0.3.0 #4 Add values to client
   * 0.2.0 #2 Create adapter for i18next
   * 0.1.0 #1 Initialize environment
   *
   * @author Dallas Vogels <dvogels@islandlinux.org>
   *
   * @copyright (c) 2016-2019 Dallas Vogels <dvogels@islandlinux.org>
   */

  // check for bower implementation versus
  var sprintfLibrary = null;
  if (typeof vsprintf.vsprintf !== 'undefined') {
      sprintfLibrary = vsprintf.vsprintf; // bower
  } else {
      sprintfLibrary = vsprintf; // npm
  }

  var i18Adapter = new I18nextAdapter(i18next, i18nextXHRBackend);
  var i18nClient = new I18nClient(i18Adapter, sprintfLibrary);



  // EOF

  return i18nClient;

})));
