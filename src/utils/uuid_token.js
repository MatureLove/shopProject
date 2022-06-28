//引入uuid
import { v4 as uuidv4 } from 'uuid';
//生成uuid,在生成之前先判断本地存储器是否已经有uuid，如果有就不再生成
export const getUUID = () => {
    //我们先来获取看看本地存储器里面是否有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有我们就新生成一个
    if (!uuid_token) {
        uuid_token = uuidv4()
        //将新生成的uuid存到本地存储器
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}