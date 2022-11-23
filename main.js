const fragment = document.createDocumentFragment();
const rootElement = document.getElementById("root");

const header = document.createElement("h1");
header.textContent="The best book shop"


const main = document.createElement("main");
main.setAttribute("class", "main");

const sectionCatalog = document.createElement("section");

const sectionBag = document.createElement("section");
let totalSum = 0
sectionBag.setAttribute("class", "form-container");

const bagHeader = document.createElement("h2")
bagHeader.textContent = "Books in your bag";

const bagCardList = document.createElement("div");
bagCardList.classList.add("bagcardlist")

const cardbagbottom = document.createElement("div");
const total = document.createElement("p")
total.textContent = `Total: ${totalSum}$`;
total.setAttribute("class", "form__group");

const linkConfirm = document.createElement("a")
linkConfirm.setAttribute("href", "pages/order/index.html")
const confirm = document.createElement("button")
confirm.textContent = "Confirm order";

cardbagbottom.appendChild(total);
linkConfirm.appendChild(confirm);
cardbagbottom.appendChild(linkConfirm);

sectionBag.appendChild(bagHeader);
sectionBag.appendChild(bagCardList);
sectionBag.appendChild(cardbagbottom);

sectionBag.setAttribute("class", "bag");

const cardContainer = document.createElement("div");
cardContainer.setAttribute("class", "cardlist");

fetch("assets/books.json")
.then((response) => {
  return response.json()
})
.then((data) => {
  let books = data
  return books.map((book) => {
    const listFrag = document.createElement("div");
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardLeft = document.createElement("div");
    cardLeft.setAttribute("draggable", "true");
    const cardLeftImage = document.createElement("img");

    cardLeftImage.setAttribute("src", `${book.imageLink}`);
    cardLeftImage.setAttribute("alt", `${book.title}`);
    cardLeft.setAttribute("class", "card-left");

    cardLeft.appendChild(cardLeftImage);

    const cardRight = document.createElement("div");
    cardRight.setAttribute("class", "card-right");
    const cardRightTop = document.createElement("div");
    cardRightTop.setAttribute("class", "card-right-top");
    const cardRightTopAuthor = document.createElement("p");
    const cardRightTopTitle = document.createElement("h5");
    const cardRightTopPrice = document.createElement("p");
    cardRightTopAuthor.textContent = `${book.author}`;
    cardRightTopTitle.textContent = `${book.title}`;
    cardRightTopPrice.textContent = `Price: ${book.price}$`;
    cardRightTop.appendChild(cardRightTopAuthor);
    cardRightTop.appendChild(cardRightTopTitle);
    cardRightTop.appendChild(cardRightTopPrice);
    const cardRightBottom = document.createElement("div");
    cardRightBottom.setAttribute("class", "card-right-bottom");
    cardRight.appendChild(cardRightTop);
    cardRight.appendChild(cardRightBottom);
    const cardRightBottomShowMore = document.createElement("button");
    cardRightBottomShowMore.textContent = "Show more";
    cardRightBottom.appendChild(cardRightBottomShowMore);
    cardRightBottomShowMore.addEventListener("click", showPopup);

    const cardRightBottomAddToBag = document.createElement("button");
    cardRightBottomAddToBag.textContent = "Add to bag";
    cardRightBottomAddToBag.setAttribute("class", "button");
    cardRightBottomAddToBag.addEventListener("click", addBookToBag);

    cardRightBottom.appendChild(cardRightBottomAddToBag);

    card.appendChild(cardLeft);
    card.appendChild(cardRight);

    listFrag.appendChild(card);
    cardContainer.appendChild(listFrag);

    cardLeft.addEventListener("dragstart", handleDragStart);
    cardLeft.addEventListener("dragend", handleDragEnd);

    function handleDragStart(e) {
      const bookObject = {
        "author": `${book.author}`,
        "title": `${book.title}`,
        "price": `${book.price}`
      }
      e.dataTransfer.setData("text/plain", JSON.stringify(bookObject));
    }

    function handleDragEnd(e) {
      e.target.classList.add("dragendimage");
    }

    function addBookToBag() {
      const bagCard = document.createElement("div");
      bagCard.setAttribute("class", "bagcard");
      bagCardList.appendChild(bagCard);
      const imgclose = document.createElement("img");
      imgclose.setAttribute("src", "assets/images/close.svg");
      bagCard.appendChild(imgclose);
      imgclose.addEventListener("click", removeBookFromBag);
      const author = document.createElement("p");
      const title = document.createElement("h5");
      const price = document.createElement("p");
      author.classList.add("author");
      title.classList.add("title");
      price.classList.add("price");
      author.textContent = `${book.author}`;
      title.textContent = `${book.title}`;
      price.textContent = `Price: ${book.price}$`;
      bagCard.appendChild(title);
      bagCard.appendChild(author);
      bagCard.appendChild(price);

      totalSum = totalSum + book.price;
      total.textContent = `Total: ${totalSum}$`;
    }

    function removeBookFromBag(event) {
      const bagBook = event.target.closest(".bagcard");
      bagBook.parentNode.removeChild(bagBook);
      totalSum = totalSum - book.price;
      total.textContent = `Total: ${totalSum}$`;
    }

    function showPopup(event) {
      const modal = document.createElement("div");
      modal.classList.add("modalcard");
      const popupImage = document.createElement("img");
      popupImage.setAttribute("src", "assets/images/close.svg");
      modal.classList.add("modalcard");

      const popupTitle = document.createElement("h5");
      popupTitle.textContent = `${book.title}`;

      const popupDescription = document.createElement("p");
      popupDescription.textContent = `${book.description}`;
      const popupCloseButton = document.createElement("button");
      popupCloseButton.textContent = "Close";
      modal.appendChild(popupImage);
      modal.appendChild(popupTitle);
      modal.appendChild(popupDescription);
      modal.appendChild(popupCloseButton);
      const modalOuter = document.createElement("div");
      modalOuter.classList.add("modal-outer");
      document.body.appendChild(modalOuter);
      modalOuter.appendChild(modal);
      popupCloseButton.addEventListener("click", removePopup);
      popupImage.addEventListener("click", removePopup);
    }

    function removePopup() {
      const modalElement = document.querySelector(".modalcard");
      const cardElement = modalElement.closest(".card");
      const modalOuter = modalElement.parentNode;
      modalOuter.removeChild(modalElement);
      modalOuter.parentNode.removeChild(modalOuter);
    }
  })
})
.catch((err) => {
  return err
})

sectionCatalog.appendChild(cardContainer)
main.appendChild(sectionCatalog)
main.appendChild(sectionBag);
rootElement.appendChild(header);
rootElement.appendChild(main);
rootElement.append(fragment);

const dropArea = document.querySelector(".bagcardlist");
dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("drop", handleDragDrop);

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragDrop(e) {
  e.preventDefault();
  const book = JSON.parse(e.dataTransfer.getData("text"));
    const bagCard = document.createElement("div");
    bagCard.setAttribute("class", "bagcard");
    bagCardList.appendChild(bagCard);
    const imgclose = document.createElement("img");
    imgclose.setAttribute("src", "assets/images/close.svg");
    bagCard.appendChild(imgclose);
    imgclose.addEventListener("click", removeDroppedBook);

  function removeDroppedBook(event) {
    const bagBook = event.target.closest(".bagcard");
    bagBook.parentNode.removeChild(bagBook);
    totalSum = totalSum - +book.price;
    total.textContent = `Total: ${totalSum}$`;
  }

    const author = document.createElement("p");
    const title = document.createElement("h5");
    const price = document.createElement("p");
    author.classList.add("author");
    title.classList.add("title");
    price.classList.add("price");
    author.textContent = `${book.author}`;
    title.textContent = `${book.title}`;
    price.textContent = `Price: ${book.price}$`;
    bagCard.appendChild(title);
    bagCard.appendChild(author);
    bagCard.appendChild(price);

    totalSum = totalSum + +book.price;
    total.textContent = `Total: ${totalSum}$`;

  e.currentTarget.append(bagCard);
}