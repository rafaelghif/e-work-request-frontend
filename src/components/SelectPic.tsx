import { IonSelect, IonSelectOption } from "@ionic/react";
import { UserInterface } from "../features/user-features/types/user-type";
import useQueryPic from "../hooks/useQueryPic";
import { useAppSelector } from "../redux/hook";

interface SelectPicProp {
    value: string;
    handleChange: (personInChargeId: string) => void;
}

const SelectPic: React.FC<SelectPicProp> = ({ value, handleChange }) => {
    const user = useAppSelector((state) => state.user);
    const { isLoading, data } = useQueryPic(user.id);
    return (
        <IonSelect value={value} label="PIC" labelPlacement="stacked" onIonChange={e => handleChange(e.detail.value!)}>
            {isLoading ? (
                <IonSelectOption value="">Select Pic</IonSelectOption>
            ) : data?.data?.map((res: UserInterface) => (
                <IonSelectOption value={res.id} key={res.id}>{`${res.badgeId} - ${res.name}`}</IonSelectOption>
            ))}
        </IonSelect>
    );
}

export default SelectPic;