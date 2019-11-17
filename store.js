const nowa = '6285211772862';

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    var addToCartItem = document.getElementsByClassName('shop-item')
    for (var i = 0; i < addToCartItem.length; i++) {
        var button = addToCartItem[i]
        button.addEventListener('click', addItemToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', pesanClicked);
    document.getElementsByClassName('btn-purchase')[1].addEventListener('click', openNav);
}

const check = document.getElementById('chk');
const shipping = document.querySelector('div.penerima');

check.addEventListener('click',function(){
if(check.checked){
  shipping.style.display="none";
}else{
  shipping.style.display="block";
}
});

function pesanClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var billing = document.querySelector('div.overlay');
    var send = [];
    var total = cartItems.parentElement.getElementsByClassName('cart-total-price')[0].innerText;
    
    while (cartItems.hasChildNodes()) {
        var title = cartItems.getElementsByClassName('cart-item-title')[0].innerText
        var price = cartItems.getElementsByClassName('cart-price')[0].innerText
        var jumlah = cartItems.getElementsByClassName('cart-quantity-input')[0].value
        var senditem = [title,price,jumlah];
        send.push(senditem);
        cartItems.removeChild(cartItems.firstChild)
    }

    send.push();
    senditem="";
    send.forEach(function(item){
        senditem += '*=>'+item[0]+'('+item[2]+')%20'+item[1]+',-*%0A';
    });

    let sendwa =nowa+"?text=_Assalamualaikum%20kak_%0ASaya%20mau%20pesan%0A"+senditem.replace(' ','%20')+"Jumlah%20%3A%20"+total.replace(' ','%20')";

    var nama = billing.querySelector('input#nama').value;
    if(check.checked){
      var penerima = nama;
    }else{
      var penerima = billing.querySelector('div.penerima input.nama').value;
    }
    var kelas = billing.querySelector('input#kelas').value;
    var pesan = billing.querySelector('input#pesan').value;

//     let sendform = "usp=pp_url&entry.1267846692="+nama+"&entry.2034809671="+penerima+"&entry.562212773="+kelas+"&entry.564560779="+pesan+"&entry.138549484="+senditem+"&entry.2030230827="+total;
    sendwa += "Nama%20%3A%20"+nama.replace(" ","%20")+"%0APenerima%20%3A%20"+penerima.replace(" ","%20")+"%0AKelas%20%3A%20"+kelas.replace(" ","%20")+"%0APesan%20%3A%20"+pesan.replace(" ","%20")+"%0A%0A";

    // alert(senwa);
    // console.log(nama+penerima+kelas+pesan);
    // console.log(senditem);
    window.open("https://wa.me/"+sendwa);  //fill form
//     window.open("https://docs.google.com/forms/d/e/1FAIpQLSdEs02aZeRVjhp16xoTkt1hXCJ8u_590CUryl7YgUQFl40J5w/formResponse?"+sendform);
    updateCartTotal();
    closeNav();
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCartClicked(event) {
    var title = event.target.getElementsByClassName('shop-item-title')[0].innerText
    var price = event.target.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = event.target.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('Sudah ada di keranjang')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">IDR ${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">HAPUS</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('IDR', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'IDR ' + total
}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
