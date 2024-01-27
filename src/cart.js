let cartAmount = document.querySelector(".cart-amount");
let shoppingCart = document.querySelector(".shopping-cart");
let label = document.querySelector(".label");
//shopItemData
let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);
//////////////
function calculation() {
  cartAmount.innerHTML = basket.map((el) => el.item).reduce((x, y) => x + y, 0);
  //we want this function run after update function then we call it un update function
}

calculation(); // to keep reserve in localStorage  (every time the application loads this will run)

function generateCartItems() {
  if (basket.length > 0) {
    shoppingCart.innerHTML = basket
      .map((ele) => {
        let { id, item } = ele;
        const search = shopItemData.find((ele) => ele.id === id) || [];
        const { img, name, price } = search;
        return `
        
        <div class="cart-item">
            <img width="200" src=${img} />
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$${price}</p>
                    </h4>
                    <i class="bi bi-x-lg" onclick="handleClearItem(${id})" ></i>
                </div>
                <div class="button">
                    <i class="bi bi-dash-lg" onclick="decrement(${id})" ></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i class="bi bi-plus-lg" onclick="increment(${id})"></i>
                </div>
                <h3>$ ${item * price}</h3>
            </div>
        </div>
        `;
      })
      .join("");
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>cart is empty</h2>
    <a href="index.html"><button class="home-btn">back to home</button></a>
    `;
  }
}
generateCartItems();
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
  generateCartItems();
}

function decrement(id) {
  const selectedItem = id;
  // const deletedItem = basket.findIndex((x) => x.id === selectedItem.id);
  const searchedItem = basket?.find((x) => x.id === selectedItem?.id);
  const deletedItem = basket.findIndex((x) => x.id === selectedItem.id);
  if (searchedItem === undefined) return;
  if (searchedItem.item === 0) {
    return;
  } else {
    searchedItem.item -= 1;
  }

  update(selectedItem); //⚡// before filtering
  //   basket = basket.filter((obj) => obj.item !== 0);
  if (searchedItem.item === 0) {
    basket.splice(deletedItem, 1);
  }
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
}

function update(selectedItem) {
  const searchedItem = basket.find((x) => x.id === selectedItem.id);
  document.getElementById(searchedItem.id).innerHTML = searchedItem.item;
  calculation(); //⚡//
  totalAmount();
}

function handleClearItem(selectedItem) {
  // console.log(selectedItem.id);
  basket = basket.filter((ele) => ele.id !== selectedItem.id);
  totalAmount();
  generateCartItems();
  calculation(); //to update the red number of carts
  localStorage.setItem("data", JSON.stringify(basket));
}

function clearAll() {
  if (basket.length > 0) {
    basket = [];
  } else {
    return;
  }
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket)); // we update data in local storage
}

function totalAmount() {
  if (basket.length !== 0) {
    let amount = basket
      .map((ele) => {
        let { id, item } = ele;
        const search = shopItemData.find((x) => x.id === id) || [];
        console.log(search);
        return item * search.price;
      })
      .reduce((acc, cur) => acc + cur, 0);
    label.innerHTML = `
      <h2>total bill : $ ${amount}</h2> 
      <button class="checkout">checkout</button>
      <button onclick="clearAll()" class="removeAll">clear cart</button>
    `;
  } else {
    return;
  }
}

totalAmount();
