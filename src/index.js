import { isDevelopmentMode, mockOrders } from './mockData.js';

chrome.action.onClicked.addListener(() => {

    if (isDevelopmentMode()) {
        fetchMockedOrders();
    } else {
        fetchOrders();
    }

    // Mock function to simulate fetching data from the API
    function fetchMockedOrders() {
        const mockData = mockOrders;
        setTimeout(() => {
            console.log("Fetched mocked orders:", mockData);
            storeOrdersData(mockData);
            openNewTab();
        }, 1000);
    }

    // Fetch orders rohlik endpoint
    function fetchOrders() {
        fetch('https://www.rohlik.cz/api/v3/orders/delivered?limit=100')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                storeOrdersData(data);
                openNewTab();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function storeOrdersData(orders) {
        chrome.storage.local.set({ ordersData: JSON.stringify(orders) });
    }

    function openNewTab() {
        chrome.tabs.create({ url: chrome.runtime.getURL('stats.html') });
    }
});
