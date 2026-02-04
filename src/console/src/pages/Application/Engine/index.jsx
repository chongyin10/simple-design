import { Card } from "antd";

const ApplicationEngine = () => {
  return <div>
    <Card
      title={<a href="http://60.31.21.42:12912/lm" target="_blank">
        60.31.21.42:12912
      </a>}
      style={{
        width: 300,
      }}
    >
      <p>
        资源总量： 8卡 nvidia/3090， 32核，64GB 
      </p>
      <p>
        任务总数： 100
      </p>
    </Card>
  </div>
}

export default ApplicationEngine;