// Chart
"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function ShowChart() {

    /* Language Stats */
    const [data, setData] = useState<Record<string, number> | null>(null);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/chart");
            const json = await res.json();
            setData(json);
        }
        load();
    }, []);

    if (!data) return <p>Loading chart...</p>;

    const labels = Object.keys(data);
    const languageColors: Record<string, string> = {
        Python: "#da5b0b",
        Rust: "#dea584",
        HTML: "#e34c26",
        CSS: "#663399",
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Dockerfile: "#384d54"
    };

    const barChartOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: "#ddffff",
                    font: {
                        size: 14,
                        family: "Inter, sans-serif",
                        weight: "bold"
                    }
                }
            },
            tooltip: {
                bodyColor: "#ffffff",
                titleColor: "#93c5fd",
                bodyFont: {
                    size: 13
                },
                titleFont: {
                    size: 14,
                    weight: "bold"
                },
                callbacks: {
                    label(context) {
                        return ` Usage: ${context.raw}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#d1d5db",
                    font: {
                        size: 12,
                        weight: "bold"
                    }
                }
            },
            y: {
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 12
                    },
                    callback(value) {
                        return `${value}%`;
                    }
                }
            }
        }
    };

    const barChart: ChartData<"bar"> = {
        labels,
        datasets: [
            {
                label: "Languages (%)",
                data: Object.values(data),
                backgroundColor: labels.map(
                    lang => languageColors[lang] ?? "#6b7280"
                ),
                borderRadius: 6
            }
        ]
    };

    return <Bar data={barChart} options={barChartOptions} />;
}