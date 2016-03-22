'use strict';

/**
 * i18n library
 *
 * @version  0.3.0 #4 Add values to client
 *           0.2.0 #2 Create adapter for i18next
 *           0.1.0 #1 Initialize environment
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
 */

import vsprintf from 'sprintf';

import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

import { I18nClient } from './lib/main/I18nClient';
import { I18nextAdapter } from './lib/adapters/I18nextAdapter';

var i18Adapter = new I18nextAdapter(i18next, i18nextXHRBackend);
var i18nClient = new I18nClient(i18Adapter, vsprintf);

export default i18nClient;

// EOF
