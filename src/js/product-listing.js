import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam } from './utils.mjs';

const category = getParam('category');
const dataSource = new ProductData(category);
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);

productList.init();

// Optional: Update the title to reflect the category
const titleElement = document.querySelector('#category-title');
if (titleElement && category) {
  titleElement.innerHTML = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}
