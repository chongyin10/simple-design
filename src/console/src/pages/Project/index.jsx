import React, { useEffect, useMemo, useState, Fragment, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSetState, useDebounceFn } from "ahooks"
import ProjectList from "./ProjectList"
import {
  Input,
  Button,
  Dropdown,
  Menu,
  Divider,
  Modal,
  Typography,
  message,
  Form,
  Radio,
  Progress
} from "antd"
import {
  SearchOutlined,
  DownOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import "./index.less"
import projectApi from "../../serviceApi/projectApi"
import Icons from "../../components/Icons"
import JSZip from "jszip"
import { resourceInfo } from "../../serviceApi/resourceApi"
import intl from "react-intl-universal";
import { getFilesSize, decimalToPercentage } from '../../utils/index';
import { setZipCompresPercent, setZipVisible, zipVisible, zipCompresPercent } from '../../store/modules/fileSlice';
import { setProject } from '../../store/modules/globalSlice';
import Guide from "byte-guide"
import userInfo from "../../mobx/userInfo"

const { useForm } = Form
const { Text } = Typography
export const ProjectContext = React.createContext({})

export const checkResource = (callback) => {
    if ( process.env.NODE === 'dev') {
      callback();
    } else {
    //   serviceList({ condition: { status: [] } }).then((res) => {
    //     if (res.data.services && res.data.services.length > 0) {
    //         let hasActive = false
    //         for (let i = 0; i < res.data.services.length; i++) {
    //             if (res.data.services[i].status === "active") {
    //                 hasActive = true;
    //                 break;
    //             }
    //         }
    //         if(hasActive) {
    //             callback();
    //         } else {
    //             message.error("没有找到可用资源，请去资源管理下先创建资源，或者左上角切换到另一个团队！");
    //         }
    //     } else {
    //         message.error("没有找到可用资源，请去资源管理下先创建资源，或者左上角切换到另一个团队！");
    //     }
    // }).catch((error) => {
    //     message.error( "没有找到可用资源，请去资源管理下先创建资源，或者左上角切换到另一个团队！");
    // });
      // resourceInfo()
      // .then((res) => { callback() })
      // .catch((err) => {
      //   message.error("没有找到可用资源，请去资源管理下先创建资源，或者左上角切换到另一个团队！");
      // })
      callback()
    }
}

let steps = []

const isModel = process.env.REACT_APP_VERSION === 'MODEL'

function Project(props) {


  if(!isModel && !window.localStorage.getItem('hasGuide')){
    steps = [
      {
        selector: '#tour-project',
        content: '项目可以一体化管理模型开发生产过程中的代码、数据、运行环境及模型。',
        placement:"left",
        offset:{
          x:50
        }

      }
    ]
  }else{
    steps = [

    ]
  }
  if(userInfo.data.navType ==='AIGC'){
    steps = []
  }



  const [addOrUpdateForm] = useForm()
  const [gitCloneForm] = useForm()

  const [gitCloneProjectInfo, setGitCloneProjectInfo] = useSetState({
    visible: false,
    loading: false,
    // 仓库类型
    repoType: "public", // public private
    // 访问类型
    accessType: "", // password accessToken
    info: {},
  })

  const inpRef = useRef()
  const { repoType, accessType } = gitCloneProjectInfo
  const isGitCloneModalOkBtnAllow = useMemo(() => {
    if (repoType === "public") {
      return true
    }
    return accessType === "password" || accessType === "accessToken"
  }, [repoType, accessType])

  const showPublic = useMemo(() => {
    return repoType === "public"
  }, [repoType])
  const showAccessToken = useMemo(() => {
    return repoType === "private" && accessType === "accessToken"
  }, [repoType, accessType])

  const repoTypeChange = (event) => {
    const value = event.target.value
    setGitCloneProjectInfo({
      repoType: value,
      accessType: value === "public" ? "" : "password",
    })
    if (value === "public") {
      resetCloneForm("public")
    }
  }
  const accessTypeChange = (event) => {
    const value = event.target.value
    setGitCloneProjectInfo({
      accessType: value,
    })
    resetCloneForm(value)
  }

  const resetCloneForm = (type) => {
    // type 分为public accessToken 和 password
    if (type === "public") {
      gitCloneForm.setFieldsValue({
        username: "",
        password: "",
        accessToken: "",
      })
    } else if (type === "accessToken") {
      gitCloneForm.setFieldsValue({
        username: "",
        password: "",
      })
    } else if (type === "password") {
      gitCloneForm.setFieldsValue({
        accessToken: "",
      })
    } else {
      gitCloneForm.resetFields()
    }
  }

  const gitCloneOkClick = () => {
    gitCloneForm.validateFields().then((value) => {
      const { url: gitUrl, username, password, accessToken: token } = value
      const data = {
        gitUrl,
        username,
        password,
        token,
      }

      setGitCloneProjectInfo({
        loading: true,
      })

      projectApi
        .addProject(data, "git")
        .then((res) => {
          message.success(intl.get("CLONE_GIT_REPOSITORY_SUCCESSFULLY"))
          getProjectList()
          resetCloneForm()
          setGitCloneProjectInfo({
            visible: false,
            loading: false,
          })
        })
        .catch(() => {
          setGitCloneProjectInfo({
            loading: false,
          })
        })
    })
  }
  const gitCloneCancelClick = () => {
    resetCloneForm()
    setGitCloneProjectInfo({
      visible: false,
    })
  }

  const [projectListState, setProjectListState] = useSetState({
    projectList: [],
    current: 1,
    size: 5,
    total: 0,
    searchText: "",
  })

  const [addOrUpdateProjectInfo, setAddOrUpdateProjectInfo] = useSetState({
    project: {},
    visible: false,
    loading: false,
    isUpdate: false,
  })
  const resetProjectInfo = () => {
    setAddOrUpdateProjectInfo({
      project: {},
      visible: false,
      loading: false,
      isUpdate: false,
    })
  }

  const { projectList, total, size, current, searchText } = projectListState

  useEffect(() => {
    getProjectList()
  }, [current, size])

  const getProjectList = () => {
    setProjectListState({
      projectList: [],
    })

    projectApi
      .getProjectPage({
        current,
        size,
        name: searchText,
      })
      .then((res) => {
        const { total, records } = res.data
        records.total = res.data.total
        dispatch(setProject(records));
        setProjectListState({
          total,
          projectList: records,
        });
      })
  }


  const enterCreate = (e) => {
    if(e.keyCode === 13){
      if(addOrUpdateProjectInfo.visible){
        run()
      }
    }
  }

  const { run } = useDebounceFn(
    () => {
      addOrUpdateProjectOkClick()
    },
    {
      wait: 1500,
    }
  )

  const addOrUpdateProjectOkClick = () => {
    addOrUpdateForm.validateFields().then((value) => {
      const { project, isUpdate } = addOrUpdateProjectInfo

      setAddOrUpdateProjectInfo({
        loading: true,
      })
      if (isUpdate) {
        const data = {
          id: project.id,
          name: value.name,
        }
        projectApi.updateProject(data)
          .then((res) => {
            message.success(intl.get("RENAME_PROJECT_SUCCEEDED"))
            getProjectList()
            resetProjectInfo()
            addOrUpdateForm.resetFields()
          })
          .catch(() => {
            setAddOrUpdateProjectInfo({
              loading: false,
            })
          })
      } else {
        // 调用新增的接口
        projectApi.addProject(
          {
            projectName: value.name,
          },
          "default"
        )
          .then((res) => {
            message.success(intl.get("CREATE_PROJECT_SUCCESSFULLY"))
            getProjectList()
            resetProjectInfo()
            addOrUpdateForm.resetFields()
          })
          .catch(() => {
            setAddOrUpdateProjectInfo({
              loading: false,
            })
          })
      }
    })
  }
  const addOrUpdateProjectCancelClick = () => {
    resetProjectInfo()
    addOrUpdateForm.resetFields()
  }

  const deleteProject = (projectItem) => {
    const { id, name } = projectItem
    Modal.confirm({
      icon: null,
      title: (
        <span style={{ fontWeight: "bold" }}>
          {intl.get("DELETE_ITEM")}{" "}
          <span style={{ color: "#3793EF" }}>{name}</span>?
        </span>
      ),
      content: (
        <Text>
          删除项目会删除项目内的所有文件、工作流。
          <Text type={"danger"}>{intl.get("DELETION_CANNOT_BE_UNDONE")}!{intl.get("PLEASE_PROCEED_WITH_CAUTION")}！</Text>
        </Text>
      ),
      okText: intl.get("STILL_TO_DELETE"),
      okButtonProps: {
        type: "primary",
        danger: true,
      },
      cancelText: intl.get("CANCEL"),
      onOk() {
        return projectApi.deleteProject(id).then(() => {
          message.success(intl.get("DELETE_SUCCEEDED"))
          if (projectList.length === 1 && current !== 1) {
            setProjectListState({
              current: current - 1,
            })
          } else {
            getProjectList()
          }
        })
      },
      onCancel() {},
    })
  }
  const renameProjectName = (projectItem) => {
    addOrUpdateForm.setFieldsValue({
      name: projectItem.name,
    })
    setAddOrUpdateProjectInfo({
      visible: true,
      isUpdate: true,
      project: projectItem,
    })
  }

    const dispatch = useDispatch();
    const zipVisibleFlgs = useSelector(zipVisible);
    const zipCompresPercentData = useSelector(zipCompresPercent);
    const [visibleIs, setVisibleIs] = useState(false); // 区别压缩还是上传action
    const [uploadZipFile, setUploadZipFile] = useState(0);

    const antIcon = useMemo(()=> {
        return (
            <Modal
                visible={zipVisibleFlgs}
                closable={false}
                footer={null}
                title={<span>{intl.get("SUB_MENU_IMPORTFILES")}</span>}
            >
                <React.Fragment>
                    {
                        visibleIs ? <div style={{display: 'flex'}}><Progress percent={zipCompresPercentData} /><div style={{width: '200px', marginLeft: '35px'}}>{intl.get("COMPRES_PERCENT_LOCAL_FILE")}...</div></div> :
                        <div style={{display: 'flex'}}><Progress percent={uploadZipFile} /><div style={{width: '200px', marginLeft: '35px'}}>{intl.get("IMPORTING_LOCAL_FILE")}...</div></div>
                    }
                </React.Fragment>
            </Modal>
        )
    }, [zipCompresPercentData, zipVisibleFlgs, visibleIs, uploadZipFile]);

    const generateZipFile = ( zipName, files, options = { type: "blob", compression: "DEFLATE" }, folderName ) => {
        dispatch(setZipVisible(true));
        const filesSize = getFilesSize(files);
        const zip = new JSZip();
        let size = 0;
        for (let i = 0; i < files.length; i++) {
            // 添加目录中包含的文件
            zip.file(files[i].webkitRelativePath, files[i]);
            size = size + files[i].size; // 每次累加
            const compresPercent = decimalToPercentage(size / filesSize, 2, false);
            // 若是用redux，用异步方式获取同步数据
            setTimeout(() => {
                compresPercent === '100.00' ? setVisibleIs(false) : setVisibleIs(true);
                dispatch(setZipCompresPercent(compresPercent));
            });
        };

        zip.generateAsync(options).then(function (blob) {
            // 生成zip文件
            zipName = zipName || Date.now() + ".zip"
            const zipFile = new File([blob], zipName, {
                type: "application/zip",
            });
            let uploadSize = 0;
            let time = null;
            time = setInterval(() => {
                if ( uploadSize > 90 ) { // 当数值到90，结束
                    clearInterval(time);
                } else {
                  uploadSize = uploadSize + 1;
                  setUploadZipFile(uploadSize);
                }
            }, 500);
            // 发送压缩包
            projectApi.addProject( { projectName: folderName, datafile: zipFile, index: 1, total: 1}, "file").then((res) => {
                clearInterval(time);
                setUploadZipFile(100);
                setTimeout(() => {
                    dispatch(setZipVisible(false));
                    dispatch(setZipCompresPercent(0));
                }, 1000);
                getProjectList()
            }).catch( error => { // 捕捉异常
                dispatch(setZipVisible(false));
                dispatch(setZipCompresPercent(0));
            })
        })
    };

    // 获取文件
    const handleFileChange = (domId) => {
        const files = document.getElementById(domId).files;
        if (files.length === 0) return;
        const webkitRelativePath = files[0].webkitRelativePath;
        const folderName = webkitRelativePath.split("/")[0];
        const zipFileName = folderName + ".zip";
        // 文件压缩
        generateZipFile(zipFileName, files, undefined, folderName);
        // 重置input类型file
        document.getElementById(domId).value = "";
    }

  const createProjectMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          checkResource(() => {
            setAddOrUpdateProjectInfo({
              visible: true,
            })
            inpRef.current?.focus({ cursor: 'start' })
          })

        }}
        key="1"
      >
        {intl.get("CREATE_NEW_PROJECT")}
      </Menu.Item>
      <Divider />
      <Menu.Item
        key="2"
        onClick={() => {
          checkResource(() => {
            document.getElementById("createProjectChooseFolder").click()
          })
        }}
      >
        {intl.get("IMPORT_FROM_LOCAL")}
      </Menu.Item>
      <Divider />
      <Menu.Item
        onClick={() => {
          checkResource(() =>
            setGitCloneProjectInfo({
              visible: true,
            })
          )
        }}
        key="3"
      >
        {intl.get("CLONE_THE_GIT_REPOSITORY")}
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="project" onKeyDown={(e) => enterCreate(e)}>
      <div id={'tour-project'}>
        <input
          type="file"
          id="createProjectChooseFolder"
          multiple={true}
          onChange={(e) => handleFileChange("createProjectChooseFolder")}
          webkitdirectory="true"
          style={{ display: "none" }}
        />

        {antIcon}
        <div className="project-title">{intl.get("PROJECT_LIST")}</div>
        <ProjectContext.Provider value={{ deleteProject, renameProjectName }}>
          <div className="project-search-create">
            <Input.Group style={{ width: 320 }} compact>
              <Button
                onClick={getProjectList}
                icon={
                  <SearchOutlined style={{ color: "white", fontSize: "22px" }} />
                }
                style={{
                  width: "56px",
                  height: "40px",
                  textAlign: "center",
                  backgroundColor: "#1890FF",
                }}
                type="primary"
              />
              <Input
                onChange={(event) => {
                  setProjectListState({
                    searchText: event.target.value,
                    current: 1
                  })
                }}
                onPressEnter={getProjectList}
                placeholder={intl.get("SEARCH_PROJECT_NAME")}
                allowClear
                style={{ width: "264px", height: "40px" }}
              />
            </Input.Group>

            <Dropdown overlay={createProjectMenu}>
              <Button
                className={"create-project-btn"}
                icon={<PlusOutlined style={{ color: "#fff" }} />}
                style={{ height: 40 }}
                type={"primary"}
              >
                {intl.get("CREATE_PROJECT")}
                <DownOutlined style={{ color: "#fff" }} />
              </Button>
            </Dropdown>
          </div>

          <ProjectList
            projectList={projectList}
            total={total}
            size={size}
            current={current}
            setProjectListState={setProjectListState}
          />
        </ProjectContext.Provider>

        <Modal
          wrapClassName={"add-or-update-project-modal"}
          title={
            <span style={{ fontWeight: "bold" }}>
            {addOrUpdateProjectInfo.isUpdate ? intl.get("PROJECT_RENAME") : intl.get("CREATE_NEW_PROJECT")}
          </span>
          }
          visible={addOrUpdateProjectInfo.visible}
          maskClosable={false}
          confirmLoading={addOrUpdateProjectInfo.loading}
          onOk={run}
          okText={intl.get("OK")}
          okButtonProps={{
            size: "large",
          }}
          cancelText={intl.get("CANCEL")}
          onCancel={addOrUpdateProjectCancelClick}
          cancelButtonProps={{
            size: "large",
          }}
        >
          <Form form={addOrUpdateForm}>
            <Form.Item
              name={"name"}
              rules={[{ required: true, message: intl.get("PROJECT_NAME_CANNOT_BE_EMPTY") }]}
            >
              <Input placeholder={intl.get("PLEASE_ENTER_A_PROJECT_NAME")} size={"large"} ref={inpRef} />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          wrapClassName={"git-clone-project-modal"}
          title={<span style={{ fontWeight: "bold" }}>{intl.get("CLONE_THE_GIT_REPOSITORY")}</span>}
          visible={gitCloneProjectInfo.visible}
          onOk={gitCloneOkClick}
          okText={intl.get("OK")}
          okButtonProps={{ size: "large", disabled: !isGitCloneModalOkBtnAllow }}
          confirmLoading={gitCloneProjectInfo.loading}
          onCancel={gitCloneCancelClick}
          cancelText={intl.get("CANCEL")}
          cancelButtonProps={{
            size: "large",
          }}
        >
          <Form form={gitCloneForm}>
            <Form.Item>
              <Radio.Group
                onChange={repoTypeChange}
                value={gitCloneProjectInfo.repoType}
              >
                <Radio value={"public"}>{intl.get("PUBLIC_LIBRARY")}</Radio>
                <Radio value={"private"}>{intl.get("PRIVATE_LIBRARY")}</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name={"url"}
              rules={[{ required: true, message: intl.get("PLEASE_ENTER_AN_HTTP_URL") }]}
            >
              <Input placeholder={intl.get("PLEASE_ENTER_AN_HTTP_URL")} size={"large"} />
            </Form.Item>

            {!showPublic ? (
              <Fragment>
                <Divider />
                <div style={{ marginBottom: 10 }} />
              </Fragment>
            ) : null}

            <Form.Item hidden={showPublic}>
              <Radio.Group
                onChange={accessTypeChange}
                value={gitCloneProjectInfo.accessType}
              >
                <Radio value={"password"}>{intl.get("ACCESS_VIA_USERNAME_AND_PASSWORD")}</Radio>
                <Radio value={"accessToken"}>{intl.get("ACCESS_VIA_ACCESS_TOKEN")}</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              hidden={showPublic || showAccessToken}
              name={"username"}
              rules={[
                {
                  required: !(showPublic || showAccessToken),
                  message: intl.get("PLEASE_ENTER_USER_NAME"),
                },
              ]}
            >
              <Input placeholder={intl.get("PLEASE_ENTER_USER_NAME")} size={"large"} />
            </Form.Item>
            <Form.Item
              hidden={showPublic || showAccessToken}
              name={"password"}
              rules={[
                {
                  required: !(showPublic || showAccessToken),
                  message: intl.get("PLEASE_ENTER_PASSWORD"),
                },
              ]}
            >
              <Input.Password
                size={"large"}
                placeholder={intl.get("PLEASE_ENTER_PASSWORD")}
                iconRender={(visible) =>
                  visible ? (
                    <Icons.showPwdIcon style={{ fontSize: 20 }} />
                  ) : (
                    <Icons.hidePwdIcon style={{ fontSize: 20 }} />
                  )
                }
              />
            </Form.Item>

            <Form.Item
              hidden={showPublic || !showAccessToken}
              name={"accessToken"}
              rules={[
                {
                  required: !(showPublic || !showAccessToken),
                  message: intl.get("PLEASE_ENTER_ACCESS_TOKEN"),
                },
              ]}
            >
              <Input placeholder={intl.get("PLEASE_ENTER_ACCESS_TOKEN")} size={"large"} />
            </Form.Item>
          </Form>
        </Modal>

        {
          projectList.length>0?(
            <Guide
              className='my-guide'
              steps={steps}
              afterStepChange={(nextIndex, nextStep)=> {
                if(nextIndex ===1){
                  window.localStorage.removeItem("hasGuide")
                  projectApi.getFirstProject().then((res)=>{
                    const id = res.data.id
                    history.pushState({}, null, `/studio/workspace?projectId=${id}`);
                  })
                }
              }}
              beforeStepChange={(stepIndex, step)=>{}}
              stepText={(stepIndex, stepCount) => {

                return `第${stepIndex}步，共6步`
              }}
              nextText="下一步"
              prevText="上一步"
              showPreviousBtn
              okText='下一步'
              onClose={()=>{
                window.localStorage.setItem("hasGuide","true")
              }}
            />
          ):null
        }

      </div>
    </div>
  )
}

export default Project
