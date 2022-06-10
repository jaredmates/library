// Represents a Book
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
// Handle UI Tasks
class UI {
  static renderBooks() {
    const books = Library.getBooks();

    // display all book cards from storage
    books.forEach((book) => UI.addBookCard(book));

    // books.forEach((book, index) => UI.addBookCard(book, index));
    // books.map((book, index) => UI.addBookCard(book, index));
  }

  // Make book card
  static addBookCard(book) {
    // static addBookCard(book, index) {
    let cardContainer = document.querySelector(".card-container");

    let card = document.createElement("div");
    card.style.minWidth = "15rem";
    card.classList.add("card");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // cardBody.setAttribute("id", index);
    // cardBody.setAttribute("key", index);

    let bookTitle = document.createElement("h4");
    card.classList.add("card-title");
    bookTitle.textContent = `${book.title}`;

    let bookAuthor = document.createElement("h6");
    card.classList.add("card-subtitle", "mb-2", "text-muted");
    bookAuthor.textContent = `Author: ${book.author}`;

    let pageNumber = document.createElement("p");
    card.classList.add("card-text");
    pageNumber.textContent = `Number of Pages: ${book.pages}`;

    let readStatus = document.createElement("btn");
    if (book.read === true) {
      readStatus.classList.add("btn", "btn-success", "space");
      readStatus.textContent = "Read";
    } else {
      readStatus.classList.add("btn", "btn-warning", "space");
      readStatus.textContent = "Not Read";
    }

    let deleteBtn = document.createElement("btn");
    deleteBtn.classList.add("btn", "btn-danger", "delete");
    deleteBtn.textContent = "Delete";

    cardContainer.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(bookTitle);
    cardBody.appendChild(bookAuthor);
    cardBody.appendChild(pageNumber);
    cardBody.appendChild(readStatus);
    cardBody.appendChild(deleteBtn);

    // cardBody.querySelector(".delete").addEventListener("click", () => {
    //   UI.deleteBook(index);
    //   Library.removeBook(index);
    // });
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      // cardContainer.removeChild(card);
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#book-form");
    const form = document.querySelector(".book-group");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static resetForm() {
    document.querySelector("form").reset();
    // document.getElementById("title").value = "";
    // document.getElementById("author").value = "";
    // document.getElementById("pages").value = "";
    // document.getElementById("read").value = "";
  }
}

// Library: Handles Storage
class Library {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Library.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Removes book based on a unique book title
  static removeBook(title) {
    const books = Library.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  // static removeBook(index) {
  //   const books = Library.getBooks();
  //   console.log(index);
  //   books.splice(index, 1);

  //   localStorage.setItem("books", JSON.stringify(books));
  // }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.renderBooks);

// Event: Add a Book
const submitBookForm = document.getElementById("book-form");

submitBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get form values
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;

  // Validate
  if (title === "" || author === "" || pages === "" || read === "") {
    UI.showAlert("Fill in all fields!", "danger");
  } else {
    // instatiate book
    const book = new Book(title, author, pages, read);

    // Add Book to UI
    UI.addBookCard(book);

    // Add book to Library
    Library.addBook(book);

    // reset form
    UI.resetForm();

    // hide model after submitting
    modal.style.display = "none";
  }
});

// Event: Remove a Book
document.querySelector(".card-container").addEventListener("click", (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  Library.removeBook(
    e.target.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.textContent
  );
});

// Get the modal
const modal = document.querySelector(".mod");

// Get the button that opens the modal
const newBookBtn = document.querySelector(".new-book");

// When the user clicks on the button, open the modal
newBookBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
