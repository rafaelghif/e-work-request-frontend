import { IonSelect, IonSelectOption } from "@ionic/react";
import useQueryWorkRequestType from "../hooks/useQueryWorkRequestType";

interface SelectWorkRequestTypeProps {
    value: string;
    handleChange: (type: string) => void;
}

const SelectWorkRequestType: React.FC<SelectWorkRequestTypeProps> = ({ value, handleChange }) => {
    const { isLoading, data } = useQueryWorkRequestType();
    return (
        <IonSelect value={value} label="Type" labelPlacement="start" onIonChange={e => handleChange(e.detail.value!)}>
            <IonSelectOption value="All">All</IonSelectOption>
            {isLoading ? (
                null
            ) : data?.data?.map((res: any) => (
                <IonSelectOption value={res.id} key={`type-${res.id}`}>{res.format}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectWorkRequestType;