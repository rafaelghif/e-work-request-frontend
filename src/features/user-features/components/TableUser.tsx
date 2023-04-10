import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton, IonText } from "@ionic/react";
import { UserInterface } from "../types/user-type";

interface TableUserProps {
    data: UserInterface[];
    handleClickBtnEdit: (data: UserInterface) => void;
    handleClickBtnInActive: (id: string) => void;
}

const TableUser: React.FC<TableUserProps> = ({ data, handleClickBtnEdit, handleClickBtnInActive }) => {
    const columns: TableColumn<UserInterface>[] = useMemo(() => [{
        name: "BadgeId",
        selector: row => row.badgeId,
        sortable: true,
        wrap: true
    }, {
        name: "Name",
        selector: row => row.name,
        sortable: true,
        wrap: true
    }, {
        name: "Email",
        selector: row => row.email,
        sortable: true,
        wrap: true
    }, {
        name: "Role",
        selector: row => row.role,
        sortable: true,
        wrap: true
    }, {
        name: "Department",
        selector: row => row.Department.name,
        sortable: true,
        wrap: true
    }, {
        name: "Section",
        selector: row => row.Section.name,
        sortable: true,
        wrap: true
    }, {
        name: "Line",
        selector: row => row.Line?.name,
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

export default TableUser;