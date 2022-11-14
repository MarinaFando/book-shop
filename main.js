
const rootElement = document.getElementById("root");

const header = document.createElement("h1");
header.textContent="The best book shop"


const wrapper = document.createElement("div");
wrapper.setAttribute("class", "wrapper");


const sectionCatalog = document.createElement("section");

const sectionBag = document.createElement("section");
sectionBag.setAttribute("class", "form-container");
const cardBag = document.createElement("div");

const bagHeader = document.createElement("h2")
bagHeader.textContent = "Bag";
cardBag.setAttribute("class", "form__group");

const cardbaglist = document.createElement("div");

const cardbagbottom = document.createElement("div");
const total = document.createElement("p")
total.textContent = "Total:";
total.setAttribute("class", "form__group");

const linkConfirm = document.createElement("a")
linkConfirm.setAttribute("href", "pages/order/index.html")
const confirm = document.createElement("button")
confirm.textContent = "Confirm order";


cardbagbottom.appendChild(total);
linkConfirm.appendChild(confirm);
cardbagbottom.appendChild(linkConfirm);

sectionBag.appendChild(bagHeader);
sectionBag.appendChild(cardbaglist);
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
  console.log(books)
  return books.map((book) => {
      const listFrag = document.createElement('div');
      const card = document.createElement("div");
      card.setAttribute("class", "card")
      const cardLeft = document.createElement("div");
      const cardLeftImage = document.createElement("img");
      cardLeftImage.setAttribute("src", `${book.imageLink}`);
      cardLeftImage.setAttribute("alt", "book JavaScript: The Good Parts");
      cardLeftImage.setAttribute("height", "50px");
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

      const cardRightBottomAddToBag = document.createElement("button");
      cardRightBottomAddToBag.textContent = "Add to bag";
      cardRightBottomAddToBag.setAttribute("class", "button")
      cardRightBottom.appendChild(cardRightBottomAddToBag);

      card.appendChild(cardLeft)
      card.appendChild(cardRight)

      listFrag.appendChild(card)
      cardContainer.appendChild(listFrag)
    })
})
.catch((err) => {
  return err
})

sectionCatalog.appendChild(cardContainer)
wrapper.appendChild(sectionCatalog)
wrapper.appendChild(sectionBag);
rootElement.appendChild(header);
rootElement.appendChild(wrapper);