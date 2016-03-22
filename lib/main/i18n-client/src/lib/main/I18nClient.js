'use strict';

/**
 * I18nClient
 *
 * @version x.x.x #3 Implement promises
 *          0.2.0 #2 Create adapter for i18next
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
 */
export class I18nClient {
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
