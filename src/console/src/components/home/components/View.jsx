import React from "react"
import { Redirect, Route } from "react-router"
import { Switch } from "react-router-dom"
import routes from "../../../config/routes"

function View(props) {

    const routerFilter = (route, childrenRoute = []) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                component={route.component}
            >
                {childrenRoute.length > 0 && childrenRoute}
            </Route>
        )
    }

    return (
        <div className={"router-view"}>
            <Switch>
                <Redirect exact from="/" to="/overview" />
                {routes.map((route) => route.children.length ===0 && routerFilter(route))}
            </Switch>
        </div>
    )
}

export default View
