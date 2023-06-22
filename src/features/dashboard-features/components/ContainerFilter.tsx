import SelectYear from "../../../components/SelectYear";
import SelectMonth from "../../../components/SelectMonth";

interface ContainerFilterProps {
    year: string;
    month: string;
    setYearFilter: (value: string) => void;
    setMonthFilter: (value: string) => void;
}

const ContainerFilter: React.FC<ContainerFilterProps> = ({ year, month, setYearFilter, setMonthFilter }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-1/2">
                <div className="flex items-center justify-center p-10 bg-white shadow-md">
                    <SelectYear value={year} onChange={(value) => setYearFilter(value)} />
                    <SelectMonth value={month} onChange={(value) => setMonthFilter(value)} />
                </div>
            </div>
        </div>
    );
}

export default ContainerFilter;