import TruncateString from './common.js';
import ShimmerEffect from './shimmerEffect.js';

const productModule = (() => {
    const productContainer = document.getElementById('productContainer');
 
    const clearProductContainer = () => {
        productContainer.innerHTML = '';
    };
    
    const fetchProducts = async () => {
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


    const renderProductCard = (product) => {
        const { image, badge_text, title, price, compare_at_price } = product;
        const discount = ((compare_at_price - price) / compare_at_price) * 100;

        const productCard = `
            <div class="product-card">

               <img src="${image}" alt="${title}">
               <span class="badge">${badge_text ? badge_text : "On offer"}</span>
           
                <div class="details">
                    <div class="product-title">
                       <h2>${TruncateString(title,11)}</h2>
                        <ul>
                        <li><span class="vendor-dot"></span> John Doe</li>
                       </ul>
                    </div>
                    <div class="product-price">
                        <strong class="price">Rs ${price}</strong>
                        <p class="compare-price">${compare_at_price}.00</p>
                        <p class="discount">${discount.toFixed(2)}% Off</p>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    };
   

    const initializeTabs = async () => {
        const tabs = document.querySelectorAll('.tabs button');
        let activeTab = null;

        tabs.forEach(tab => {
            tab.addEventListener('click', async () => {
                // Clear active class from all tabs
                tabs.forEach(tab => tab.classList.remove('active-tab'));
                // Add active class to clicked tab
                tab.classList.add('active-tab');

                 // Clear background image from previous active tab
                if (activeTab) {
                  activeTab.style.backgroundImage = 'none';
                 }
               
                const category = tab.textContent.toLowerCase();

                // Set the background image dynamically based on the category
                if (category === 'men') {
                    tab.style.backgroundImage = 'url("../images/male.png")';
                    
                } else if (category === 'women') {
                    tab.style.backgroundImage = 'url("../images/female.png")';
                } else if (category === 'kids') {
                    tab.style.backgroundImage = 'url("../images/kits.png")';
                }

                activeTab = tab;

                const products = await fetchProducts();
                const filteredProducts = products?.find(categoryData => categoryData.category_name.toLowerCase() === category)?.category_products;
                filteredProducts?.forEach(product => renderProductCard(product));
            });
        });

        // Simulate a click on the "Men" tab by default
        const menTab = document.getElementById('menTab');
        menTab.click();
    };

    return { initializeTabs };
})();

export default productModule;
