import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const ChartDueDate: React.FC = () => {
    const series = [{
        name: "Total",
        data: [5, 6, 4, 7, 5, 4, 1]
    }];

    const options: ApexOptions = {
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        xaxis: {
            categories: ["2023-05-01", "2023-05-02", "2023-05-03", "2023-05-04", "2023-05-05", "2023-05-06", "2023-05-07"],
        },
        plotOptions: {
            bar: {
                borderRadius: 3,
            }
        },
        fill: {
            opacity: 1,
        },
        colors: ["#4ae4ae"],
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${val}`
                }
            }
        },
    }
    return <Chart type="bar" series={series} options={options} height={400} />
}

export default ChartDueDate;