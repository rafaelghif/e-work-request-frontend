import { IonCol, IonGrid, IonItem, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSpinner, RefresherEventDetail } from "@ionic/react";
import { lazy, Suspense, useState } from "react";
import Card from "../../../components/Card";
import useQueryWorkRequestList from "../hooks/useQueryWorkRequestList";
import TableWorkRequestList from "./TableWorkRequestList";

const SelectWorkRequestMonth = lazy(() => import("../../../components/SelectWorkRequestMonth"));
const SelectWorkRequestTicketStatus = lazy(() => import("../../../components/SelectWorkRequestTicketStatus"));
const SelectWorkRequestYear = lazy(() => import("../../../components/SelectWorkRequestYear"));
const SelectWorkRequestType = lazy(() => import("../../../components/SelectWorkRequestType"));
const SelectWorkRequestDepartment = lazy(() => import("../../../components/SelectWorkRequestDepartment"));

const ContainerWorkRequestList: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [ticketStatusFilter, setTicketStatusFilter] = useState<string>("All");
    const [yearFilter, setYearFilter] = useState<string>(new Date().getFullYear().toString());
    const [monthFilter, setMonthFilter] = useState<string>((new Date().getMonth() + 1).toString());
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");
    const { isLoading, data, isError, refetch } = useQueryWorkRequestList(search, ticketStatusFilter, typeFilter, departmentFilter, yearFilter, monthFilter);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetch();
        event.detail.complete();
    }
    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <Card title="Data Work Request List">
                <IonGrid>
                    <IonRow className="px-6">
                        <IonCol size="12" sizeMd="3">
                            <IonItem>
                                <Suspense fallback={<IonSpinner name="crescent" />}>
                                    <SelectWorkRequestTicketStatus value={ticketStatusFilter} handleChange={(ticketStatus) => setTicketStatusFilter(ticketStatus)} />
                                </Suspense>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="2">
                            <IonItem>
                                <Suspense fallback={<IonSpinner name="crescent" />}>
                                    <SelectWorkRequestType value={typeFilter} handleChange={(month) => setTypeFilter(month)} />
                                </Suspense>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="3">
                            <IonItem>
                                <Suspense fallback={<IonSpinner name="crescent" />}>
                                    <SelectWorkRequestDepartment value={departmentFilter} handleChange={(month) => setDepartmentFilter(month)} />
                                </Suspense>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="2">
                            <IonItem>
                                <Suspense fallback={<IonSpinner name="crescent" />}>
                                    <SelectWorkRequestMonth value={monthFilter} handleChange={(month) => setMonthFilter(month)} />
                                </Suspense>
                            </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="2">
                            <IonItem>
                                <Suspense fallback={<IonSpinner name="crescent" />}>
                                    <SelectWorkRequestYear value={yearFilter} handleChange={(year) => setYearFilter(year)} />
                                </Suspense>
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
                                <TableWorkRequestList data={isError ? [] : data?.data} />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Card>
        </>
    );
}

export default ContainerWorkRequestList;