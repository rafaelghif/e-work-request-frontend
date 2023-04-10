import { IonSelect, IonSelectOption } from "@ionic/react";
import { RegistrationNumberInterface } from "../features/registration-number-features/types/registration-number-type";
import useQueryActiveRegistrationNumber from "../hooks/useQueryActiveRegistrationNumber";

interface SelectRegistrationNumberProps {
    value: string;
    handleChange: (registrationNumberId: string) => void;
}

const SelectRegistrationNumber: React.FC<SelectRegistrationNumberProps> = ({ value, handleChange }) => {
    const { isLoading, data } = useQueryActiveRegistrationNumber();
    return (
        <IonSelect value={value} onIonChange={e => handleChange(e.detail.value!)}>
            <IonSelectOption value="">None</IonSelectOption>
            {isLoading ? (
                <IonSelectOption value="">Select Registration Number</IonSelectOption>
            ) : data?.data?.map((res: RegistrationNumberInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{`${res.format} - ${res.name}`}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectRegistrationNumber;