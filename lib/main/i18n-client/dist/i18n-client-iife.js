var i18nClient = (function (vsprintf,i18next,i18nextXHRBackend) {
    'use strict';

    vsprintf = 'default' in vsprintf ? vsprintf['default'] : vsprintf;
    i18next = 'default' in i18next ? i18next['default'] : i18next;
    i18nextXHRBackend = 'default' in i18nextXHRBackend ? i18nextXHRBackend['default'] : i18nextXHRBackend;

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
    class I18nClient {
        /**
         * @since 0.3.0
         *
         * @param {Object} i18nLibrary
         * @param {Object} sprintf
         */
        constructor(i18nLibrary, sprintf)
        {
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
        exists(key)
        {
            return this.i18nLibrary.exists(key);
        }

        /**
         * @since 0.2.0
         *
         * @param {Object} configuration
         *
         * @returns {Promise}
         */
        initialize(configuration)
        {
            var result;

            result = this.i18nLibrary.initialize(configuration);

            return result;
        }

        /**
         * @since 0.2.0
         *
         * @returns {Object}
         */
        getConfiguration()
        {
            return this.i18nLibrary.getConfiguration();
        }

        /**
         * @since 0.3.0
         *
         * @param {String} key
         * @param {Array} values
         * @returns {String}
         */
        translate(key, values)
        {
            var result;

            result = this.i18nLibrary.translate(key);

            if (values) {
                result = this.sprintf(result, values);
            }

            return result;
        }
    }

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
    class I18nextAdapter {

        /**
         * @since 0.2.0
         *
         * @param {i18next} i18nLibrary
         * @param {i18nextXHRBackend} backend
         */
        constructor(i18nLibrary, backend)
        {
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
        exists(key)
        {
            return this.i18nLibrary.exists(key);
        }

        /**
         * @since 0.2.0
         *
         * @param {Object} configuration
         *
         * @returns {Promise}
         */
        initialize(configuration)
        {
            var promise;

            var i18nLibrary = this.i18nLibrary;
            var backend = this.backend;

            promise = new Promise(
                function (resolve, reject)
                {
                    i18nLibrary
                        .use(backend)
                        .init(
                            configuration, function (err, localize)
                            {

                                if (typeof(localize) === 'undefined') {
                                    localize = err;
                                    err = undefined;
                                } else {
                                    if (!!err && typeof(err) !== 'undefined' && err !== null) {
                                        reject('[ng-i18next] i18next error: ' + err);
                                    }
                                }

                                resolve('[ng-i18next] initialized');
                            }
                        );
                }
            );

            return promise;

        }

        /**
         * @since 0.2.0
         *
         * @returns {Object}
         */
        getConfiguration()
        {
            return this.i18nLibrary.options;
        }

        /**
         * @since 0.2.0
         *
         * @param {String} key
         * @returns {String}
         */
        translate(key)
        {
            return this.i18nLibrary.t(key);
        }

    }

    // EOF

    var i18Adapter = new I18nextAdapter(i18next, i18nextXHRBackend);
    var i18nClient = new I18nClient(i18Adapter, vsprintf);

    return i18nClient;

}(vsprintf,i18next,i18nextXHRBackend));