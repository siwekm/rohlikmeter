import { isDevelopmentMode, mockOrders, mockOrderDetails, mockProductCategory } from './mockData.js';
//import Chart from 'chart.js'; 

document.addEventListener('DOMContentLoaded', function () {
    const fromOrderSelect = document.getElementById('fromOrderSelect');
    const toOrderSelect = document.getElementById('toOrderSelect');
    const fetchOrderDetailsButton = document.getElementById('fetchOrderDetails');
    const orderDetailsDiv = document.getElementById('orderDetails');

    // Load orders from local storage or use mock data if in development
    const orders = isDevelopmentMode() ? mockOrders : JSON.parse(localStorage.getItem('ordersData')) || [];

    // Populate both dropdowns with order dates
    orders.forEach(order => {
        const fromOption = document.createElement('option');
        fromOption.value = order.id;
        fromOption.textContent = new Date(order.orderTime).toLocaleString();

        const toOption = fromOption.cloneNode(true); // Same value for the 'to' dropdown

        fromOrderSelect.appendChild(fromOption);
        toOrderSelect.appendChild(toOption);
    });

    // Add event listener to fetch orders within the selected date range
    fetchOrderDetailsButton.addEventListener('click', function () {
        const fromOrderId = fromOrderSelect.value;
        const toOrderId = toOrderSelect.value;

        if (fromOrderId && toOrderId) {
            const filteredOrders = getOrdersInRange(fromOrderId, toOrderId);
            fetchAndDisplayOrderDetails(filteredOrders);
        } else {
            orderDetailsDiv.textContent = 'Please select both a "From" and "To" order.';
        }
    });

    // Function to get orders between the selected "From" and "To" dates
    function getOrdersInRange(fromOrderId, toOrderId) {
        const fromOrder = orders.find(order => { return order.id === parseInt(fromOrderId)});
        const toOrder = orders.find(order => order.id === parseInt(toOrderId));

        if (!fromOrder || !toOrder) {
            return [];
        }

        const fromDate = new Date(fromOrder.orderTime);
        const toDate = new Date(toOrder.orderTime);

        // Filter orders that fall between the selected dates (inclusive)
        return orders.filter(order => {
            const orderDate = new Date(order.orderTime);
            return orderDate >= fromDate && orderDate <= toDate;
        });
    }


    function fetchOrderDetails(orderId) {
        if (isDevelopmentMode()) {
            return fetchMockedOrderDetails(orderId);
        } else {
            return fetch(`https://www.rohlik.cz/api/v3/orders/${orderId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                });
        }
    }

    function fetchMockedOrderDetails(orderId) {
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

    function fetchProductCategory(productID) {
        if (isDevelopmentMode()) {
            return fetchMockedProductCategory();
        } else {
            return fetch(`https://www.rohlik.cz/api/v1/products/${productID}/categories`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                });
        }
    }

    function fetchMockedProductCategory() {
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

    function fetchAndStoreCategories(productID) {
        return fetchProductCategory(productID)
            .then(productData => {
                // Extract categories 0, 1, and 2
                const categoryLevels = productData.categories.filter(category => category.level <= 2);
    
                // Create an object to store category names based on levels
                const categoryInfo = {
                    category0: categoryLevels.find(category => category.level === 0)?.name || 'N/A',
                    category1: categoryLevels.find(category => category.level === 1)?.name || 'N/A',
                    category2: categoryLevels.find(category => category.level === 2)?.name || 'N/A'
                };
    
                return categoryInfo; // Return the extracted category data
            })
            .catch(error => {
                console.error('Error fetching product category:', error);
                return { category0: 'N/A', category1: 'N/A', category2: 'N/A' }; // Default in case of error
            });
    }

    // Function to fetch and display order details for the filtered orders
    function fetchAndDisplayOrderDetails(filteredOrders) {
        const itemMap = {};
        //console.log(filteredOrders);
        // Fetch details for each order and aggregate the items
        Promise.all(
            filteredOrders.map(order => fetchOrderDetails(order.id))
        )
        .then(orderDetailsArray => {
            // Aggregate item data from all fetched order details
            orderDetailsArray.forEach(order => {
                order.items.forEach(item => {
                    //console.log(item);
                    const itemId = item.id;
                    const itemName = item.name;
                    const itemPrice = item.priceComposition.total.amount;
                    const itemQuantity = item.amount;

                    if (!itemMap[itemId]) {
                        itemMap[itemId] = {
                            id: itemId,
                            name: itemName,
                            totalAmount: 0,
                            totalPrice: 0,
                        };
                    }

                    itemMap[itemId].totalAmount += itemQuantity;
                    itemMap[itemId].totalPrice += parseFloat(itemPrice);
                });
            });

            // Convert item map to an array and sort by total amount
            const sortedItems = Object.values(itemMap).sort((a, b) => parseFloat(b.totalPrice) - parseFloat(a.totalPrice));
            console.log(sortedItems);
            displayAggregatedItemData(sortedItems);
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
            orderDetailsDiv.textContent = 'Error fetching order details. Please try again later.';
        });
    }

    // Function to populate the table with aggregated item data
    function displayAggregatedItemData(sortedItems) {
        const tableBody = document.querySelector('#itemsTable tbody');
        tableBody.innerHTML = ''; // Clear any existing rows

        const categoryTotals = {
            category0: {},
            category1: {},
            category2: {}
        };

        // Function to handle all fetches for categories
        // Function to handle all fetches for categories
        const categoryPromises = sortedItems.map(item => {
            return fetchAndStoreCategories(item.id).then(categoryInfo => {
                // Add category information to the item
                item.categoryInfo = categoryInfo;

                // Aggregate totalPrice by category (level 0, 1, and 2)
                const { category0, category1, category2 } = categoryInfo;

                // For category level 0
                if (!categoryTotals.category0[category0]) {
                    categoryTotals.category0[category0] = 0;
                }
                categoryTotals.category0[category0] += item.totalPrice;

                // For category level 1
                if (!categoryTotals.category1[category1]) {
                    categoryTotals.category1[category1] = 0;
                }
                categoryTotals.category1[category1] += item.totalPrice;

                // For category level 2
                if (!categoryTotals.category2[category2]) {
                    categoryTotals.category2[category2] = 0;
                }
                categoryTotals.category2[category2] += item.totalPrice;

                return item; // Return the item with categories
            });
        });

        Promise.all(categoryPromises)
            .then(itemsWithCategories => {
                renderCategoryPieChart(categoryTotals);

                // Now that we have all the category data, insert rows into the table
                itemsWithCategories.forEach(item => {
                    const averagePrice = item.totalPrice / item.totalAmount;
                    console.log(item);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.totalAmount.toFixed(2)}</td>
                        <td>${item.totalPrice.toFixed(2)}</td>
                        <td>${averagePrice.toFixed(2)}</td>
                        <td>${item.categoryInfo.category0} </td>
                        <td>${item.categoryInfo.category1} </td>
                        <td>${item.categoryInfo.category2} </td>
                        `;
                    // Append the row to the table
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }

    // Function to render the pie chart
    
    function renderCategoryPieChart(categoryTotals) {
        const ctx = document.getElementById('categoryPieChart').getContext('2d');

        // Prepare the data for the pie chart
        const categoryLabels = Object.keys(categoryTotals.category0); // You can choose category0, category1, or category2 here
        const categorySpentAmounts = Object.values(categoryTotals.category0);

        const data = {
            labels: categoryLabels,
            datasets: [{
                label: 'Spent Amount by Category',
                data: categorySpentAmounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Create the pie chart
        /*
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                const total = categorySpentAmounts.reduce((a, b) => a + b, 0);
                                const value = categorySpentAmounts[tooltipItem.dataIndex];
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${categoryLabels[tooltipItem.dataIndex]}: ${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        */
    }

});
