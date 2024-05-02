import ShimmerEffect from "../modules/shimmerEffect.js";

const productContainer = document.getElementById('productContainer');

const clearProductContainer = () => {
    productContainer.innerHTML = '';
};

export const fetchProducts = async () => {
    try {
        ShimmerEffect();
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        clearProductContainer();
        return data.categories;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};