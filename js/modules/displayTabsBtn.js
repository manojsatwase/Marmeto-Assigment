import { fetchProducts } from "../api/fetchProducts.js";

const displayTabsBtn = async () => {
    const tabsBtn = document.querySelector('.tabs');
    const products = await fetchProducts();

    const tabs = products?.map(product => product.category_name);
    tabs.forEach(tab => {
        const button = document.createElement('button');
        button.classList.add('tab-btn');
        button.id = `${tab}Tab`;
        button.textContent = tab;
        tabsBtn.appendChild(button);
    });
};

export default displayTabsBtn;
