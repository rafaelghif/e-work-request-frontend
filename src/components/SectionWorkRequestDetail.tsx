import { IonCol } from "@ionic/react";

interface SectionWorkRequestDetailProps {
    title: string;
    children: React.ReactNode;
    size?: string
    sizeMd?: string;
}

const SectionWorkRequestDetail: React.FC<SectionWorkRequestDetailProps> = ({ title, children, size = "12", sizeMd = "4" }) => {
    return (
        <IonCol size={size} sizeMd={sizeMd}>
            <div className="flex flex-col gap-2 px-5 py-3">
                <div className="border-b">
                    <span className="text-lg font-bold">{title}</span>
                </div>
                {children}
            </div>
        </IonCol>
    );
}

export default SectionWorkRequestDetail;

