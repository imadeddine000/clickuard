import axios from 'axios'
import https from 'https'

const Axios = axios.create({
    baseURL:'https://101.44.39.177:55000',
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
})
 

export default Axios