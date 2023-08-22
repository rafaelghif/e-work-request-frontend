import { useState } from "react";
import useQueryJig from "../hooks/useQueryJig";
import { IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail } from "@ionic/react";
import { JigInterface } from "../types/jig-type";
import TableJig from "./TableJig";
import Card from "../../../components/Card";
import ModalUpdateJig from "./ModalUpdateJig";

const ContainerJig: React.FC = () => {
	const [search, setSearch] = useState<string>("");
	const { isLoading, data, isError, refetch } = useQueryJig(search);

	const [jig, setJig] = useState<JigInterface>();
	const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

	const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
		refetch();
		event.detail.complete();
	}

	const handleClickBtnEdit = (data: JigInterface) => {
		setJig(data);
		setIsOpenModalUpdate(true);
	}

	return (
		<>
			<Card title="Data Jigs">
				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>
				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonSearchbar value={search} onIonChange={(e) => setSearch(e.detail.value!)} />
						</IonCol>
						<IonCol size="12">
							{isLoading ? (
								<IonSpinner name="crescent" color="primary" />
							) : (
								<TableJig data={isError ? [] : data.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} />
							)}
						</IonCol>
					</IonRow>
				</IonGrid>
			</Card>
			<ModalUpdateJig isOpen={isOpenModalUpdate} data={jig} onDidDismiss={() => setIsOpenModalUpdate(false)} />
		</>
	);
}

export default ContainerJig;