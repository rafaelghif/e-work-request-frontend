import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import { lazy, Suspense } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";

import PrivateRoute from "./PrivateRoute";
import SplitPane from "../components/SplitPane";

import { useAppSelector } from "../redux/hook";

/* Page */
import Login from "../pages/Login";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Department = lazy(() => import("../pages/Department"));
const Line = lazy(() => import("../pages/Line"));
const User = lazy(() => import("../pages/User"));
const WorkRequestForm = lazy(() => import("../pages/WorkRequestForm"));
const TicketRequest = lazy(() => import("../pages/TicketRequest"));
const WorkRequest = lazy(() => import("../pages/WorkRequest"));
const RegistrationNumber = lazy(() => import("../pages/RegistrationNumber"));
const WorkRequestReceive = lazy(() => import("../pages/WorkRequestReceive"));
const WorkRequestList = lazy(() => import("../pages/WorkRequestList"));
const WorkRequestListOld = lazy(() => import("../pages/WorkRequestListOld"));
const WorkRequestFormEdit = lazy(() => import("../pages/WorkRequestFormEdit"));
const Jig = lazy(() => import("../pages/Jigs"));
const WorkRequestIssued = lazy(() => import("../pages/WorkRequestIssued"));

const MainRouter: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth);
  return (
    <IonReactRouter>
      <SplitPane>
        <IonRouterOutlet id="main">
          <Route exact path="/login" component={() => <Login />} />
          <Suspense fallback={<IonSpinner name="dots" />}>
            <Route
              exact
              path="/dashboard"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={Dashboard} />
              )}
            />
            <Route
              exact
              path="/department"
              component={() => (
                <PrivateRoute
                  isAuth={isAuth}
                  component={Department}
                  strictRole={["SUPER USER"]}
                />
              )}
            />
            <Route
              exact
              path="/line"
              component={() => (
                <PrivateRoute
                  isAuth={isAuth}
                  component={Line}
                  strictRole={["SUPER USER"]}
                />
              )}
            />
            <Route
              exact
              path="/user"
              component={() => (
                <PrivateRoute
                  isAuth={isAuth}
                  component={User}
                  strictRole={["SUPER USER"]}
                />
              )}
            />
            <Route
              exact
              path="/registration-number"
              component={() => (
                <PrivateRoute
                  isAuth={isAuth}
                  component={RegistrationNumber}
                  strictRole={["SUPER USER"]}
                />
              )}
            />
            <Route
              exact
              path="/work-request-form"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequestForm} />
              )}
            />
            <Route
              exact
              path="/work-request-form-edit"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequestFormEdit} />
              )}
            />
            <Route
              exact
              path="/ticket-request"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={TicketRequest} />
              )}
            />
            <Route
              exact
              path="/work-request"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequest} />
              )}
            />
            <Route
              exact
              path="/work-request-receive"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequestReceive} />
              )}
            />
            <Route
              exact
              path="/work-request-list"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequestList} />
              )}
            />
            <Route
              exact
              path="/work-request-list-old"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequestListOld} />
              )}
            />
            <Route
              exact
              path="/work-request-issued"
              component={() => (
                <PrivateRoute isAuth={isAuth} component={WorkRequestIssued} />
              )}
            />
            <Route
              exact
              path="/jig"
              component={() => (
                <PrivateRoute
                  isAuth={isAuth}
                  component={Jig}
                  strictRole={["SUPER USER"]}
                />
              )}
            />
          </Suspense>
          <Route exact path="/">
            <Redirect to={isAuth ? "/dashboard" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </SplitPane>
    </IonReactRouter>
  );
};

export default MainRouter;
