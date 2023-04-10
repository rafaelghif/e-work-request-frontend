import { IonSelect, IonSelectOption } from "@ionic/react";
import useQueryWorkRequestMonth from "../hooks/useQueryWorkRequestMonth";

interface SelectWorkRequestMonthProps {
    value: string;
    handleChange: (month: string) => void;
}

const SelectWorkRequestMonth: React.FC<SelectWorkRequestMonthProps> = ({ value, handleChange }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { isLoading, data } = useQueryWorkRequestMonth();
    return (
        <IonSelect value={value} onIonChange={e => handleChange(e.detail.value!)}>
            <IonSelectOption value="All">All</IonSelectOption>
            {isLoading ? (
                null
            ) : data?.data?.map((res: number) => (
                <IonSelectOption value={res.toString()} key={`month-${res}`}>{months[res - 1]}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectWorkRequestMonth;