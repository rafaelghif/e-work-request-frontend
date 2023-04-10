import { IonSelect, IonSelectOption } from "@ionic/react";
import useQueryWorkRequestYear from "../hooks/useQueryWorkRequestYear";

interface SelectWorkRequestYearProps {
    value: string;
    handleChange: (year: string) => void;
}

const SelectWorkRequestYear: React.FC<SelectWorkRequestYearProps> = ({ value, handleChange }) => {
    const { isLoading, data } = useQueryWorkRequestYear();
    return (
        <IonSelect value={value} onIonChange={e => handleChange(e.detail.value!)}>
            <IonSelectOption value="All">All</IonSelectOption>
            {isLoading ? (
                null
            ) : data?.data?.map((res: number) => (
                <IonSelectOption value={res.toString()} key={`year-${res}`}>{res}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectWorkRequestYear;