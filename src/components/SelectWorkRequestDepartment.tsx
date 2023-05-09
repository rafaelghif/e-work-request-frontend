import { IonSelect, IonSelectOption } from "@ionic/react";
import useQueryWorkRequestDepartment from "../hooks/useQueryWorkRequestDepartment";

interface SelectWorkRequestDepartmentProps {
    value: string;
    handleChange: (department: string) => void;
}

const SelectWorkRequestDepartment: React.FC<SelectWorkRequestDepartmentProps> = ({ value, handleChange }) => {
    const { isLoading, data } = useQueryWorkRequestDepartment();
    return (
        <IonSelect value={value} label="Department" labelPlacement="start" onIonChange={e => handleChange(e.detail.value!)}>
            <IonSelectOption value="All">All</IonSelectOption>
            {isLoading ? (
                null
            ) : data?.data?.map((res: any) => (
                <IonSelectOption value={res.id} key={`department-${res.id}`}>{res.name}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectWorkRequestDepartment;