import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      >
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

const sorters = {
  asc: (a, b) => a.FinalPrice - b.FinalPrice,
  desc: (a, b) => b.FinalPrice - a.FinalPrice,
  name: (a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand),
};

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);

    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const sorted = sorters[e.target.value]
          ? [...this.products].sort(sorters[e.target.value])
          : this.products;
        this.renderList(sorted);
      });
    }
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }
}
