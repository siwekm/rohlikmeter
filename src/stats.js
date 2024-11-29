import {
    loadOrders,
    populateOrderSelect,
    getOrdersInRange
} from './orderUtils.js';
import {
    fetchOrderDetails,
} from './RohlikService.js';
import {
    displayAggregatedItemData,
} from './displayService.js';

let categoryChartInstances = [];

document.addEventListener('DOMContentLoaded', async function () {
    const fromOrderSelect = document.getElementById('fromOrderSelect');
    const toOrderSelect = document.getElementById('toOrderSelect');
    const fetchOrderDetailsButton = document.getElementById('fetchOrderDetails');
    const orderDetailsDiv = document.getElementById('orderDetails');

    // Load and populate orders
    const orders = await loadOrders();
    populateOrderSelect(orders, fromOrderSelect, toOrderSelect);

    fetchOrderDetailsButton.addEventListener('click', async () => {
        const fromOrderId = fromOrderSelect.value;
        const toOrderId = toOrderSelect.value;

        if (fromOrderId && toOrderId) {
            const filteredOrders = getOrdersInRange(orders, fromOrderId, toOrderId);
            if (filteredOrders.length) {
                try {
                    await fetchAndDisplayOrderDetails(filteredOrders, orderDetailsDiv);
                } catch (error) {
                    console.error('Error fetching order details:', error);
                    orderDetailsDiv.textContent = 'Error fetching order details. Please try again later.';
                }
            } else {
                orderDetailsDiv.textContent = 'No orders found in the selected range.';
            }
        } else {
            orderDetailsDiv.textContent = 'Please select both a "From" and "To" order.';
        }
    });
});

async function fetchAndDisplayOrderDetails(filteredOrders, orderDetailsDiv) {
    const itemMap = {};

    const orderDetailsArray = await Promise.all(filteredOrders.map(order => fetchOrderDetails(order.id)));

    orderDetailsArray.forEach(order => {
        order.items.forEach(item => {
            const { id, name, priceComposition, amount } = item;
            const itemPrice = priceComposition.total.amount;

            if (!itemMap[id]) {
                itemMap[id] = {
                    id,
                    name,
                    totalAmount: 0,
                    totalPrice: 0,
                };
            }

            itemMap[id].totalAmount += amount;
            itemMap[id].totalPrice += parseFloat(itemPrice);
        });
    });

    const sortedItems = Object.values(itemMap).sort((a, b) => b.totalPrice - a.totalPrice);
    await displayAggregatedItemData(sortedItems, categoryChartInstances);
}
