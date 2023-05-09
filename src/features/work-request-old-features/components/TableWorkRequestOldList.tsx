import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { WorkRequestOldInterface } from "../../../types/work-request-old-type";

interface TableWorkRequestOldListProps {
    data: WorkRequestOldInterface[];
}

const TableWorkRequestOldList: React.FC<TableWorkRequestOldListProps> = ({ data }) => {
    const columns: TableColumn<WorkRequestOldInterface>[] = useMemo(() => [{
        name: "Ticket Number",
        selector: row => row.ticketNo,
        sortable: true,
        wrap: true
    }, {
        name: "Location",
        selector: row => row.location,
        sortable: true,
        wrap: true
    }, {
        name: "Description",
        selector: row => row.description,
        sortable: true,
        wrap: true,
        grow: 2
    }, {
        name: "Remark",
        selector: row => row.remark,
        sortable: true,
        wrap: true
    }, {
        name: "Receive Date",
        selector: row => row.receivedDate,
        sortable: true,
        wrap: true
    }, {
        name: "Complete Date",
        selector: row => row.completedDate,
        sortable: true,
        wrap: true
    }, {
        name: "Type",
        selector: row => row.ticketType,
        sortable: true,
        wrap: true
    }], []);
    return <Table columns={columns} data={data} responsive pagination striped highlightOnHover />;
}

export default TableWorkRequestOldList;