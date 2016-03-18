'use strict';

/**
 * I18nClient
 *
 * @version  x.x.x #2 Create adapter for i18next
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
 */
export class I18nClient {
    /**
     * @since x.x.x
     *
     * @param {Object} i18nLibrary
     */
    constructor(i18nLibrary)
    {
        this.i18nLibrary = i18nLibrary;
    }

    /**
     * @since x.x.x
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
     * @since x.x.x
     *
     * @param {Object} configuration
     */
    initialize(configuration)
    {
        this.i18nLibrary.initialize(configuration);
    }

    /**
     * @since x.x.x
     *
     * @returns {Object}
     */
    getConfiguration()
    {
        return this.i18nLibrary.getConfiguration();
    }

    /**
     * @since x.x.x
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
