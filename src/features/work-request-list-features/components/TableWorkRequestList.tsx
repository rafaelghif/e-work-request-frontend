import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { IonText } from "@ionic/react";
import ContainerWorkRequestListDetail from "./ContainerWorkRequestListDetail";
import { WorkRequestInterface } from "../../../types/work-request-type";

interface TableWorkRequestListProps {
    data: WorkRequestInterface[];
}

const TableWorkRequestList: React.FC<TableWorkRequestListProps> = ({ data }) => {
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
        name: "Ticket Status",
        cell: row => <IonText color={row.ticketStatus === "Request" || row.ticketStatus === "Reject"
            ? "danger" : row.ticketStatus === "Send to the Requestor"
                ? "medium" : row.ticketStatus === "Progress"
                    ? "warning" : "success"}
        >{row.ticketStatus}</IonText>,
        wrap: true
    }], []);
    return <Table columns={columns} data={data} responsive pagination striped highlightOnHover expandableRows expandableRowsComponent={ContainerWorkRequestListDetail} />;
}

export default TableWorkRequestList;