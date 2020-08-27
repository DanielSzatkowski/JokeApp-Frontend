import {axiosRegistration as req} from './httpRequest';

class AuthServ {
    
    authorize(username, password) {
        return (req.post('/login', {
            login: username,
            password
        }).then((resp) => {
            if(resp.headers['authorization']) {
                localStorage.setItem('token', resp.headers['authorization'])
                localStorage.setItem('login', username);
            }
        }));
    }

    getUserToken() {
        if(localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            console.log("User's token not known!");
            return '';
        }
    }

    register(login, password, email, description) {
        let userObj = {
            login, 
            password, 
            email, 
            description
        }

        return (
            req.post('/registration', userObj)
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
    }
}

export default new AuthServ();