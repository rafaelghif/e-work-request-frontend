import { IonCol, IonGrid, IonItem, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonSpinner, RefresherEventDetail } from "@ionic/react";
import { useState } from "react";
import Card from "../../../components/Card";
import useQueryWorkRequestOldList from "../hooks/useQueryWorkRequestOldList";
import TableWorkRequestOldList from "./TableWorkRequestOldList";
import { UpdateWorkRequestOldType } from "../../../types/work-request-old-type";
import ModalEditWorkRequestOld from "./ModalEditWorkRequestOld";

const ContainerWorkRequestOldList: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [yearFilter, setYearFilter] = useState<string>(new Date().getFullYear().toString());
    const [monthFilter, setMonthFilter] = useState<string>((new Date().getMonth() + 1).toString());
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const { isLoading, data, isError, refetch } = useQueryWorkRequestOldList(search, typeFilter, yearFilter, monthFilter);
    const [wo, setWo] = useState<UpdateWorkRequestOldType>();
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }

    const handleClickBtnEdit = (data: UpdateWorkRequestOldType) => {
        setWo(data);
        setIsOpenModalEdit(true);
    }


    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <Card title="Data Work Request Old List">
                <IonGrid>
                    <IonRow className="px-6">
                        <IonCol size="12" sizeMd="4">
                            <IonItem>
                                <IonSelect label="Type" value={typeFilter} onIonChange={(e) => setTypeFilter(e.detail.value!)} labelPlacement="stacked">
                                    <IonSelectOption value="All">All</IonSelectOption>
                                    <IonSelectOption value="FJ">FJ</IonSelectOption>
                                    <IonSelectOption value="MB">MB</IonSelectOption>
                                    <IonSelectOption value="MD">MD</IonSelectOption>
                                    <IonSelectOption value="MG">MG</IonSelectOption>
                                    <IonSelectOption value="MJ">MJ</IonSelectOption>
                                    <IonSelectOption value="MM">MM</IonSelectOption>
                                    <IonSelectOption value="MP">MP</IonSelectOption>
                                    <IonSelectOption value="NY">NY</IonSelectOption>
                                    <IonSelectOption value="WS">WS</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="4">
                            <IonItem>
                                <IonSelect label="Month" value={monthFilter} onIonChange={(e) => setMonthFilter(e.detail.value!)} labelPlacement="stacked">
                                    <IonSelectOption value="All">All</IonSelectOption>
                                    <IonSelectOption value="1">January</IonSelectOption>
                                    <IonSelectOption value="2">February</IonSelectOption>
                                    <IonSelectOption value="3">March</IonSelectOption>
                                    <IonSelectOption value="4">April</IonSelectOption>
                                    <IonSelectOption value="5">May</IonSelectOption>
                                    <IonSelectOption value="6">June</IonSelectOption>
                                    <IonSelectOption value="7">July</IonSelectOption>
                                    <IonSelectOption value="8">August</IonSelectOption>
                                    <IonSelectOption value="9">September</IonSelectOption>
                                    <IonSelectOption value="10">October</IonSelectOption>
                                    <IonSelectOption value="11">November</IonSelectOption>
                                    <IonSelectOption value="12">December</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="4">
                            <IonItem>
                                <IonSelect label="Year" value={yearFilter} onIonChange={(e) => setYearFilter(e.detail.value!)} labelPlacement="stacked">
                                    <IonSelectOption value="All">All</IonSelectOption>
                                    <IonSelectOption value="2013">2013</IonSelectOption>
                                    <IonSelectOption value="2014">2014</IonSelectOption>
                                    <IonSelectOption value="2015">2015</IonSelectOption>
                                    <IonSelectOption value="2016">2016</IonSelectOption>
                                    <IonSelectOption value="2017">2017</IonSelectOption>
                                    <IonSelectOption value="2018">2018</IonSelectOption>
                                    <IonSelectOption value="2019">2019</IonSelectOption>
                                    <IonSelectOption value="2020">2020</IonSelectOption>
                                    <IonSelectOption value="2021">2021</IonSelectOption>
                                    <IonSelectOption value="2022">2022</IonSelectOption>
                                    <IonSelectOption value="2023">2023</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <IonSearchbar value={search} onIonChange={(e) => setSearch(e.detail.value!)} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="mt-3">
                            {isLoading ? (
                                <IonSpinner name="crescent" color="primary" />
                            ) : (
                                <TableWorkRequestOldList data={isError ? [] : data?.data} handleClickBtnEdit={(data) => handleClickBtnEdit(data)} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
            <ModalEditWorkRequestOld data={wo} isOpen={isOpenModalEdit} onDidDismiss={() => setIsOpenModalEdit(false)} />
        </>
    );
}

export default ContainerWorkRequestOldList;