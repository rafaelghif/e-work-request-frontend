import { IonCol, IonGrid, IonRow, IonSpinner, } from "@ionic/react";
import { Suspense, lazy, useState } from "react";
import ContainerFilter from "./ContainerFilter";

const ContainerChart = lazy(() => import("./ContainerChart"));

const ContainerDashboard: React.FC = () => {
    const currentDate = new Date();
    const [yearFilter, setYearFilter] = useState<string>(currentDate.getFullYear().toString());
    const [monthFilter, setMonthFilter] = useState<string>((currentDate.getMonth() + 1).toString());
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <ContainerFilter year={yearFilter} month={monthFilter} setYearFilter={(value) => setYearFilter(value)} setMonthFilter={(value) => setMonthFilter(value)} />
                </IonCol>
                <IonCol size="12">
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <ContainerChart year={yearFilter} month={monthFilter} />
                    </Suspense>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default ContainerDashboard;