import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton } from "@ionic/react";
import { JigDetailInterface } from "../types/jig-detail-type";
import ContainerJigDetailHistory from "./ContainerJigDetailHistory";
import { JigInterface } from "../types/jig-type";

interface TableJigDetailProps {
	data: JigDetailInterface[];
	jig: JigInterface;
	handleClickDetail: (data: JigDetailInterface) => void;
	handleClickBtnEdit: (data: JigDetailInterface) => void;
}

const TableJigDetail: React.FC<TableJigDetailProps> = ({ data, jig, handleClickDetail, handleClickBtnEdit }) => {
	const columns: TableColumn<JigDetailInterface>[] = useMemo(() => [{
		name: "Reg No",
		cell: row => <IonButton fill="clear" color="primary" onClick={() => handleClickDetail(row)}>{row.regNo}</IonButton>,
	}, {
		name: "Location",
		selector: row => row.location,
	}, {
		name: "Update By",
		selector: row => row.updatedBy,
	}, {
		name: "Update At",
		selector: row => formatDateTime(row.updatedAt),
		wrap: true
	}, {
		name: "Edit",
		cell: row => <IonButton fill="clear" color="warning" onClick={() => { handleClickBtnEdit(row) }}>Edit</IonButton>,
		center: true
	}], [handleClickBtnEdit, handleClickDetail]);
	return <Table columns={columns} data={data} responsive pagination striped highlightOnHover expandableRows expandableRowsComponent={ContainerJigDetailHistory} expandableRowsComponentProps={{ jigData: jig }} />;
}

export default TableJigDetail;