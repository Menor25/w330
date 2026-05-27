// import { setLocalStorage, getLocalStorage } from './utils.mjs';

// export default class ProductDetails {
//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }

//   async init() {
//     // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//     this.product = await this.dataSource.findProductById(this.productId);
//     // the product details are needed before rendering the HTML
//     this.renderProductDetails('main');
//     // once the HTML is rendered, add a listener to the Add to Cart button
//     document.getElementById('addToCart')
//       .addEventListener('click', this.addToCart.bind(this));
//   }

//   addToCart() {
//     let cart = getLocalStorage('so-cart');
//     if (!cart) {
//       cart = [];
//     }
//     cart.push(this.product);
//     setLocalStorage('so-cart', cart);
//   }

//   renderProductDetails(selector) {
//     const element = document.querySelector(selector);
//     element.innerHTML = `<section class="product-detail">
//         <h3>${this.product.Brand.Name}</h3>
//         <h2 class="divider">${this.product.NameWithoutBrand}</h2>
//         <img
//           class="divider"
//           src="${this.product.Image}"
//           alt="${this.product.NameWithoutBrand}"
//         />
//         <p class="product-card__price">$${this.product.FinalPrice}</p>
//         <p class="product__color">${this.product.Colors[0].ColorName}</p>
//         <p class="product__description">
//           ${this.product.DescriptionHtmlSimple}
//         </p>
//         <div class="product-detail__add">
//           <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
//         </div>
//       </section>`;
//   }

import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;

    this.product = {};

    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");

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
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.NameWithoutBrand}"
        />

        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">
            Add to Cart
          </button>
        </div>
      </section>`;
  }

  addToCart() {
    let cartItems = getLocalStorage('so-cart');
    if (!cartItems) cartItems = [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    // notify the user
    try {
      alertMessage({ info: 'Item added to cart' }, true);
    } catch (e) {
      /* ignore */
    }
  }
}