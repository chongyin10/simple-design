
function Task(){
  const srcPath = process.env.NODE == 'dev' ? `//localhost:9093/?project=true&area=false&action=true` : `/child/idpStudio-projectSpace/?project=true&area=false&action=true`
  return <div style={{ height: 'calc(100vh - 70px)' }}>
    <iframe src={srcPath} style={{ border: 'medium none', width: '100%', height: '100%', overflow: 'hidden' }} />
  </div>

}

export default Task