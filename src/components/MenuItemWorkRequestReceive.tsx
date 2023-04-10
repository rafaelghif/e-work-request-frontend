import { IonItem, IonIcon, IonLabel, IonBadge, IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import { fetchWorkRequestReceiveCount } from "../redux/slice/workRequestReceiveCountSlice";

interface MenuItemWorkRequestReceiveProps {
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

const MenuItemWorkRequestReceive: React.FC<MenuItemWorkRequestReceiveProps> = ({ user, text, url, icon, handleClick }) => {
    const dispatch = useDispatch<any>();
    const { status, data } = useAppSelector((state) => state.workRequestReceiveCount);
    useEffect(() => {
        if (user.id !== "") {
            dispatch(fetchWorkRequestReceiveCount());
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

export default MenuItemWorkRequestReceive;