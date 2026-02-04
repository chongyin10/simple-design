import {
  AppstoreOutlined, UserOutlined, HighlightOutlined, FileTextOutlined, MoneyCollectOutlined, ProductOutlined,
  AccountBookOutlined, BarsOutlined, PayCircleOutlined, GlobalOutlined, LineChartOutlined, TabletOutlined, HomeOutlined,
  SettingOutlined, CalculatorOutlined, SaveOutlined, PieChartOutlined, VideoCameraOutlined
} from '@ant-design/icons';
import Icons from "../components/Icons"
import Team from "../pages/Team"
import ApprovalCenter from "../pages/ApprovalCenter"
import CustomerFeedback from "../pages/CustomerFeedback"
import UserManager from "../pages/UserManager"
import MyModel from "../pages/MyModel";
import Overview from '../pages/Cost/overview';
import Rrecharges from '../pages/Cost/recharges';
import Bill from '../pages/Cost/bill';
import Indent from '../pages/Cost/indent';
import Invoice from '../pages/Cost/invoice';
import Revenue from '../pages/Cost/revenue';
import Resource from "../pages/Resource"
import Order from "../pages/Order"
import Monitor from '../pages/Monitor';
import intl from 'react-intl-universal';
import ApplicationStudio from '../pages/Application/Studio';
import ApplicationLM from '../pages/Application/LM';
import Success from '../pages/Cost/success';
import Fail from '../pages/Cost/fail';
import CalculateInstance from '../pages/CalculateInstance'
import Storage from '../pages/Storage';
import Task from '../pages/Task';
import MonitorEngine from '../pages/MonitorEngine'
import OverView from '../pages/OverView';
import { forEach } from 'lodash';
import Expenditure from '../pages/Expenditure'
// import Quota from '../pages/Quota';

function gerModulePermissionList(moduleName) {
  const permissionList = JSON.parse(
    window.localStorage.getItem('permission_list')
    || '[]'
  )
  const findResult = permissionList.find(item => item.module === moduleName)

  return findResult ? findResult.operationList : []
}

const menus = () => {
  let menusArr = [
    {
      title: intl.get('TEAM_MENU_OVERVIEW'),
      key: "/overview",
      component: OverView,
      icon: HomeOutlined,
    },
    {
      title: intl.get('CASE_MANAGEMENT'),
      key: "/instancemanage",
      icon: SettingOutlined,
      children: [
        {
          title: intl.get('CALCULATION_INSTANCE'),
          key: "/instancemanage/calculateinstance",
          component: CalculateInstance,
          icon: CalculatorOutlined,
        },
        // {
        //   title: '存储',
        //   key: "/instancemanage/storage",
        //   component: Storage,
        //   icon: SaveOutlined,
        // },
        {
          title: intl.get('ASSIGNMENT'),
          key: "/instancemanage/task",
          component: Task,
          icon: PieChartOutlined,
        },
        // {
        //   title: '监控',
        //   key: "/instancemanage/monitor",
        //   component: MonitorEngine,
        //   icon: VideoCameraOutlined,
        // }
      ]

    },
    // {
    //   title: intl.get('TEAM_MENU_APPLICATION'),
    //   key: "/application",
    //   icon: AppstoreOutlined,
    //   children: [
    //     {
    //       title: intl.get('TEAM_APPLICATION_STUDIO'),
    //       key: "/application/studio",
    //       icon: ProductOutlined,
    //       component: ApplicationStudio,
    //     },
    //     {
    //       title: intl.get('TEAM_APPLICATION_LM'),
    //       key: "/application/lm",
    //       icon: ProductOutlined,
    //       component: ApplicationLM,
    //     },
    //     {
    //       title: intl.get('TEAM_APPLICATION_ENGINE'),
    //       key: "/application/engine",
    //       icon: ProductOutlined,
    //     },
    //   ]
    // },
    {
      title: intl.get('TEAM_MENU_MEMBER'),
      key: "/member",
      component: Team,
      icon: UserOutlined,
      permission: 'team_manage'
    },
    // {
    //   title: intl.get('TEAM_MENU_APPROVE'),
    //   key: "/approvalCenter",
    //   component: ApprovalCenter,
    //   icon: HighlightOutlined,
    //   permission: 'pending_audit'
    //   // permission: 'audit_page' // 这行代码是好运写的，但是后台给的是 pending_audit 不清楚原因
    // },
    // {
    //   title: intl.get('TEAM_MENU_DEMAND'),
    //   key: "/customerFeedback",
    //   component: CustomerFeedback,
    //   icon: FileTextOutlined,
    //   permission: "model_rfc"
    // },
    {
      title: intl.get('TEAM_MENU_COST'),
      key: "/cost",
      component: Overview,
      icon: MoneyCollectOutlined,
      children: [
        {
          title: intl.get('TEAM_MENU_COST_OVERVIEW'),
          key: "/cost/overview",
          component: Overview,
          icon: GlobalOutlined,
        },
        {
          title: intl.get('TEAM_MENU_COST_ORDER'),
          key: "/cost/indent",
          component: Indent,
          icon: BarsOutlined,
        },
        {
          title: intl.get('TEAM_MENU_COST_REVENUE'),
          key: "/cost/revenue",
          component: Revenue,
          icon: LineChartOutlined,
        },
        {
          title: intl.get('TEAM_MENU_COST_RECHARGES'),
          key: "/cost/recharges",
          component: Rrecharges,
          icon: PayCircleOutlined,
        },
        {
          title: intl.get('TEAM_MENU_COST_BILL'),
          key: "/cost/bill",
          component: Bill,
          icon: AccountBookOutlined,
        },
        {
          title: intl.get('TEAM_MENU_COST_INVOICE'),
          key: "/cost/invoice",
          component: Invoice,
          icon: TabletOutlined,
        },
        {
          title: '',
          key: "/cost/success",
          component: Success,
          hideInMenu: true,
          icon: TabletOutlined,
        },
        {
          title: '',
          key: "/cost/fail",
          component: Fail,
          hideInMenu: true,
          icon: TabletOutlined,
        }
      ]
    },
    {
      title: '成本管理',
      key: "/expenditure",
      component: Expenditure,
      icon: HighlightOutlined,
      children: [
        {
          title: '积分变更记录',
          key: "/expenditure/log",
          component: Expenditure,
          icon: HighlightOutlined,
        },
        // {
        //   title: '积分使用额度',
        //   key: "/expenditure/quota",
        //   component: Quota,
        //   icon: HighlightOutlined,
        // },
      ]
    },
    // {
    //   title: intl.get('TEAM_MENU_RESOURCE'),
    //   key: "/resource",
    //   component: Resource,
    //   icon: Icons.BHResourceIcon,
    //   permission: "resource_management"
    // },
    // {
    //   title: intl.get('TEAM_MENU_MONITOR'),
    //   key: "/monitor",
    //   component: Monitor,
    //   icon: Icons.BHmonitorIcon,
    //   permission: "monitor"
    // }
  ]
  // window.localStorage.getItem('hasGuide')
  forEach(menusArr, (item,index) => {
    if(item.key === '/cost'){
      if(!gerModulePermissionList('cost')?.length){
        menusArr.splice(index,1)
      }
    }
  })
  return menusArr
}

export default menus;