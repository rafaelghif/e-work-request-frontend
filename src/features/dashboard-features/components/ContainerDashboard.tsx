import { IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import { Suspense, lazy } from "react";
import Card from "../../../components/Card";

const ChartOutstanding = lazy(() => import("./ChartOutstanding"));
const ChartBackLog = lazy(() => import("./ChartBackLog"));
const ChartDueDate = lazy(() => import("./ChartDueDate"));

const ContainerDashboard: React.FC = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12" sizeLg="6">
                    <Card title="Backlog Status" headerColor="light">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <ChartBackLog />
                        </Suspense>
                    </Card>
                </IonCol>
                <IonCol size="12" sizeLg="6">
                    <Card title="Outstanding Status" headerColor="light">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <ChartOutstanding />
                        </Suspense>
                    </Card>
                </IonCol>
                <IonCol size="12">
                    <Card title="Due Date" headerColor="light">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <ChartDueDate />
                        </Suspense>
                    </Card>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default ContainerDashboard;