import {
  IonCol,
  IonGrid,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSpinner,
  RefresherEventDetail,
  useIonAlert,
} from "@ionic/react";
import Card from "../../../components/Card";
import TableWorkRequestIssued from "./TableWorkRequestIssued";
import useQueryWorkRequestIssued from "../hooks/useQueryWorkRequestIssued";

const ContainerWorkRequestIssued: React.FC = () => {
  const { isLoading, data, isError, refetch } = useQueryWorkRequestIssued();
  const [presentAlert] = useIonAlert();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    refetch();
    event.detail.complete();
  };

  const handleCancelTicket = async (id: string) => {
    presentAlert({
      header: "Confirmation!",
      message: `Are you sure you want to cancel this ticket?`,
      buttons: [
        "Cancel",
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            handleAction(id);
          },
        },
      ],
    });
  };

  const handleAction = (id: string) => {
    console.log("Canceled", id);
  };

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <Card title="Data Work Request Issued">
        <IonGrid>
          <IonRow>
            <IonCol className="mt-3">
              {isLoading ? (
                <IonSpinner name="crescent" color="primary" />
              ) : (
                <TableWorkRequestIssued
                  data={isError ? [] : data?.data}
                  handleCancelTicket={handleCancelTicket}
                />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </Card>
    </>
  );
};

export default ContainerWorkRequestIssued;
