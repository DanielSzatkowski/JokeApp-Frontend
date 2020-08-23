import {axiosRegistration as req} from './httpRequest';

class AuthServ {
    
    authorize(username, password) {
        req.post('/login', {
            username: username,
            password
        }).then(resp => {
            if(resp.headers['Authorization']) {
                localStorage.setItem('token', resp.headers['Authorization']);
                localStorage.setItem('username', username);
            }

            return Response.headers;
        }).catch((err) => {
            console.log(err);
        });
    }

    getUserToken() {
        if(localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            console.log("User's token not known!")
            return '';
        }

        return false;
    }
}

export default new AuthServ();