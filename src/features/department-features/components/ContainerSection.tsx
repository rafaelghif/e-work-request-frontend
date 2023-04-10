import { IonButton, IonCol, IonGrid, IonRow, IonSpinner, useIonAlert } from "@ionic/react";
import { useState } from "react";
import { ExpanderComponentProps } from "react-data-table-component";
import Card from "../../../components/Card";
import useInActiveSection from "../hooks/useInActiveSection";
import useQuerySection from "../hooks/useQuerySection";
import { DepartmentInterface } from "../types/department-type";
import { SectionInterface } from "../types/section-type";
import ModalCreateSection from "./ModalCreateSection";
import ModalUpdateSection from "./ModalUpdateSection";
import TableSection from "./TableSection";

export const ContainerSection: React.FC<ExpanderComponentProps<DepartmentInterface>> = ({ data }) => {
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const sectionData = useQuerySection(data.id);
    const { mutate } = useInActiveSection();
    const [presentAlert] = useIonAlert();

    const [section, setSection] = useState<SectionInterface>();
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

    const handleClickBtnEdit = (data: SectionInterface) => {
        setSection(data);
        setIsOpenModalUpdate(true);
    }

    const handleClickBtnInActive = (id: string) => {
        presentAlert({
            header: "Are you sure want to In Active this section ?",
            buttons: [
                { "text": "Cancel", role: "cancel" },
                { "text": "Delete", handler: () => handleDelete(id) }
            ]
        });
    }

    const handleDelete = (id: string) => {
        mutate(id);
    }
    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <IonButton fill="clear" className="float-right" onClick={() => setIsOpenModalCreate(true)}>Create Section</IonButton>
                    </IonCol>
                    <IonCol size="12">
                        <Card title="Data Sections" headerColor="light">
                            {sectionData.isLoading ? (
                                <IonSpinner name="crescent" color="primary" />
                            ) : (
                                <TableSection data={sectionData.isError ? [] : sectionData.data.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} handleClickBtnInActive={(id) => handleClickBtnInActive(id)} />
                            )}
                        </Card>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <ModalCreateSection isOpen={isOpenModalCreate} departmentId={data.id} onDidDismiss={() => setIsOpenModalCreate(false)} />
            <ModalUpdateSection isOpen={isOpenModalUpdate} data={section} onDidDismiss={() => setIsOpenModalUpdate(false)} />
        </>
    );
}

export default ContainerSection;