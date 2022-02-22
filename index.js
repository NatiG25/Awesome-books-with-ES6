import { DateTime } from './node_modules/luxon/src/luxon.js';
import Library from './modules/library.js';
import { navigationLinks } from './modules/navigate.js';

const date = document.getElementById('date');
date.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

navigationLinks();
new Library();