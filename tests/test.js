import axios from 'axios';
import qs from 'qs';

const url = 'https://www.mykoob.lv/?oauth2/authorizeDevice';
const payload = {
    use_oauth_proxy: 1,
    client: "MykoobMobile",
    username: 'dpolizhai@edu.riga.lv',
    password: 'dfqyth49!',
};

// Sending data as URL-encoded format
axios.post(url, qs.stringify(payload), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
    .then(response => {
        console.log('Success:', response.data); // Handle the JSON data
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message); // Handle any errors
    });
