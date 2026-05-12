import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
	const brand = product.Brand && product.Brand.Name ? product.Brand.Name : '';
	const imgSrc = product.Image || '';
	const name = product.Name || product.NameWithoutBrand || '';
	const price = product.FinalPrice != null ? product.FinalPrice : product.ListPrice;
	const productLink = `product_pages/?product=${product.Id}`;

	return `
	<li class="product-card">
		<a href="${productLink}">
			<img src="${imgSrc.replace('../', '')}" alt="${name}" />
			<h3 class="card__brand">${brand}</h3>
			<h2 class="card__name">${name}</h2>
			<p class="product-card__price">$${price}</p>
		</a>
	</li>`;
}

export default class ProductList {
	constructor(category, dataSource, listElement) {
		this.category = category;
		this.dataSource = dataSource;
		this.listElement = listElement;
	}

	async init() {
		const list = await this.dataSource.getData();
		this.renderList(list, 'beforeend', true);
	}

	renderList(list, position = 'afterbegin', clear = false) {
		renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
	}
}