var listProductCart = [];

var bikeLists = document.querySelectorAll('.bike__desc')

var productLists = document.querySelectorAll('.phukien__item');

var quantity = 0;

var total = 0;
// Add click for button Payment
var buttonPay = document.querySelector('.btn__pay');
buttonPay.addEventListener('click', payBill);

var openCart = document.querySelector('.header-nav__cart');
openCart.addEventListener('click', function () {
   addItemToCartList();
});

// Read the product and add to List
bikeLists.forEach(function (item, index) {
   console.log(index);
   let object = {
      name: item.getElementsByClassName('desc__title')[0].innerText,
      cost: item.getElementsByClassName('desc__cost')[0].innerText,
      count: 0
   }
   listProductCart.push(object);
});
productLists.forEach(function (item) {
   var object = {
      name: item.getElementsByClassName('phukien__title')[0].innerText,
      cost: item.getElementsByClassName('phukien__cost')[0].innerText,
      count: 0
   }
   listProductCart.push(object);
});

// Link tag to class .cart__list
// Add Item to List Bill
function addItemToCartList() {
   let listCarts = document.querySelector(".cart__list");
   listCarts.innerHTML = '';
   console.log(listCarts);
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
         <div class="btn--icon">
            <button class="cart__item__minus" onclick="changeQuantity(false, ${index})">
               <i class="fa-solid fa-minus"></i>
            </button>
            <div class="cart__item__quantity">${item.count}</div>
            <button class="cart__item__plus" onclick="changeQuantity(true, ${index})">
               <i class="fa-solid fa-plus"></i>
            </button>
            <button class="cart__item__delete" onclick="deleteItem(${index})">
               <i class="fa-solid fa-trash"></i>
            </button>
         </div>
      `;
         listCarts.appendChild(newList);
      }
   });
   calculatorTotal();
   showQuantity();
}
function showQuantity() {
   let count = 0;
   let quantity = document.getElementById('cart_quantity')
   listProductCart.forEach(function (product) {
      if (product.count !== 0) {
         count++;
      }
   });
   if (count != 0) {
      quantity.style.display = 'block';
      quantity.innerText = count;
   } else {
      quantity.style.display = 'none';
   }
}

// Calculator cost each product in Cart
function calculatorTotal() {
   total = 0;
   listProductCart.forEach(function (item) {
      let cost = parseInt(item.cost.replace(/\./g, ""), 10);
      total += cost * item.count;
   })
   showTotal();
};

// Add Tag to Total Bill(Inside Cart-Container)
function showTotal() {
   if (total !== 0) {
      let cartLists = document.querySelector('.cart__list');
      let divSeparator = document.createElement('li');
      divSeparator.className = 'cart-separator';
      cartLists.appendChild(divSeparator);

      let divTotal = document.createElement('li');
      divTotal.className = 'total_container';
      divTotal.innerHTML = `
      <h4 class="total__title">Tổng tiền: </h4>
      <p class="total__num">${convertToCurrency(total)}</p>
      `;
      cartLists.appendChild(divTotal);
      buttonPay.style.display = 'block';
   } else
      buttonPay.style.display = 'none';
}

// Delete product from Cart
function deleteItem(index) {
   listProductCart[index].count = 0;
   console.log(listProductCart[index].count);
   addItemToCartList();
}

// Increase Quantity Products
function changeQuantity(increase, index) {
   if (increase != true) {
      if (listProductCart[index].count > 0)
         listProductCart[index].count--;
      else
         deleteItem(index);
   } else {
      listProductCart[index].count++;
   }
   addItemToCartList();
}

// Convert string to currency(VND)
function convertToCurrency(numberStr) {
   const number = parseFloat(numberStr);
   const vndFormatted = number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
   console.log(numberStr);
   return vndFormatted;
}

// Button Pay Onclick
function payBill() {
   if (confirm("Bạn có muốn thanh toán không?")) {
      listProductCart.forEach(function (item) {
         item.count = 0;
      })
      addItemToCartList();
   }
}


