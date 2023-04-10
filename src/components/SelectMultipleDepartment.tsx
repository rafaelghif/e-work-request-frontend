import {  IonSelect, IonSelectOption } from "@ionic/react";
import { DepartmentInterface } from "../features/department-features/types/department-type";
import useQueryActiveDepartment from "../hooks/useQueryActiveDepartment";

interface SelectMultipleDepartmentProps {
    value: string[];
    handleChange: (departmentId: string[]) => void;
}

const SelectMultipleDepartment: React.FC<SelectMultipleDepartmentProps> = ({ value, handleChange }) => {
    const { isLoading, data } = useQueryActiveDepartment();
    return (
        <IonSelect value={value} onIonChange={e => handleChange(e.detail.value!)} multiple interface="popover">
            {isLoading ? (
                <IonSelectOption value="">Select Department</IonSelectOption>
            ) : data?.data?.map((res: DepartmentInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{res.name}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectMultipleDepartment;