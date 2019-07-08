'use strict';

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

import vsprintf from 'sprintf-js';

import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

import {I18nClient} from './lib/main/I18nClient';
import {I18nextAdapter} from './lib/adapters/I18nextAdapter';

// check for bower implementation versus
let sprintfLibrary = null;
if (typeof(vsprintf.vsprintf) !== 'undefined') {
    sprintfLibrary = vsprintf.vsprintf; // bower
} else {
    sprintfLibrary = vsprintf; // npm
}

let i18Adapter = new I18nextAdapter(i18next, i18nextXHRBackend);
let i18nClient = new I18nClient(i18Adapter, sprintfLibrary);

export default i18nClient;

// EOF
