import { IonRow } from "@ionic/react";

interface WorkRequestDetailContainerProps {
    children: React.ReactNode;
}

const WorkRequestDetailContainer: React.FC<WorkRequestDetailContainerProps> = ({ children }) => {
    return (
        <IonRow>
            {children}
        </IonRow>
    );
}

export default WorkRequestDetailContainer;