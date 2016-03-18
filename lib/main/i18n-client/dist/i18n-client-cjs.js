'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var i18next = _interopDefault(require('i18next'));
var i18nextXHRBackend = _interopDefault(require('i18next-xhr-backend'));

/**
 * I18nClient
 *
 * @version  0.2.0 #2 Create adapter for i18next
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
 */
class I18nClient {
    /**
     * @since 0.2.0
     *
     * @param {Object} i18nLibrary
     */
    constructor(i18nLibrary)
    {
        this.i18nLibrary = i18nLibrary;
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
     */
    initialize(configuration)
    {
        this.i18nLibrary.initialize(configuration);
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
     * @since 0.2.0
     *
     * @param {String} key
     * @returns {String}
     */
    translate(key)
    {
        return this.i18nLibrary.translate(key);
    }
}

// EOF

/**
 * Adapter for i18next
 *
 * @version 0.2.0 #2 Create adapter for i18next
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
     */
    initialize(configuration)
    {
        this.i18nLibrary
            .use(this.backend)
            .init(configuration);
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
var i18nClient = new I18nClient(i18Adapter);

module.exports = i18nClient;