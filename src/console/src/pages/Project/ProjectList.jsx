import React from "react"
import { List } from "antd"
import ProjectItem from "./ProjectItem"

const ProjectList = (props) => {
  const { projectList, total, size, current, setProjectListState } = props
  return (
    <React.Fragment>
      <List
        className={'project-list-container'}
        pagination={{
          onChange: (page, pageSize) => {
            const size = pageSize
            const current = page
            setProjectListState({ size, current })
          },
          pageSize: size,
          total,
          current,
          hideOnSinglePage: true,
        }}
        itemLayout="horizontal"
        dataSource={projectList}
        split={false}
        renderItem={(item) => {
          return (
            <List.Item>
              <ProjectItem projectItem={item} />
            </List.Item>
          )
        }}
      />
    </React.Fragment>
  )
}

export default ProjectList
