import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const ChartOutstanding: React.FC = () => {
    const series = [44, 55, 41, 17, 15];
    const options: ApexOptions = {
        theme: {
            palette: "palette3"
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true
                        }
                    }
                }
            }
        },
        dataLabels: {
            formatter: (val, opts) => {
                return opts.w.config.series[opts.seriesIndex]
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: "bottom"
                }
            }
        }]
    }
    return <Chart type="donut" series={series} options={options} height={400} />
}

export default ChartOutstanding;