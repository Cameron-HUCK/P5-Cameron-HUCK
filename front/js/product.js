// Retrieve the page url and product ID
getParamUrl();
let productId = getParamUrl('id');

// Retrieve product data from the productID API
fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(value) {
	let product = value;

	// Integrate / Inject the data retrieved from the API into the HTML of the page

	// Modification the page image with the product image
	let imgProduct = document.getElementById ("img_origin");
	imgProduct.setAttribute("src", product.imageUrl);
	imgProduct.setAttribute("alt", product.altTxt);

	// Modification the page title with the product name
	let titleProduct = document.getElementById('title');
	titleProduct.textContent = product.name;

	// Modification of the price with the correct price of each product
	let priceProduct = document.getElementById('price');
	priceProduct.textContent = product.price;

	//Modification of the description of each product
	let contentDescription_Product = document.getElementById('description');
	contentDescription_Product.textContent = product.description;

	// Modification of the proposed colors of each product by retrieving each color from the table
	let colorsProduct = product.colors;
	let colors_Select = document.getElementById('colors');
	colorsProduct.forEach(function (element, key) {
		colors_Select[key] = new Option(element);
	});
})

// An error has occurred
.catch(function(err) {
	let messageError = 'Il y a une erreur sur notre page, nous ne trouvons pas le produit';
	messageError = window.alert('Il y a une erreur sur notre page, nous ne trouvons pas le produit');
});

// When the "add basket" button is clicked, I want to add my product to the basket

// Listen to the button
let addButton = document.getElementById('addToCart');
addButton.addEventListener('click', (event) => {
	// Prevent page refresh on click
	event.preventDefault();

	// Retrieve product information to put in the cart
	let qtyProduct = document.getElementById('quantity');
	let productToAdd = {};
	productToAdd._id = productId;
	productToAdd.qty = qtyProduct.value;
	productToAdd.color = document.getElementById('colors').value;

	if(productToAdd.qty > 0) {
		// I retrieve the contents of my basket from the LocalStorage
		getCart();
		let cart = getCart();
		let msgALert = `Le produit a ??t?? ajout?? au panier`;
			msgALert = window.alert(`Le produit a ??t?? ajout?? au panier`);
		// Create a unique product key ID + Color
		let productCartKey = productToAdd._id+'_'+productToAdd.color;
		// We check if the product is already in the cart
		if(cart[productCartKey] == undefined) {
			// We check if the product is already in the cart 
			cart[productCartKey] = productToAdd;
		}else {
			// The product is already in the cart
			cart[productCartKey].qty = parseInt(cart[productCartKey].qty) + parseInt(productToAdd.qty);
		}
		// We send it to the LocalStorage on behalf of 'cart'
		localStorage.setItem("cart", JSON.stringify(cart));
		console.log(cart);	
	}else {
	// If the user did not put a quantity
	let msgALert = `Vous n'avez pas indiqu?? de quantit?? a votre produit`;
	msgALert = window.alert(`Vous n'avez pas indiqu?? de quantit?? a votre produit`);
	}
})

