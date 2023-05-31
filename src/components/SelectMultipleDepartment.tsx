import { IonSelect, IonSelectOption } from "@ionic/react";
import { DepartmentInterface } from "../features/department-features/types/department-type";
import useQueryActiveDepartment from "../hooks/useQueryActiveDepartment";

interface SelectMultipleDepartmentProps {
    value: string[];
    handleChange: (departmentId: string[]) => void;
    label?: string;
}

const SelectMultipleDepartment: React.FC<SelectMultipleDepartmentProps> = ({ value, handleChange, label = "Department" }) => {
    const { isLoading, data } = useQueryActiveDepartment();
    return (
        <IonSelect value={value} label={label} labelPlacement="stacked" onIonChange={e => handleChange(e.detail.value!)} multiple interface="popover">
            {isLoading ? (
                <IonSelectOption value="">Select Department</IonSelectOption>
            ) : data?.data?.map((res: DepartmentInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{res.name} ({res.abbreviation})</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectMultipleDepartment;