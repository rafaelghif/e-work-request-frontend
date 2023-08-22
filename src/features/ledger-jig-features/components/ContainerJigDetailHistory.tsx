import { ExpanderComponentProps } from "react-data-table-component";
import Card from "../../../components/Card";
import { JigDetailInterface } from "../types/jig-detail-type";
import useQueryJigDetailHistory from "../hooks/useQueryJigDetailHistory";
import { Suspense, lazy, useState } from "react";
import { IonGrid, IonRow, IonCol, IonSpinner } from "@ionic/react";
import { JigDetailHistoryInterface } from "../types/jig-detail-history-type";
import { JigInterface } from "../types/jig-type";
import ModalDetailJigDetail from "./ModalDetailJigDetail";

const TableJigDetailHistory = lazy(() => import("./TableJigDetailHistory"));

interface ContainerJigDetailHistoryProps extends ExpanderComponentProps<JigDetailInterface> {
	jigData?: JigInterface;
}

const ContainerJigDetailHistory: React.FC<ContainerJigDetailHistoryProps> = ({ data: jigDetailData, jigData }) => {
	const { data, isError, isLoading } = useQueryJigDetailHistory(jigDetailData.id);

	const [jigDetailHistorySelect, setJigDetailHistorySelect] = useState<JigDetailHistoryInterface>();
	const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);

	const handleClickDetail = (data: JigDetailHistoryInterface) => {
		setJigDetailHistorySelect(data);
		setIsOpenModalDetail(true);
	}

	return (
		<>
			<Card title={`History ${jigDetailData.regNo}`} headerColor="medium">
				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<Suspense fallback={<IonSpinner name="crescent" />}>
								{isLoading ? (
									<IonSpinner name="crescent" color="primary" />
								) : (
									<TableJigDetailHistory data={isError ? [] : data.data} handleClickDetail={(data) => handleClickDetail(data)} />
								)}
							</Suspense>
						</IonCol>
					</IonRow>
				</IonGrid>
			</Card>
			<ModalDetailJigDetail jigData={jigData!} data={jigDetailHistorySelect} isOpen={isOpenModalDetail} onDidDismiss={() => setIsOpenModalDetail(false)} />
		</>
	);
}

export default ContainerJigDetailHistory;