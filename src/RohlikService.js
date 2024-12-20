export async function fetchOrders() {
    try {
        const response = await fetch('https://www.rohlik.cz/api/v3/orders/delivered?limit=100');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch orders from Rohlik:', error);
        throw error;
    }
}

export function fetchOrderDetails(orderId) {
    return fetch(`https://www.rohlik.cz/api/v3/orders/${orderId}`).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

export function fetchProductCategory(productID) {
    return fetch(`https://www.rohlik.cz/api/v1/products/${productID}/categories`).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

export async function fetchAndStoreCategories(productID) {
    try {
        const productData = await fetchProductCategory(productID);
        const categoryLevels = productData.categories.filter(category => category.level <= 2);

        return {
            category0: categoryLevels.find(category => category.level === 0)?.name || 'N/A',
            category1: categoryLevels.find(category => category.level === 1)?.name || 'N/A',
            category2: categoryLevels.find(category => category.level === 2)?.name || 'N/A',
        };
    } catch (error) {
        console.error('Error fetching product category:', error);
        return { category0: 'N/A', category1: 'N/A', category2: 'N/A' };
    }
}
