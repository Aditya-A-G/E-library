let myLibrary = [];
let id = 0;

let main = document.querySelector("main");
let addBtn = document.getElementById("add");
let popUp = document.getElementById("popUp");
let form = document.querySelector("form");
let nameField = document.querySelector("#name");
let emailField = document.querySelector("#email")
let closeBtn = document.getElementsByClassName("close")[0];

form.addEventListener("submit", addBookToLibrary);
addBtn.addEventListener("click", openForm);
closeBtn.addEventListener("click", closeForm);
nameField.addEventListener("input", validateNameField)
emailField.addEventListener("input", validateEmailField)

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
  }
}

function validateNameField(){
  console.log(nameField.validity.valueMissing)
  if(nameField.validity.valueMissing){
    nameField.setCustomValidity("nope you cannot not do this")
  }else{
    nameField.setCustomValidity("");
  }
}

function validateEmailField(){
  console.log(emailField.validity.typeMismatch)
  if(emailField.validity.typeMismatch){
    emailField.setCustomValidity("nope you cannot not do this")
  }else{
    emailField.setCustomValidity("")
  }
}

function openForm() {
  popUp.classList.add("active");
  main.classList.add("blur");
  addBtn.classList.toggle("blur");

  validateNameField();
}

function closeForm() {
  popUp.classList.toggle("active");
  main.classList.toggle("blur");
  addBtn.classList.toggle("blur");
}

function removeBook(e) {
  let card = e.currentTarget.closest(".card");
  let id = card.getAttribute("data-id");

  main.removeChild(card);
  let i;
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id == id) {
      myLibrary[i] = "";
      break;
    }
  }

  myLibrary = myLibrary.filter((obj) => obj);
}

function changeReadStatus(e) {
  let id = e.currentTarget.closest(".card").getAttribute("data-id");

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id == id) {
      if (myLibrary[i].readStatus) {
        myLibrary[i].readStatus = false;
      } else {
        myLibrary[i].readStatus = true;
      }
      break;
    }
  }
}

function addBookToLibrary(e) {
  e.preventDefault();

  popUp.classList.toggle("active");
  main.classList.toggle("blur");
  addBtn.classList.toggle("blur");

  let title = e.target[0].value;
  let author = e.target[1].value;
  let noOfPages = e.target[2].value;
  let readStatus = e.target[3].checked;

  let book = new Book(title, author, noOfPages, readStatus, ++id);

  myLibrary.push(book);

  displayBook(title, author, noOfPages, readStatus);
}

function displayBook(name, writer, noOfPages, status) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", id);
  let title = document.createElement("p");
  let by = document.createElement("p");
  let author = document.createElement("p");
  let pages = document.createElement("p");

  let readStatus = document.createElement("p");
  let div = document.createElement("div");

  let toggle = document.createElement("label");
  toggle.classList.add("switch");

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  if (status) {
    checkbox.setAttribute("checked", "true");
  }

  let slider = document.createElement("span");
  slider.classList.add("slider");
  slider.addEventListener("click", changeReadStatus);

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  let btn = document.createElement("button");
  btn.setAttribute("id", "delete");

  main.appendChild(card);

  card.appendChild(title);
  card.appendChild(by);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(readStatus);
  card.appendChild(div);
  card.appendChild(wrapper);

  div.appendChild(toggle);
  toggle.appendChild(checkbox);
  toggle.appendChild(slider);

  wrapper.appendChild(btn);

  btn.addEventListener("click", removeBook);

  title.textContent = name;
  by.textContent = "By";
  author.textContent = writer;
  pages.textContent = `${noOfPages} Pages`;
  readStatus.textContent = "Read Status";

  btn.textContent = "Delete";
}
