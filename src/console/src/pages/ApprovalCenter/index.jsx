import React from 'react'
import "./index.less"
import {Switch} from "react-router-dom"
import ApprovalCenterIndex from "./pages/ApprovalCenterIndex"
import {Route} from "react-router"



function Index(props) {
  return (
    <div className={"approval-center"}>
      <Switch>
        <Route exact path={'/approvalCenter'} component={ApprovalCenterIndex} />
      </Switch>
    </div>
  )
}

export default Index
