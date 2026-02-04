import './index.less'
import Container from './container'
import Accountinfo from './accountinfo'
function OverView(){
  return <div className='overview'>
    <div className='container'>
      <Container />
    </div>
    <div className='accountinfo'>
      <Accountinfo />
    </div>
  </div>
}

export default OverView