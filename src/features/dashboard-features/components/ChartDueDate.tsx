import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import useQueryChartDueDate from "../hooks/useQueryChartDueDate";
import { differenceInDays, parseISO } from "date-fns";
import ModalDetailDueDate from "./ModalDetailDueDate";

interface ChartDueDateProps {
  year: string;
  month: string;
}

const ChartDueDate: React.FC<ChartDueDateProps> = ({ year, month }) => {
  const { data } = useQueryChartDueDate(year, month);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [dueDate, setDueDate] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const options: ApexOptions = {
    chart: {
      events: {
        dataPointSelection(event, chartContext, config) {
          const label = config.w.config.xaxis.categories[config.dataPointIndex];
          setDueDate(label);
          setIsOpenModal(true);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        distributed: true,
      },
    },
    colors: colors,
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  };

  useEffect(() => {
    if (data?.data) {
      setCategories(data.data.map((res: any) => res.label));

      setColors(
        data.data.map((res: any) => {
          const diffDate: number = differenceInDays(
            parseISO(res.label),
            new Date()
          );
          if (diffDate < 0) {
            return "#fa0019";
          } else if (diffDate === 0) {
            return "#ebb000";
          } else {
            return "#08b530";
          }
        })
      );

      setSeries([
        {
          name: "Expect Due Date",
          data: data.data.map((res: any) => res.total),
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    console.log({ series, categories });
  }, [series, categories]);

  return (
    <>
      <Chart type="bar" series={series} options={options} height={400} />
      {dueDate && (
        <ModalDetailDueDate
          isOpen={isOpenModal}
          dueDate={dueDate}
          onDidDismiss={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default ChartDueDate;
