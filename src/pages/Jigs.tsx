import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner } from "@ionic/react";
import FabButton from "../components/FabButton";
import ModalCreateJig from "../features/ledger-jig-features/components/ModalCreateJig";
import { Suspense, lazy, useState } from "react";

const ContainerJig = lazy(() => import("../features/ledger-jig-features/components/ContainerJig"));

const Jig: React.FC = () => {
	const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Jig</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<Suspense fallback={<IonSpinner name="crescent" />}>
					<ContainerJig />
				</Suspense>
			</IonContent>
			<ModalCreateJig isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)} />
			<FabButton handleClick={() => setIsOpenModalAdd(true)} />
		</IonPage>
	);
}

export default Jig;