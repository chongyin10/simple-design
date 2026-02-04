import { useEffect, useState } from 'react';
import { Marquee } from '@idp-studio/design';
import { getSystemBulletinLatest } from '../../serviceApi/notice';
import '@idp-studio/design/dist/es/index.css';
function Notice() {

    const [noticeData, setNoticeData] = useState([]);

    useEffect(() => {
        getSystemBulletinLatestAsync();
    }, []);

    const getSystemBulletinLatestAsync = async () => {
        try {
            const data = await getSystemBulletinLatest();
            if (data.data) {
                setNoticeData(data.data.map(item => `【${item.title}】: ${item.content}`))
            }
        } catch (error) {

        }
    }

    return <>
        {
            noticeData.length > 0 ? <Marquee
                announcement={noticeData}
                speed={80}
                fixed={true}
                backgroundColor="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
            /> : null
        }
    </>
}

export default Notice;