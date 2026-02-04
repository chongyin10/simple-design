import React, { useEffect } from "react"
import Home from "../home"
import AccountSetting from "../accountSetting"
import Pay from "../../pages/Pay"
import "./index.less"
import { Switch } from "react-router-dom"
import { Route, useHistory, useLocation } from "react-router"
import SubmitOrder from "../../pages/SubmitOrder"
import { selectRoleKeyList } from "../../store/modules/userSlice"
import { useSelector } from "react-redux"
import PrivateIncreaseResource from "../../pages/PrivateIncreaseResource"
import AccountPage from "../../pages/AccountPage"
import { useMemo } from "react"
import ResourceAdd from "../../pages/Resource/ResourceAdd"
import {hasModulePermission} from "../../utils/storage"


function Content(props) {
    const roleKeyList = useSelector(selectRoleKeyList)

    const handleFilter = (route) => {
        return roleKeyList.includes("admin") || !route.roles || roleKeyList.some((roleKey) => route.roles.includes(roleKey));
    }

    const loadRoute = useMemo(() => {
        const REACT_APP_VERSION = process.env.REACT_APP_VERSION;
        console.log(REACT_APP_VERSION, 'REACT_APP_VERSION')
        let routes = [<Route key="myAccount" path={"/myAccount"} component={AccountPage} />];
        switch (REACT_APP_VERSION) {
            case "SAAS":{
              if (hasModulePermission("resource_management")){
                routes.push(
                  <Route
                    key="submitOrder"
                    exact
                    path="/submitOrder"
                    render={() => {
                      return <SubmitOrder />
                    }}
                  />
                );
              }
            }
            break;
            case "HOST":{
              if(hasModulePermission("resource_management")){
                routes.push(
                  <Route
                    key="addResource"
                    exact
                    path="/addResource"
                    render={() => {
                      return <ResourceAdd />
                    }}
                  />)
              }
            }
            break
        }
        routes.push(<Route key="home" path="/" component={Home} />)
        return routes;
    }, []);

    return (
        <div className={"content"}>
            <Switch>
                {loadRoute}
            </Switch>
        </div>
    )
}

export default Content
