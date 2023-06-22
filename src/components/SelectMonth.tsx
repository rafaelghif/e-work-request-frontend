import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";

interface SelectMonthInterface {
    value: string;
    onChange: (value: string) => void;
}

const SelectMonth: React.FC<SelectMonthInterface> = ({ value, onChange }) => {
    const months = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <IonItem className="w-full">
            <IonSelect label="Month" labelPlacement="floating" value={value} onIonChange={(e) => onChange(e.detail.value!)}>
                {months.map((month, index) => (
                    <IonSelectOption key={`select-month-${month}`} value={index.toString()}>{month}</IonSelectOption>
                ))}
            </IonSelect>
        </IonItem>
    );
}

export default SelectMonth;