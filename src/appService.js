import axios from "axios";
const baseUrl ='https://api.producthunt.com/v1';
export default function apiCall (endPoint) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + endPoint, {
            headers:{
                Authorization: 'Bearer Xbdpx_jQy6cWVQE-rfPPso8-F_PZZrgItIDRGKumkIw',
            }
        })
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error);
            });
    });
};