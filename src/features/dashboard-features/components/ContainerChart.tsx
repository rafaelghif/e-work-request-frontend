import { IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import { Suspense, lazy } from "react";
import Card from "../../../components/Card";

const ChartBackLog = lazy(() => import("./ChartBackLog"));
const ChartOutstanding = lazy(() => import("./ChartOutstanding"));
const ChartDueDate = lazy(() => import("./ChartDueDate"));

interface ContainerChartInterface {
    year: string;
    month: string;
}

const ContainerChart: React.FC<ContainerChartInterface> = ({ year, month }) => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="6">
                    <Card title="Chart Backlog">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <ChartBackLog year={year} month={month} />
                        </Suspense>
                    </Card>
                </IonCol>
                <IonCol size="6">
                    <Card title="Chart Outstanding">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <ChartOutstanding year={year} month={month} />
                        </Suspense>
                    </Card>
                </IonCol>
                <IonCol size="12">
                    <Card title="Chart Ticket Due Date">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <ChartDueDate year={year} month={month} />
                        </Suspense>
                    </Card>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default ContainerChart;