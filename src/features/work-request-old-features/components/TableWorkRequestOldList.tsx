import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { UpdateWorkRequestOldType, WorkRequestOldInterface } from "../../../types/work-request-old-type";
import { IonButton } from "@ionic/react";

interface TableWorkRequestOldListProps {
    data: WorkRequestOldInterface[];
    handleClickBtnEdit: (data: UpdateWorkRequestOldType) => void;
}

const TableWorkRequestOldList: React.FC<TableWorkRequestOldListProps> = ({ data, handleClickBtnEdit }) => {
    const columns: TableColumn<WorkRequestOldInterface>[] = useMemo(() => [{
        name: "WO No.",
        selector: row => row.woNo,
        sortable: true,
        wrap: true
    }, {
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
    }, {
        name: "Edit",
        cell: (row) => <IonButton color="warning" onClick={() => handleClickBtnEdit(row)}>Edit</IonButton>,
        center: true
    }], [handleClickBtnEdit]);
    return <Table columns={columns} data={data} responsive pagination striped highlightOnHover />;
}

export default TableWorkRequestOldList;