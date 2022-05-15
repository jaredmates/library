let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  document.querySelector("form").reset();
  makeCard();
}

let submit = document.getElementById("btn");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;
  let book = new Book(title, author, pages, read);
  addBookToLibrary(book);
});

function makeCard() {
  let cardContainer = document.querySelector(".card-container");

  let card = document.createElement("div");
  card.style.width = "18rem";
  card.classList.add("card");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let bookTitle = document.createElement("h5");
  card.classList.add("card-title");
  bookTitle.textContent = `Book Title: ${
    myLibrary[myLibrary.length - 1].title
  }`;

  let bookAuthor = document.createElement("h6");
  card.classList.add("card-subtitle", "mb-2", "text-muted");
  bookAuthor.textContent = `Book Author: ${
    myLibrary[myLibrary.length - 1].author
  }`;

  let pageNumber = document.createElement("p");
  card.classList.add("card-text");
  pageNumber.textContent = `Number of Pages: ${
    myLibrary[myLibrary.length - 1].pages
  }`;

  let readStatus = document.createElement("p");
  card.classList.add("card-text");
  readStatus.textContent = `Read Status: ${
    myLibrary[myLibrary.length - 1].read
  }`;

  cardContainer.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(bookTitle);
  cardBody.appendChild(bookAuthor);
  cardBody.appendChild(pageNumber);
  cardBody.appendChild(readStatus);
}
