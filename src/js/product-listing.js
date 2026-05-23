import { getParam, loadHeaderFooter } from "./utils.mjs";

import ProductData from "./ProductData.mjs";

import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(
  category,
  dataSource,
  listElement,
);

const titleElement = document.getElementById("category-title");

if (titleElement && category) {
  titleElement.textContent = category
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

productList.init();