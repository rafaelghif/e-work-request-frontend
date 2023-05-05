import { IonRow, IonSpinner } from "@ionic/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { ExpanderComponentProps } from "react-data-table-component";
import Card from "../../../components/Card";
import ItemWorkRequestDetail from "../../../components/ItemWorkRequestDetail";
import SectionWorkRequestDetail from "../../../components/SectionWorkRequestDetail";
import WorkRequestDetailContainer from "../../../components/WorkRequestDetailContainer";
import { formatDateTime } from "../../../libs/date-fns";
import { WorkRequestInterface } from "../../../types/work-request-type";

const TimelineWorkRequest = lazy(() => import("../../../components/TimelineWorkRequest"));

const ContainerWorkRequestListDetail: React.FC<ExpanderComponentProps<WorkRequestInterface>> = ({ data }) => {
    const [workRequest, setWorkRequest] = useState<WorkRequestInterface>(data);

    useEffect(() => {
        setWorkRequest(data);
    }, [data]);
    return (
        <>
            <Card title={`Detail ${workRequest.ticketNumber}`} headerColor="light">
                <WorkRequestDetailContainer>
                    <SectionWorkRequestDetail title="Ticket Detail">
                        <ItemWorkRequestDetail title="Ticket Type" content={workRequest.RegistrationNumber?.name ? workRequest.RegistrationNumber.name : "N/A"} />
                        <ItemWorkRequestDetail title="Except Due Date" content={workRequest.expectDueDate} />
                        <ItemWorkRequestDetail title="Send to Requester Date" content={workRequest?.sendToRequestorDate ? formatDateTime(workRequest.sendToRequestorDate) : "N/A"} />
                        {/* <ItemWorkRequestDetail title="Time Taken" content={workRequest?.timeTaken ? workRequest.timeTaken : "N/A"} /> */}
                    </SectionWorkRequestDetail>
                    <SectionWorkRequestDetail title="Requester">
                        <ItemWorkRequestDetail title="Requester BadgeId" content={workRequest.Requester.badgeId} />
                        <ItemWorkRequestDetail title="Requester Name" content={workRequest.Requester.name} />
                        <ItemWorkRequestDetail title="Requester Department" content={workRequest.RequesterDepartment.name} />
                        <ItemWorkRequestDetail title="Requester Line" content={workRequest.RequesterLine?.name ? workRequest.RequesterLine.name : "N/A"} />
                        <ItemWorkRequestDetail title="Request Date" content={formatDateTime(workRequest.createdAt)} />
                    </SectionWorkRequestDetail>
                    <SectionWorkRequestDetail title="Receiver">
                        <ItemWorkRequestDetail title="Receiver BadgeId" content={workRequest.Receiver?.badgeId ? workRequest.Receiver.badgeId : "N/A"} />
                        <ItemWorkRequestDetail title="Receiver Name" content={workRequest.Receiver?.name ? workRequest.Receiver.name : "N/A"} />
                        <ItemWorkRequestDetail title="Receiver Department" content={workRequest.ReceiverDepartment?.name ? workRequest.ReceiverDepartment.name : "N/A"} />
                        <ItemWorkRequestDetail title="Receive Date" content={workRequest?.completeDate ? formatDateTime(workRequest.completeDate) : "N/A"} />
                    </SectionWorkRequestDetail>
                    <SectionWorkRequestDetail title="Assignee" size="12" sizeMd="12">
                        <IonRow>
                            {workRequest.TicketAssignees?.map(res => (
                                <SectionWorkRequestDetail key={`assignee-${res.id}`} title={`${res.AssigneeDepartment?.name}`} size="12" sizeMd={workRequest.TicketAssignees?.length > 1 ? "6" : "12"}>
                                    <ItemWorkRequestDetail title="Assignor BadgeId" content={res.Assignee?.badgeId ? res.Assignee.badgeId : "N/A"} />
                                    <ItemWorkRequestDetail title="Assignor Name" content={res.Assignee?.name ? res.Assignee.name : "N/A"} />
                                    <ItemWorkRequestDetail title="Assignee BadgeId" content={res.PersonInCharge?.badgeId ? res.PersonInCharge.badgeId : "N/A"} />
                                    <ItemWorkRequestDetail title="Assignee Name" content={res.PersonInCharge?.name ? res.PersonInCharge.name : "N/A"} />
                                    <ItemWorkRequestDetail title="Action Taken" content={res.actionTaken ? res.actionTaken : "N/A"} />
                                    <ItemWorkRequestDetail title="Time Taken" content={res.timeTaken ? res.timeTaken : "N/A"} />
                                    <ItemWorkRequestDetail title="Status" content={res.status ? res.status : "N/A"} />
                                </SectionWorkRequestDetail>
                            ))}
                        </IonRow>
                    </SectionWorkRequestDetail>
                    <SectionWorkRequestDetail title="Timeline" size="12" sizeMd="12">
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <TimelineWorkRequest ticketId={data.id} />
                        </Suspense>
                    </SectionWorkRequestDetail>
                </WorkRequestDetailContainer>
            </Card>
        </>
    );
}

export default ContainerWorkRequestListDetail;