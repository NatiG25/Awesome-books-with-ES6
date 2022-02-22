import book_Collection from './modules/bookCollection.js';
import { navigationLinks } from './modules/navigate.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const date = document.getElementById('date');
date.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

navigationLinks();
new book_Collection();