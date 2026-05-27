document.addEventListener("DOMContentLoaded", function () {
	const supportBtn = document.getElementById("supportBtn");
	const supportBox = document.getElementById("supportBox");
	const closeSupport = document.getElementById("closeSupport");

	const openCart = document.getElementById("openCart");
	const cartPanel = document.getElementById("cartPanel");
	const closeCart = document.getElementById("closeCart");

	const cartItems = document.getElementById("cartItems");
	const cartCount = document.getElementById("cartCount");
	const cartTotal = document.getElementById("cartTotal");

	const buyBtn = document.getElementById("buyBtn");
	const checkoutPage = document.getElementById("checkoutPage");
	const closeCheckout = document.getElementById("closeCheckout");
	const checkoutForm = document.getElementById("checkoutForm");

	let count = 0;
	let total = 0;

	supportBtn.addEventListener("click", function () {
		supportBox.classList.add("active");
	});

	closeSupport.addEventListener("click", function (e) {
		e.stopPropagation();
		supportBox.classList.remove("active");
	});

	openCart.addEventListener("click", function () {
		cartPanel.classList.add("active");
	});

	closeCart.addEventListener("click", function () {
		cartPanel.classList.remove("active");
	});

	document.querySelectorAll(".add-cart").forEach(function (button) {
		button.addEventListener("click", function () {
			const name = button.dataset.name;
			const price = Number(button.dataset.price);

			count++;
			total += price;

			cartCount.textContent = count;
			cartTotal.textContent = total.toFixed(2) + "€";

			button.classList.add("added");

			const productCard = button.closest(".card-product");
			const productImg = productCard.querySelector("img");
			const cartIcon = document.getElementById("openCart");

			if (productImg && cartIcon) {
				const flyingImg = productImg.cloneNode(true);
				const imgRect = productImg.getBoundingClientRect();
				const cartRect = cartIcon.getBoundingClientRect();

				flyingImg.classList.add("flying-product");
				document.body.appendChild(flyingImg);

				flyingImg.style.left = imgRect.left + "px";
				flyingImg.style.top = imgRect.top + "px";
				flyingImg.style.width = imgRect.width + "px";
				flyingImg.style.height = imgRect.height + "px";

				setTimeout(function () {
					flyingImg.style.left = cartRect.left + "px";
					flyingImg.style.top = cartRect.top + "px";
					flyingImg.style.width = "4rem";
					flyingImg.style.height = "4rem";
					flyingImg.style.opacity = "0";
				}, 50);

				setTimeout(function () {
					flyingImg.remove();
				}, 900);
			}

			const item = document.createElement("div");
			item.className = "cart-item";

			item.innerHTML = `
				<div class="cart-item-info">
					<h4>${name}</h4>
					<p>${price.toFixed(2)}€</p>
				</div>

				<button class="remove-item">Eliminar</button>
			`;

			cartItems.appendChild(item);

			item.querySelector(".remove-item").addEventListener("click", function () {
				item.remove();

				count--;
				total -= price;

				cartCount.textContent = count;
				cartTotal.textContent = total.toFixed(2) + "€";
			});
		});
	});

	buyBtn.addEventListener("click", function () {
		if (count === 0) {
			alert("Primero agrega un producto al carrito.");
			return;
		}

		cartPanel.classList.remove("active");
		checkoutPage.classList.add("active");
	});

	closeCheckout.addEventListener("click", function () {
		checkoutPage.classList.remove("active");
	});

	checkoutForm.addEventListener("submit", function (e) {
		e.preventDefault();

		alert("Pedido confirmado. Gracias por tu compra.");

		cartItems.innerHTML = "";
		count = 0;
		total = 0;

		cartCount.textContent = "0";
		cartTotal.textContent = "0.00€";

		document.querySelectorAll(".add-cart").forEach(function (button) {
			button.classList.remove("added");
		});

		checkoutPage.classList.remove("active");
		cartPanel.classList.remove("active");
		checkoutForm.reset();
	});

	document.querySelectorAll(".rating").forEach(function (rating) {
		const stars = rating.querySelectorAll("i");

		stars.forEach(function (star, index) {
			star.addEventListener("click", function () {
				stars.forEach(function (s, i) {
					if (i <= index) {
						s.classList.remove("fa-regular");
						s.classList.add("fa-solid");
						s.classList.add("active");
					} else {
						s.classList.remove("fa-solid");
						s.classList.remove("active");
						s.classList.add("fa-regular");
					}
				});
			});
		});
	});
});