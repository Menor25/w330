import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam('category');

const categoryTitle = document.querySelector('.title');
if (categoryTitle) {
    categoryTitle.textContent = category;
}

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");


const productList = new ProductList(category, dataSource, listElement);

productList.init();
