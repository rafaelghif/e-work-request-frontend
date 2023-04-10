import { IonSelect, IonSelectOption } from "@ionic/react";
import { DepartmentInterface } from "../features/department-features/types/department-type";
import useQueryActiveSection from "../hooks/useQueryActiveSection";

interface SelectSectionProps {
    value: string;
    departmentId: string;
    handleChange: (sectionId: string) => void;
}

const SelectSection: React.FC<SelectSectionProps> = ({ value, departmentId, handleChange }) => {
    const { isLoading, data } = useQueryActiveSection(departmentId);
    return (
        <IonSelect value={value} onIonChange={e => handleChange(e.detail.value!)}>
            {isLoading ? (
                <IonSelectOption value="">Select Section</IonSelectOption>
            ) : data?.data?.map((res: DepartmentInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{res.name}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectSection;