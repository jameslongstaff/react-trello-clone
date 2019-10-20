import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError
} from "actions";

const apiUrl = "https://exampleapi.com/products";

function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsPending());
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchProductsSuccess(res.products));
        return res.products;
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export default fetchProducts;
