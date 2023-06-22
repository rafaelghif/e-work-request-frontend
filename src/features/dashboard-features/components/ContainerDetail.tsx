import { ExpanderComponentProps } from "react-data-table-component";
import Card from "../../../components/Card";
import { TicketDetailInterface } from "../../../types/work-request-type";
import WorkRequestDetailContainer from "../../../components/WorkRequestDetailContainer";
import { IonSpinner } from "@ionic/react";
import { Suspense, lazy } from "react";
import SectionWorkRequestDetail from "../../../components/SectionWorkRequestDetail";

const TimelineWorkRequest = lazy(() => import("../../../components/TimelineWorkRequest"));

const ContainerDetail: React.FC<ExpanderComponentProps<TicketDetailInterface>> = ({ data }) => {
    return (
        <Card title={`Detail ${data.ticketNumber}`}>
            <WorkRequestDetailContainer>
                <SectionWorkRequestDetail title="Timeline" size="12" sizeMd="12">
                    <Suspense fallback={<IonSpinner name="crescent" />}>
                        <TimelineWorkRequest ticketId={data.ticketId} />
                    </Suspense>
                </SectionWorkRequestDetail>
            </WorkRequestDetailContainer>
        </Card>
    );
}

export default ContainerDetail;