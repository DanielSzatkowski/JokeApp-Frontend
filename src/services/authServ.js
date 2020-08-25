import {axiosRegistration as req} from './httpRequest';

class AuthServ {
    
    authorize(username, password) {
        return (req.post('/login', {
            login: username,
            password
        }));
    }

    getUserToken() {
        if(localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            console.log("User's token not known!")
            return '';
        }
    }
}

export default new AuthServ();