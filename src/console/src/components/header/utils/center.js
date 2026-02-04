import axios from 'axios';

let center;

export const getHost = async () => {
    try {
        const result = await axios.get('/0/api/v1/user/open/url');
        return result.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const centerInfo = async () => {
    if (!center) {
        console.log({ center, time: Date.now() })
        const host = await getHost();
        center = {
            host
        }
    }
    return center;
}