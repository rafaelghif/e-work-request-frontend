import { IonSelect, IonSelectOption } from "@ionic/react";
import { DepartmentInterface } from "../features/department-features/types/department-type";
import useQueryActiveDepartment from "../hooks/useQueryActiveDepartment";

interface SelectDepartmentProps {
    value: string;
    handleChange: (departmentId: string) => void;
    label?: string;
    isDisabled?: boolean;
}

const SelectDepartment: React.FC<SelectDepartmentProps> = ({ value, handleChange, label = "Department", isDisabled = false }) => {
    const { isLoading, data } = useQueryActiveDepartment();
    return (
        <IonSelect value={value} label={label} labelPlacement="stacked" onIonChange={e => handleChange(e.detail.value!)} disabled={isDisabled}>
            {isLoading ? (
                <IonSelectOption value="">Select Department</IonSelectOption>
            ) : data?.data?.map((res: DepartmentInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{res.name}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectDepartment;