import { coffee } from "@/interfaces";
import { createStore } from "vuex";
import { createLogger } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    coffees: [] as coffee[],
  },
  getters: {
    numberOfProductsInCart(state) {
      return state.coffees.filter((coffee) => coffee.amountInBasket !== 0)
        .length;
    },
    totalPrice(state) {
      let total = 0;
      state.coffees.forEach(
        (product) => (total += product.amountInBasket * product.price)
      );
      return total.toFixed(2);
    },
    getProductsInBasket(state) {
      return state.coffees.filter((coffee) => coffee.amountInBasket !== 0);
    },
  },
  mutations: {
    addToCart(state, coffee: coffee) {
      if (coffee.amountInBasket === 0) {
        coffee.amountInBasket = coffee.amountSelected;
        coffee.amountSelected = 1;
      } else {
        coffee.amountInBasket += coffee.amountSelected;
        coffee.amountSelected = 1;
      }
    },
    deleteProductFromCard(state, coffee: coffee) {
      coffee.amountInBasket = 0;
    },
    setProducts(state, products) {
      state.coffees = products.map((p: coffee) => {
        p.amountInBasket = 0;
        p.amountSelected = 1;
        return p;
      });
    },
  },
  actions: {
    async getProducts(context) {
      const { data } = await axios.get("http://localhost:8080/api/products");
      context.commit("setProducts", data);
    },
  },
  modules: {},
  plugins: [createLogger()],
});
