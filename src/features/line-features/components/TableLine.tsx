import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton, IonText } from "@ionic/react";
import { LineInterface } from "../types/line-type";

interface TableLineProps {
    data: LineInterface[];
    handleClickBtnEdit: (data: LineInterface) => void;
    handleClickBtnInActive: (id: string) => void;
}

const TableLine: React.FC<TableLineProps> = ({ data, handleClickBtnEdit, handleClickBtnInActive }) => {
    const columns: TableColumn<LineInterface>[] = useMemo(() => [{
        name: "Name",
        selector: row => row.name,
        sortable: true,
        wrap: true
    }, {
        name: "Department",
        selector: row => row.Department.name,
        sortable: true,
        wrap: true
    }, {
        name: "Status",
        cell: row => <IonText color={row.inActive ? "danger" : "success"}>{row.inActive ? "InActive" : "Active"}</IonText>,
        sortable: true,
    }, {
        name: "Update By",
        selector: row => row.updatedBy,
        sortable: true,
    }, {
        name: "Update At",
        selector: row => formatDateTime(row.updatedAt),
        sortable: true,
        wrap: true
    }, {
        name: "Edit",
        cell: row => <IonButton fill="clear" color="warning" onClick={() => { handleClickBtnEdit(row) }}>Edit</IonButton>,
        center: true
    }, {
        name: "InActive",
        cell: row => <IonButton fill="clear" color="danger" onClick={() => { handleClickBtnInActive(row.id) }}>InActive</IonButton>,
        center: true
    }], [handleClickBtnInActive, handleClickBtnEdit]);
    return <Table columns={columns} data={data} responsive pagination striped highlightOnHover />;
}

export default TableLine;