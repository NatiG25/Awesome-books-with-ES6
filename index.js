import book_Collection from './modules/bookCollection.js';
import { navigationLinks } from './modules/navigate.js';


function displayDate() {
    document.getElementById('date').innerHTML = Date();
}

navigationLinks();
new book_Collection();