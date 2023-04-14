import { IonContent, IonFooter, IonHeader, IonImg, IonMenu, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { lazy, Suspense } from "react";
import { fileTrayFullOutline, homeOutline, logOutOutline, radioButtonOffOutline, serverOutline } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import profilePicture from "../assets/images/profile.png";
import { clearUser } from "../redux/slice/userSlice";
import { clearAuth } from "../redux/slice/authSlice";
import { clearDepartment } from "../redux/slice/departmentSlice";
import { clearSection } from "../redux/slice/sectionSlice";
import MenuItem from "./MenuItem";
import MenuItemDropDown from "./MenuItemDropDown";

const MenuItemWorkRequest = lazy(() => import("./MenuItemWorkRequest"));
const MenuItemWorkRequestReceive = lazy(() => import("./MenuItemWorkRequestReceive"));
const MenuItemTicketRequest = lazy(() => import("./MenuItemTicketRequest"));

const Menu: React.FC = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user);
    const department = useAppSelector((state) => state.department);
    const section = useAppSelector((state) => state.section);
    const isAuth = useAppSelector((state) => state.auth);

    const handleClickBtnLogout = () => {
        dispatch(clearUser());
        dispatch(clearDepartment());
        dispatch(clearSection());
        dispatch(clearAuth());
    }

    return (
        <IonMenu contentId="main" menuId="main" disabled={!isAuth} className="border-r-2">
            <IonHeader>
                <IonToolbar color={"light"}>
                    <IonTitle>E-Work Order</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="bg-slate-600">
                <div className="flex items-center h-40 px-5 text-white border-b-2 border-white shadow bg-opacity-80 bg-slate-500">
                    <div>
                        <IonImg src={profilePicture} className="w-16 h-auto border-2 border-white rounded-full shadow-md" />
                    </div>
                    <div className="ml-3">
                        <span className="block text-lg font-bold">{user.badgeId}</span>
                        <span className="block">{user.name}</span>
                        <span className="block text-sm">{department.name}</span>
                        <span className="block text-xs text-slate-200">{section.name}</span>
                    </div>
                </div>
                <div className="bg-slate-600">
                    <MenuItem url="/dashboard" text="Dashboard" icon={homeOutline} />
                    <MenuItemDropDown headerText="Master Data" headerIcon={serverOutline}>
                        <MenuItem url="/department" text="Department" icon={radioButtonOffOutline} />
                        <MenuItem url="/line" text="Line" icon={radioButtonOffOutline} />
                        <MenuItem url="/registration-number" text="Registration Number" icon={radioButtonOffOutline} />
                        <MenuItem url="/user" text="User" icon={radioButtonOffOutline} />
                    </MenuItemDropDown>
                    <MenuItemDropDown headerText="Work Request" headerIcon={fileTrayFullOutline} >
                        <MenuItem url="/work-request-form" text="Work Request Form" icon={radioButtonOffOutline} />
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <MenuItemTicketRequest user={user} url="/ticket-request" text="Ticket Request" icon={radioButtonOffOutline} />
                        </Suspense>
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <MenuItemWorkRequest user={user} url="/work-request" text="Work Request" icon={radioButtonOffOutline} />
                        </Suspense>
                        <Suspense fallback={<IonSpinner name="crescent" />}>
                            <MenuItemWorkRequestReceive user={user} url="/work-request-receive" text="Work Request Receive" icon={radioButtonOffOutline} />
                        </Suspense>
                        <MenuItem url="/work-request-list" text="Work Request List" icon={radioButtonOffOutline} />
                        <MenuItem url="/work-request-list-old" text="Work Request List Old" icon={radioButtonOffOutline} />
                    </MenuItemDropDown>
                    <MenuItem url="/login" text="Logout" icon={logOutOutline} handleClick={() => handleClickBtnLogout()} />
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar color={"light"}>
                    <IonTitle className="text-sm text-center">Version {process.env.REACT_APP_VERSION}</IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonMenu>
    )
}

export default Menu;