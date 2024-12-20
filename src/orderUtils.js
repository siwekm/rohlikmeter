
export function populateOrderSelect(orders, fromOrderSelect, toOrderSelect) {
    orders.forEach(order => {
        const fromOption = document.createElement('option');
        fromOption.value = order.id;
        fromOption.textContent = new Date(order.orderTime).toLocaleString();

        const toOption = fromOption.cloneNode(true);

        fromOrderSelect.appendChild(fromOption);
        toOrderSelect.appendChild(toOption);
    });
}

export function getOrdersInRange(orders, fromOrderId, toOrderId) {
    const fromOrder = orders.find(order => order.id === parseInt(fromOrderId));
    const toOrder = orders.find(order => order.id === parseInt(toOrderId));

    if (!fromOrder || !toOrder) {
        return [];
    }

    const fromDate = new Date(fromOrder.orderTime);
    const toDate = new Date(toOrder.orderTime);

    return orders.filter(order => {
        const orderDate = new Date(order.orderTime);
        return orderDate >= fromDate && orderDate <= toDate;
    });
}
