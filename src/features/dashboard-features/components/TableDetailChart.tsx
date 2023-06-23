import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { TicketDetailInterface } from "../../../types/work-request-type";
import { IonText } from "@ionic/react";
import ContainerDetail from "./ContainerDetail";

interface TableDetailChartProps {
    data: TicketDetailInterface[];
}

const TableDetailChart: React.FC<TableDetailChartProps> = ({ data }) => {
    const columns: TableColumn<TicketDetailInterface>[] = useMemo(() => [{
        name: "Ticket Number",
        selector: row => row.ticketNumber,
        sortable: true,
        wrap: true
    }, {
        name: "Work Number",
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
        wrap: true,
    }, {
        name: "Expect Due Date",
        selector: row => row.expectDueDate,
        sortable: true,
        wrap: true
    }, {
        name: "Requester Department",
        selector: row => row.requesterDepartment,
        sortable: true,
        wrap: true
    }, {
        name: "Status",
        cell: row => <IonText color={row.ticketStatus === "Send to the Requestor" ? "danger" : row.ticketStatus === "Progress" ? "warning" : "medium"}>{row.ticketStatus}</IonText>,
        wrap: true
    }], []);
    return <Table columns={columns} data={data} responsive pagination striped highlightOnHover expandableRows expandableRowsComponent={ContainerDetail} />;
}

export default TableDetailChart;