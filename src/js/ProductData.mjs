function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.baseURL = import.meta.env.VITE_SERVER_URL;
  }
  async getData(category = this.category) {
    return fetch(this.baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    return fetch(this.baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
}
