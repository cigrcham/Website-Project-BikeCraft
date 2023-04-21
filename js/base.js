var listProductCart = [];

var bikeLists = document.querySelectorAll('.bike__desc')
var productLists = document.querySelectorAll('.phukien__item');
var quantity = 0;
var total = 0;

var openCart = document.querySelector('.header-nav__cart');
console.log(openCart);
openCart.addEventListener('click', function () {
   addItemToCartList();
});

bikeLists.forEach(function (item, index) {
   console.log(index);
   let object = {
      name: item.getElementsByClassName('desc__title')[0].innerText,
      cost: item.getElementsByClassName('desc__cost')[0].innerText,
      count: index
   }
   listProductCart.push(object);
});


productLists.forEach(function (item) {
   var object = {
      name: item.getElementsByClassName('phukien__title')[0].innerText,
      cost: item.getElementsByClassName('phukien__cost')[0].innerText,
      count: 3
   }
   listProductCart.push(object);
});


console.log(listProductCart.length);
listProductCart.forEach(function (item) { console.log(item) });


function CalculatorTotal() {
   total = 0;
   listProductCart.forEach(function (item) {
      let cost = parseInt(item.cost.replace(/\./g, ""), 10);
      total += cost * item.count;
   })
};
CalculatorTotal();
console.log(total);


function deleteItem(index) {
   listProductCart[index].count = 0;
   console.log(listProductCart[index].count);
   addItemToCartList();
   CalculatorTotal();
}
var listCarts = document.querySelector(".cart__list");
console.log(listCarts);
listCarts.innerHTML = "";

function addItemToCartList() {
   listCarts.innerHTML = "";
   let a = 1;
   listProductCart.forEach(function (item, index) {
      if (item.count > 0) {
         let newList = document.createElement('li');
         newList.className = 'cart__item';
         newList.innerHTML = `
         <div class="item-top">
            <p class="cart__item__position">${a++}, </p>
            <p class="cart__item__title">${item.name}</p>
         </div>
         <div class="item-bottom">
            <p class="cart__item__cost">${item.cost}</p>
            <button class="cart__item__minus" onclick="increaseQuantity(false, ${index})">-</button>
            <div class="cart__item__quanlity">${item.count}</div>
            <button class="cart__item__plus" onclick="increaseQuantity(true, ${index})">+</button>
            <button class="cart__item__delete" onclick="deleteItem(${index})">
               <i class="fa-solid fa-trash"></i>
            </button>
         </div>
      `;
         listCarts.appendChild(newList);
      }
   });
   CalculatorTotal();
   showTotal();
}


function increaseQuantity(increase, index) {
   if (increase != true && listProductCart[index].count > 0) {
      listProductCart[index].count--;
   } else {
      listProductCart[index].count++;
   }
   CalculatorTotal()
   console.log(total);
   addItemToCartList();
}

var cartContainer = document.querySelector('.cart-container');
var divTotal = document.createElement('div');
divTotal.className = 'cart__total';
console.log(cartContainer);
function showTotal() {

   divTotal.innerHTML = "";

   divTotal.innerHTML = `
   <h4 class="total__title">Tổng tiền: </h4>
   <p class="total__num">${total}</p>
   `;
   cartContainer.appendChild(divTotal);
}