import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const alert = new Alert();
alert.getAlerts();

const productList = new ProductList("tents", dataSource, listElement);

productList.init();
