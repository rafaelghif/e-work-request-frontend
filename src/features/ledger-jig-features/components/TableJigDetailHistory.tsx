import { TableColumn } from "react-data-table-component";
import { useMemo } from "react";
import Table from "../../../components/Table";
import { formatDateTime } from "../../../libs/date-fns";
import { IonButton } from "@ionic/react";
import { JigDetailHistoryInterface } from "../types/jig-detail-history-type";

interface TableJigDetailHistoryProps {
	data: JigDetailHistoryInterface[];
	handleClickDetail: (data: JigDetailHistoryInterface) => void;
}

const TableJigDetailHistory: React.FC<TableJigDetailHistoryProps> = ({ data, handleClickDetail }) => {
	const columns: TableColumn<JigDetailHistoryInterface>[] = useMemo(() => [{
		name: "Reg No",
		cell: row => <IonButton fill="clear" color="primary" onClick={() => handleClickDetail(row)}>{row.regNo}</IonButton>,
	}, {
		name: "Remark",
		selector: row => row.remark,
	}, {
		name: "Update By",
		selector: row => row.updatedBy,
	}, {
		name: "Update At",
		selector: row => formatDateTime(row.updatedAt),
		wrap: true
	}], [handleClickDetail]);
	return <Table columns={columns} data={data} responsive pagination striped highlightOnHover  />;
}

export default TableJigDetailHistory;