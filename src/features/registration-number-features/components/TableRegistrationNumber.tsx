import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton, IonText } from "@ionic/react";
import { RegistrationNumberInterface } from "../types/registration-number-type";

interface TableRegistrationNumberProps {
    data: RegistrationNumberInterface[];
    handleClickBtnEdit: (data: RegistrationNumberInterface) => void;
    handleClickBtnInActive: (id: string) => void;
}

const TableRegistrationNumber: React.FC<TableRegistrationNumberProps> = ({ data, handleClickBtnEdit, handleClickBtnInActive }) => {
    const columns: TableColumn<RegistrationNumberInterface>[] = useMemo(() => [{
        name: "Name",
        selector: row => row.name,
        sortable: true,
        wrap: true
    }, {
        name: "Format",
        selector: row => row.format,
        sortable: true,
        wrap: true
    }, {
        name: "Year",
        selector: row => row.year,
        sortable: true,
        wrap: true
    }, {
        name: "Last Number",
        selector: row => row.lastNumber,
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

export default TableRegistrationNumber;