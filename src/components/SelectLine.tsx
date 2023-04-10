import { IonSelect, IonSelectOption } from "@ionic/react";
import { LineInterface } from "../features/line-features/types/line-type";
import useQueryActiveLine from "../hooks/useQueryActiveLine";

interface SelectLineProps {
    value: string;
    departmentId: string;
    handleChange: (lineId: string) => void;
}

const SelectLine: React.FC<SelectLineProps> = ({ value, departmentId, handleChange }) => {
    const { isLoading, data } = useQueryActiveLine(departmentId);
    return (
        <IonSelect value={value} onIonChange={e => handleChange(e.detail.value!)}>
            <IonSelectOption value="">None</IonSelectOption>
            {isLoading ? (
                <IonSelectOption value="">Select Line</IonSelectOption>
            ) : data?.data?.map((res: LineInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{res.name}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectLine;