import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";

interface SelectYearInterface {
    value: string;
    onChange: (value: string) => void;
}

const SelectYear: React.FC<SelectYearInterface> = ({ value, onChange }) => {
    const years = ["All", "2023", "2024", "2025", "2026", "2027"];
    return (
        <IonItem className="w-full">
            <IonSelect label="Year" labelPlacement="floating" value={value} onIonChange={(e) => onChange(e.detail.value!)}>
                {years.map((year) => (
                    <IonSelectOption key={`select-year-${year}`} value={year}>{year}</IonSelectOption>
                ))}
            </IonSelect>
        </IonItem>
    );
}

export default SelectYear;