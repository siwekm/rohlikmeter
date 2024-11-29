import { isDevelopmentMode, mockOrderDetails, mockProductCategory } from './mockData.js';

export function fetchOrderDetails(orderId) {
    if (isDevelopmentMode()) {
        return fetchMockedOrderDetails(orderId);
    }
    return fetch(`https://www.rohlik.cz/api/v3/orders/${orderId}`).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

export function fetchMockedOrderDetails(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = mockOrderDetails[orderId];
            if (mockData) {
                resolve(mockData);
            } else {
                reject(new Error('Order not found'));
            }
        }, 200);
    });
}

export function fetchProductCategory(productID) {
    if (isDevelopmentMode()) {
        return fetchMockedProductCategory();
    }
    return fetch(`https://www.rohlik.cz/api/v1/products/${productID}/categories`).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

export function fetchMockedProductCategory() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = mockProductCategory;
            if (mockData) {
                resolve(mockData);
            } else {
                reject(new Error('Order not found'));
            }
        }, 200);
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
