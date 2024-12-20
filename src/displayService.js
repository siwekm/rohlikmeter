import Chart from 'chart.js/auto';
import { fetchAndStoreCategories } from './RohlikService.js'; 

export async function displayAggregatedItemData(sortedItems, categoryChartInstances) {
    const tableBody = document.querySelector('#itemsTable tbody');
    tableBody.innerHTML = '';

    const categoryTotals = {
        category0: {},
        category1: {},
        category2: {}
    };

    const categoryPromises = sortedItems.map(async item => {
        const categoryInfo = await fetchAndStoreCategories(item.id);
        item.categoryInfo = categoryInfo;

        ['category0', 'category1', 'category2'].forEach(level => {
            const category = categoryInfo[level];
            categoryTotals[level][category] = (categoryTotals[level][category] || 0) + item.totalPrice;
        });

        return item;
    });

    const itemsWithCategories = await Promise.all(categoryPromises);

    itemsWithCategories.forEach(item => {
        const averagePrice = item.totalPrice / item.totalAmount;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.totalAmount.toFixed(2)}</td>
            <td>${item.totalPrice.toFixed(2)}</td>
            <td>${averagePrice.toFixed(2)}</td>
            <td>${item.categoryInfo.category0}</td>
            <td>${item.categoryInfo.category1}</td>
            <td>${item.categoryInfo.category2}</td>
        `;

        tableBody.appendChild(row);
    });

    renderCategoryPieCharts(categoryTotals, categoryChartInstances);
}

export function renderCategoryPieCharts(categoryTotals, categoryChartInstances) {
    const categories = ['category0', 'category1', 'category2'];
    const categoriesTitle = ['Hlavní kategorie', 'Kategorie', 'Podkategorie'];

    categoryChartInstances.forEach(chart => chart.destroy());
    categoryChartInstances = [];

    categories.forEach((category, index) => {
        const ctx = document.getElementById(`categoryPieChart${index}`).getContext('2d');
        const categoryLabels = Object.keys(categoryTotals[category]);
        const categorySpentAmounts = Object.values(categoryTotals[category]);

        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categoryLabels,
                datasets: [{
                    label: `Spent Amount by ${category}`,
                    data: categorySpentAmounts,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#333',
                            font: { size: 14 }
                        }
                    },
                    title: {
                        display: true,
                        text: categoriesTitle[index],
                        font: { size: 18 }
                    }
                }
            }
        });

        categoryChartInstances.push(chart);
    });
}
