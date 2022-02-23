const list = document.getElementById('book_list');
const AddBook = document.getElementById('AddBook');

export default class Library {
  constructor(BooksContainer) {
    this.books = [];
    this.BooksContainer = BooksContainer;
    this.Storage = false;
    this.CheckStorage('localStorage');
    this.InitData();
    this.books.forEach((book) => this.addToPage(book));
  }

  addToCollection(data) {
    const { id, title, author } = data;
    this.books.push({
      id,
      title,
      author,
    });

    this.uStorage();
    this.addToPage(data);
  }

  addToPage(data) {
    const { id, title, author } = data;

    this.BooksContainer.innerHTML += `
    <li id ="${id}">
    <div class="_title">
      <h3>"${title}"</h3>
      </div>
      <div class="_author">
      <p><b><i>By : </b>${author}</i></p>
      </div>
      <button class="rmBook">Remove</button>
    </li>
    `;

    this.updateEventListeners(this.BooksContainer);
  }

  updateEventListeners(element = document) {
    const rmBtn = element.querySelectorAll('.rmBook');

    rmBtn.forEach((RmBtn) => {
      RmBtn.addEventListener('click', (e) => {
        const { parentNode } = e.target;
        this.rmBook(parentNode.id);
        parentNode.remove();
      });
    });
  }

  rmBook(id) {
    this.books = this.books.filter((book) => book.id === id);
    this.uStorage();
  }

  InitData() {
    if (this.Storage) {
      const localData = window.localStorage.getItem('books');
      if (localData) {
        this.books = JSON.parse(localData);
      }
    }
  }

  CheckStorage(type) {
    let storage;
    try {
      storage = window[type];
      const st = '_test_storage_';
      storage.setItem(st, st);
      storage.rm_item(st);
      this.Storage = true;
    } catch (e) {
      this.Storage = false;
    }
  }

  uStorage() {
    if (this.Storage) {
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

  bookCollection.addToCollection({
    id,
    title,
    author,
  });

  AddBook.title.value = '';
  AddBook.author.value = '';
});