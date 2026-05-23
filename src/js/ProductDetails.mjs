import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails(".product-detail");

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.innerHTML = `
          <section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />

        <p class="product-card__price">$ ${this.product.FinalPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">
            ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>`
    }

    addToCart(event) {
        // get the product details from the data source. You can use the product id stored in the data-id attribute of the button that was clicked (event.target)
        // add the product to the cart. The cart is stored in local storage. You can create a helper function to get and set local storage, or you can write that logic directly in this function.
        // if there are already items in the cart, you will need to add to those items instead of overwriting them.
        const productId = event.target.getAttribute('data-id');
        this.dataSource.findProductById(productId)
            .then((product) => {
                addProductToCart(product);
            });
    }

}

// addProductToCart function does not need to import setLocalStorage from utils.mjs anymore
function addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart");
    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
}
