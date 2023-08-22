import { ConditionalStyles, TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton } from "@ionic/react";
import { JigInterface } from "../types/jig-type";
import ContainerJigDetail from "./ContainerJigDetail";

interface TableJigProps {
	data: JigInterface[];
	handleClickBtnEdit: (data: JigInterface) => void;
}

const TableJig: React.FC<TableJigProps> = ({ data, handleClickBtnEdit }) => {

	const conditionalRowStyles: ConditionalStyles<JigInterface>[] = [{
		when: (row) => row.status === "Superseded",
		style: {
			backgroundColor: "rgba(242, 38, 19, 0.9)",
			color: "white",
			"&:hover": {
				cursor: "not-allowed",
			},
		}
	}];

	const columns: TableColumn<JigInterface>[] = useMemo(() => [{
		name: "Reg No",
		selector: row => row.regNo,
		wrap: true,
		center: true,
	}, {
		name: "Name",
		selector: row => row.name,
		width:"250px",
		wrap: true,
	}, {
		name: "Maker",
		selector: row => row.maker,
		sortable: true,
		wrap: true
	}, {
		name: "Location",
		selector: row => row.location,
		sortable: true,
		wrap: true
	}, {
		name: "Qty",
		selector: row => row.qty,
		sortable: true,
		wrap: true
	}, {
		name: "Remark",
		selector: row => row.remark,
		grow: 2,
		wrap: true
	}, {
		name: "Status",
		selector: row => row.status,
		sortable: true,
		wrap: true
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
	}], [handleClickBtnEdit]);
	return <Table columns={columns} data={data} conditionalRowStyles={conditionalRowStyles} responsive pagination striped highlightOnHover expandableRows expandableRowsComponent={ContainerJigDetail} />;
}

export default TableJig;