function Book(title, author, pages, read) {
  // the constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
  document.querySelector("form").reset();
  makeCard(book);
}

function makeCard(book) {
  let cardContainer = document.querySelector(".card-container");

  let card = document.createElement("div");
  card.style.width = "18rem";
  card.classList.add("card");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let bookTitle = document.createElement("h5");
  card.classList.add("card-title");
  bookTitle.textContent = `Book Title: ${book.title}`;

  let bookAuthor = document.createElement("h6");
  card.classList.add("card-subtitle", "mb-2", "text-muted");
  bookAuthor.textContent = `Book Author: ${book.author}`;

  let pageNumber = document.createElement("p");
  card.classList.add("card-text");
  pageNumber.textContent = `Number of Pages: ${book.pages}`;

  let readStatus = document.createElement("p");
  card.classList.add("card-text");
  readStatus.textContent = `Read Status: ${book.read}`;

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

  deleteBtn.addEventListener("click", (e) => {
    // cardContainer.removeChild(card);
    removeBook(e.target);
  });
}

// event add book
let submitForm = document.getElementById("book-form");

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;
  if (title === "" || author === "" || pages === "" || read === "") {
    showAlert("Fill in all fields!", "danger");
  } else {
    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);
  }
});

// show alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("form");
  container.insertBefore(div, form);
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// event remove book
function removeBook(el) {
  if (el.classList.contains("delete")) {
    el.parentElement.parentElement.remove();
  }
}
