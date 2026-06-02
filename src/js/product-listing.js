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

if (category) {
  const formattedCategory = category
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  if (titleElement) {
    titleElement.textContent = formattedCategory;
  }

  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "breadcrumb";
  breadcrumb.innerHTML = formattedCategory;
  document.querySelector("main").prepend(breadcrumb);

  productList.init().then(() => {
    const numItems = listElement.querySelectorAll(".product-card").length;
    breadcrumb.innerHTML = `${formattedCategory} -> (${numItems} items)`;
  });
} else {
  productList.init();
}
