import productModule from './modules/productModule.js';

document.addEventListener('DOMContentLoaded', async () => {
    await productModule.initializeTabs(); // Wait for tabs to be initialized
});
