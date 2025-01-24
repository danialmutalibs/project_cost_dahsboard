import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ICost } from '../types/Types';
import { getCosts } from '../services/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CostChart: React.FC = () => {
    const [costs, setCosts] = useState<ICost[]>([]);
    const [chartData, setChartData] = useState<any>(null);

    // Fetch cost data on mount
    useEffect(() => {
        getCosts()
            .then((response) => {
                setCosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching costs:', error);
            });
    }, []);

    // Generate chart data
    useEffect(() => {
        if (costs.length > 0) {
            const categories = Array.from(new Set(costs.map((cost) => cost.category)));
            const categoryTotals = categories.map((category) =>
                costs
                    .filter((cost) => cost.category === category)
                    .reduce((sum, cost) => sum + parseFloat(cost.amount.toString()), 0)
            );

            setChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Cost by Category',
                        data: categoryTotals,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [costs]);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <div>
            <h2>Cost Analysis</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Project Costs by Category',
                        },
                    },
                }}
            />
        </div>
    );
};

export default CostChart;
