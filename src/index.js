import { isDevelopmentMode, mockOrders } from './mockData.js';

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById("showStatsButton");

    button.addEventListener("click", function() {
        if (isDevelopmentMode()) {
            fetchMockedOrders(); // Call the mock function for development
        } else {
            fetchOrders(); // Call the real fetch function for production
        }
    });

    // Mock function to simulate fetching data from the API
    function fetchMockedOrders() {
        const mockData = mockOrders;
        // Simulate a delay (like an actual network request)
        setTimeout(() => {
            console.log("Fetched mocked orders:", mockData);
            storeOrdersData(mockData);
            openNewTab();
        }, 1000); // 1-second delay to mimic a real request
    }

    // Function to fetch orders from the real API
    function fetchOrders() {
        fetch('https://www.rohlik.cz/api/v3/orders/delivered?limit=100')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched orders:", data);
                storeOrdersData(data);
                openNewTab();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function storeOrdersData(orders) {
        // Example: Storing the fetched or mocked data in local storage
        localStorage.setItem('ordersData', JSON.stringify(orders));
        console.log("Orders data stored.");
    }

       // Function to open a new tab
    function openNewTab() {
        chrome.tabs.create({ url: chrome.runtime.getURL('stats.html') });
    }
});
