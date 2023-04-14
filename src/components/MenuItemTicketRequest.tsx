import { IonItem, IonIcon, IonLabel, IonBadge, IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import { fetchTicketRequestCount } from "../redux/slice/ticketRequestCountSlice";

interface MenuItemTicketRequestProps {
    user: {
        id: string;
        badgeId: string;
        name: string;
        email: string;
        role: string;
    };
    text: string;
    url: string;
    icon: string;
    handleClick?: () => void;
}

const MenuItemTicketRequest: React.FC<MenuItemTicketRequestProps> = ({ user, text, url, icon, handleClick }) => {
    const dispatch = useDispatch<any>();
    const { status, data } = useAppSelector((state) => state.ticketRequestCountSlice);
    
    useEffect(() => {
        if (user.id !== "") {
            dispatch(fetchTicketRequestCount());
        }
    }, [dispatch, user]);

    return (
        <IonItem routerLink={url} onClick={handleClick ? () => handleClick() : undefined}>
            <IonIcon icon={icon} slot="start" />
            <IonLabel>{text}</IonLabel>
            <IonBadge color="danger">{status === "loading" ? <IonSpinner name="crescent" /> : data}</IonBadge>
        </IonItem>
    );
}

export default MenuItemTicketRequest;