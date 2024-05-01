const ShimmerEffect = () => {
    const productContainer = document.getElementById('productContainer');
    const shimmerHTML = Array.from({ length: 4 }, () => '<div class="skeleton-box"></div>').join('');
    productContainer.innerHTML = shimmerHTML;
};

export default ShimmerEffect;
