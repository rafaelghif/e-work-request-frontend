import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Strict from "../pages/Strict";
import { useAppSelector } from "../redux/hook";

interface PrivateRouteType {
    component: React.FC<any>
    isAuth: boolean;
    strictRole?: string[];
    strictDepartment?: string[];
    strictSection?: string[];
}

const PrivateRoute: React.FC<PrivateRouteType> = ({ component: Component, isAuth, strictRole, strictDepartment, strictSection }) => {
    const user = useAppSelector((state) => state.user);
    const department = useAppSelector((state) => state.department);
    const section = useAppSelector((state) => state.section);

    const [isAllow, setIsAllow] = useState<boolean>(true);

    useEffect(() => {
        if (strictRole && strictDepartment && strictSection) {
            setIsAllow(strictRole.includes(user.role) && strictDepartment.includes(department.name) && strictDepartment.includes(section.name));
        } else if (strictRole) {
            setIsAllow(strictRole.includes(user.role));
        } else if (strictDepartment) {
            setIsAllow(strictDepartment.includes(department.name));
        } else if (strictSection) {
            setIsAllow(strictSection.includes(section.name));
        } else {
            setIsAllow(true);
        }
    }, [strictRole, strictDepartment, user, department.name, strictSection, section.name]);

    return (
        isAuth === false ? <Redirect to={"/login"} /> :
            isAllow === true ? <Component /> : <Strict />
    );
}

export default PrivateRoute;