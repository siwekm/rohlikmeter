chrome.action.onClicked.addListener(() => {
    fetchOrders();

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
                console.error('Failed to fetch orders from rohlik:', error);
            });
    }

    function storeOrdersData(orders) {
        chrome.storage.local.set({ ordersData: JSON.stringify(orders) });
    }

    function openNewTab() {
        chrome.tabs.create({ url: chrome.runtime.getURL('stats.html') });
    }
});
