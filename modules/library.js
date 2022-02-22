const list = document.getElementById('book_list');
const AddBook = document.getElementById('AddBook');

export default class Library {
    constructor(BooksContainer) {
      this.books = [];
      this.BooksContainer = BooksContainer;
      this._storage = false;
      this._check_storage('localStorage');
      this._init_data();
      this.books.forEach((book) => this.add_to_page(book));
    }

    add_to_collection(data) {
      const { id, title, author } = data;
      this.books.push({
          id,
          title,
          author,
      });

      this._u_storage();
      this.add_to_page(data);
    }

    add_to_page(data) {
        const { id, title, author } = data;

        this.BooksContainer.innerHTML += `
    <li id ="${id}">
    <div class="_title">
      <h3>"${title}"</h3>
      </div>
      <div class="_author">
      <p><b><i>By : </b>${author}</i></p>
      </div>
      <button class="rm_book">Remove</button>
    </li>
    `;

        this.updateEventListeners(this.BooksContainer);
    }

    updateEventListeners(element = document) {
        const _rm_btn = element.querySelectorAll('.rm_book');

        _rm_btn.forEach((_rmBtn) => {
            _rmBtn.addEventListener('click', (e) => {
                const { parentNode } = e.target;
                this.rm_book(parentNode.id);
                parentNode.remove();
            });
        });
    }

    rm_book(id) {
        this.books = this.books.filter((book) => book.id = id === false);
        this._u_storage();
    }

    _init_data() {
        if (this._storage) {
            const localData = window.localStorage.getItem('books');
            if (localData) {
                this.books = JSON.parse(localData);
            }
        }
    }

    _check_storage(type) {
        let storage;
        try {
            storage = window[type];
            const st = '_test_storage_';
            storage.setItem(st, st);
            storage.rm_item(st);
            this._storage = true;
        } catch (e) {
            this._storage = false;
        }
    }

    _u_storage() {
        if (this._storage) {
            const storage = window.localStorage;
            storage.setItem('books', JSON.stringify(this.books));
        }
    }
}

const bookCollection = new Library(list);

AddBook.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now().toString();
    const title = AddBook.title.value.trim();
    const author = AddBook.author.value.trim();

    bookCollection.add_to_collection({
        id,
        title,
        author,
    });

    AddBook.title.value = '';
    AddBook.author.value = '';
});