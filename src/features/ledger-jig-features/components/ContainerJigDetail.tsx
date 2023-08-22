import { Suspense, lazy, useState } from "react";
import useQueryJigDetail from "../hooks/useQueryJigDetail";
import { JigInterface } from "../types/jig-type";
import { IonButton, IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import { JigDetailInterface } from "../types/jig-detail-type";
import { ExpanderComponentProps } from "react-data-table-component";
import Card from "../../../components/Card";
import ModalCreateJigDetail from "./ModalCreateJigDetail";
import ModalUpdateJigDetail from "./ModalUpdateJigDetail";
import ModalDetailJigDetail from "./ModalDetailJigDetail";

const TableJigDetail = lazy(() => import("./TableJigDetail"));

const ContainerJigDetail: React.FC<ExpanderComponentProps<JigInterface>> = ({ data: jigData }) => {
	const jigDetail = useQueryJigDetail(jigData?.id || "initialization");

	const [jigDetailSelect, setJigDetailSelect] = useState<JigDetailInterface>();

	const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
	const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);
	const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);

	const handleClickDetail = (data: JigDetailInterface) => {
		setJigDetailSelect(data);
		setIsOpenModalDetail(true);
	}

	const handleClickBtnEdit = (data: JigDetailInterface) => {
		setJigDetailSelect(data);
		setIsOpenModalUpdate(true);
	}

	return (
		<>
			<Card title={`Detail ${jigData.regNo}`}>
				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonButton fill="clear" className="float-right" onClick={() => setIsOpenModalCreate(true)}>Add Jig Detail</IonButton>
						</IonCol>
						<IonCol size="12">
							<Suspense fallback={<IonSpinner name="crescent" />}>
								{jigDetail.isLoading ? (
									<IonSpinner name="crescent" color="primary" />
								) : (
									<TableJigDetail jig={jigData} data={jigDetail.isError ? [] : jigDetail.data.data} handleClickDetail={(data) => handleClickDetail(data)} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} />
								)}
							</Suspense>
						</IonCol>
					</IonRow>
				</IonGrid>
			</Card>
			<ModalCreateJigDetail jig={jigData} isOpen={isOpenModalCreate} onDidDismiss={() => setIsOpenModalCreate(false)} />
			<ModalUpdateJigDetail data={jigDetailSelect} isOpen={isOpenModalUpdate} onDidDismiss={() => setIsOpenModalUpdate(false)} />
			<ModalDetailJigDetail jigData={jigData} data={jigDetailSelect} isOpen={isOpenModalDetail} onDidDismiss={() => setIsOpenModalDetail(false)} />
		</>
	);
}

export default ContainerJigDetail;