import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

type Props = {
    data: {
        month: string;
        total: number;
    }[];
};

export default function UsersLineChart({ data }: Props) {
    const chartData = {
        labels: data.map((x) => x.month),

        datasets: [
            {
                label: "Usuarios registrados",
                data: data.map((x) => x.total),
                borderColor: [
                    "rgb(59, 130, 246)",
                    "rgb(16, 185, 129)",
                    "rgb(245, 158, 11)",
                    "rgb(239, 68, 68)",
                    "rgb(168, 85, 247)",
                ],

                backgroundColor: [
                    "rgba(59, 130, 246, 0.3)",
                    "rgba(16, 185, 129, 0.3)",
                    "rgba(245, 158, 11, 0.3)",
                    "rgba(239, 68, 68, 0.3)",
                    "rgba(168, 85, 247, 0.3)",
                ],

                pointBackgroundColor: [
                    "rgb(37, 99, 235)",
                    "rgb(5, 150, 105)",
                    "rgb(217, 119, 6)",
                    "rgb(220, 38, 38)",
                    "rgb(126, 34, 206)",
                ],

                pointBorderColor: "#000000ff",
                pointBorderWidth: 2,
                pointRadius: 6,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
}