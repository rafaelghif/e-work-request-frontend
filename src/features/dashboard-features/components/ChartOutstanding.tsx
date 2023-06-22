import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import useQueryChartOutstanding from "../hooks/useQueryChartOutstanding";
import ModalDetailOutstanding from "./ModalDetailOutstanding";

interface ChartOutstandingProps {
    year: string;
    month: string;
}

const ChartOutstanding: React.FC<ChartOutstandingProps> = ({ year, month }) => {
    const { data } = useQueryChartOutstanding(year, month);
    const [series, setSeries] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [backLogDatas, setBackLogDatas] = useState<{ registrationNumberId: string; label: string; value: number }[]>([]);

    const [registrationNumberId, setRegistrationNumberId] = useState<string>("");
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    const options: ApexOptions = {
        chart: {
            events: {
                dataPointSelection(event, chartContext, config) {
                    const label = config.w.config.labels[config.dataPointIndex];
                    setTitle(label);
                    setRegistrationNumberId(backLogDatas.find((setBackLogData) => setBackLogData.label === label)?.registrationNumberId!);
                    setIsOpenModal(true);
                }
            }
        },
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
        labels: labels,
        dataLabels: {
            formatter: (_, opts) => {
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

    useEffect(() => {
        if (data?.data) {
            setSeries(data.data.map((res: any) => res.value));
            setLabels(data.data.map((res: any) => res.label));
            setBackLogDatas(data.data);
        }
    }, [data]);
    return (<>
        <Chart type="donut" series={series} options={options} height={400} />
        {registrationNumberId && (
            <ModalDetailOutstanding
                isOpen={isOpenModal}
                year={year}
                month={month}
                registrationNumberId={registrationNumberId}
                title={title}
                onDidDismiss={() => setIsOpenModal(false)}
            />
        )}
    </>);
}

export default ChartOutstanding;