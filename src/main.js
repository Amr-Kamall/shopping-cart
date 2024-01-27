let shop = document.querySelector(".shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let cartAmount = document.querySelector(".cart-amount");

let integratedCarts = shopItemData
  .map((cart) => {
    let { id, name, price, desc, img } = cart;
    let search = basket.find((el) => el.id === id) || [];
    return `
   <div class="item" id="product-id-${id}" >
        <img src=${img} alt="image" />
        <div class="details">
          <h3>${name}</h3>
          <p>
            ${desc}
          </p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="button">
              <i class="bi bi-dash-lg" onclick="decrement(${id})" ></i>
              <div id=${id} class="quantity">${
      search.item === undefined ? 0 : search.item
    }</div>
              <i class="bi bi-plus-lg" onclick="increment(${id})"></i>
            </div>
          </div>
        </div>
    </div>
`;
  })
  .join("");

shop.innerHTML = integratedCarts;

function increment(id) {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  update(selectedItem); //⚡//
}

function decrement(id) {
  const selectedItem = id;
  // const deletedItem = basket.findIndex((x) => x.id === selectedItem.id);
  const searchedItem = basket?.find((x) => x.id === selectedItem?.id);

  if (searchedItem === undefined) return;
  if (searchedItem.item === 0) {
    return;
  } else {
    searchedItem.item -= 1;
  }

  update(selectedItem); //⚡// before filtering
  basket = basket.filter((obj) => obj.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
}

function update(selectedItem) {
  const searchedItem = basket.find((x) => x.id === selectedItem.id);
  document.getElementById(searchedItem.id).innerHTML = searchedItem.item;
  calculation(); //⚡//
}

function calculation() {
  cartAmount.innerHTML = basket.map((el) => el.item).reduce((x, y) => x + y, 0);

  //we want this function run after update function then we call it un update function
}

calculation(); // to keep reserve in localStorage  (every time the application loads this will run)
