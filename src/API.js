const BASE_URL = 'https://fakestoreapi.com/';
const postMethod = {
    method: 'POST',
}
const apiSettings = {
    //fetchAllProducts
    fetchProducts : async () => {
        const endpoint = `${BASE_URL}products`;
        return await (await fetch(endpoint)).json();
    },
    //fetchSingleProduct
    fetchProduct: async (id) => {
        const endpoint = `${BASE_URL}products/${id}`;
        return await (await fetch(endpoint)).json();
    },
    //fetchAllCategories
    fetchCategories: async () => {
        const endpoint = `${BASE_URL}products/categories`;
        return await (await fetch(endpoint)).json();
    },
    fetchCategory : async (id) => {
        const endpoint = `${BASE_URL}products/category/${id}`;
        return await (await fetch(endpoint)).json();
    },
}

export default apiSettings;