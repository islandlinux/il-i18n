'use strict';

/**
 * Adapter for i18next
 *
 * @version 0.2.0 #2 Create adapter for i18next
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
 */
export class I18nextAdapter {
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
