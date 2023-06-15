import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton, IonText } from "@ionic/react";
import { WorkRequestInterface } from "../../../types/work-request-type";
import LinkAttachment from "../../../components/LinkAttachment";

interface TableWorkRequestReceiveProps {
    data: WorkRequestInterface[];
    handleClickBtnAction: (data: string, type: string) => void;
}

const TableTicketRequest: React.FC<TableWorkRequestReceiveProps> = ({ data, handleClickBtnAction }) => {
    const columns: TableColumn<WorkRequestInterface>[] = useMemo(() => [{
        name: "Ticket Number",
        selector: row => row.ticketNumber,
        sortable: true,
        wrap: true
    }, {
        name: "W/No.",
        selector: row => row.workNumber,
        sortable: true,
        wrap: true
    }, {
        name: "Description",
        selector: row => row.description,
        sortable: true,
        wrap: true,
        grow: 2
    }, {
        name: "Qty",
        selector: row => row.qty,
        sortable: true,
        wrap: true
    }, {
        name: "Expect Due Date",
        selector: row => row.expectDueDate,
        sortable: true,
        wrap: true
    }, {
        name: "Attachment File",
        cell: row => <LinkAttachment attachmentFile={row.attachmentFile} />,
        sortable: true,
        wrap: true
    }, {
        name: "Ticket Status",
        cell: row => <IonText color={row.ticketStatus === "Request" || row.ticketStatus === "Reject"
            ? "danger" : row.ticketStatus === "Progress"
                ? "warning" : "success"}
        >{row.ticketStatus}</IonText>,
        wrap: true
    }, {
        name: "Request By",
        selector: row => row.Requester.name,
        sortable: true,
        wrap: true
    }, {
        name: "Request Date",
        selector: row => formatDateTime(row.createdAt),
        sortable: true,
        wrap: true
    }, {
        name: "Request Department",
        selector: row => row.RequesterDepartment.name,
        sortable: true,
        wrap: true
    }, {
        name: "Approve",
        cell: row => <IonButton color="success" fill="clear" onClick={() => handleClickBtnAction(row.id, "Approve")}>Approve</IonButton>,
        sortable: true,
        wrap: true,
        center: true
    }, {
        name: "Reject",
        cell: row => <IonButton color="danger" fill="clear" onClick={() => handleClickBtnAction(row.id, "Reject")}>Reject</IonButton>,
        sortable: true,
        wrap: true,
        center: true
    }], [handleClickBtnAction]);
    return <Table columns={columns} data={data} responsive pagination striped highlightOnHover />;
}

export default TableTicketRequest;