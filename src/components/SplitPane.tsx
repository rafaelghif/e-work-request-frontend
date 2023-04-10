import { IonSplitPane } from "@ionic/react";
import { useAppSelector } from "../redux/hook";
import Menu from "./Menu";

interface SplitPaneProps {
    children: React.ReactNode
}

const SplitPane: React.FC<SplitPaneProps> = ({ children }) => {
    const isAuth = useAppSelector((state) => state.auth);
    return (
        <IonSplitPane contentId="main" disabled={!isAuth}>
            <Menu />
            {children}
        </IonSplitPane>
    );
}

export default SplitPane;