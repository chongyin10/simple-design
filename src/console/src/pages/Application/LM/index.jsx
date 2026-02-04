import { Card } from "antd";

const ApplicationLM = () => {
  return <div>
    <Card
      title={<a href="http://106.75.37.208:8001/lm" target="_blank">
        106.75.37.208:8001
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

export default ApplicationLM;