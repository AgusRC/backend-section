const { generateToken } = require("../helpers/jwt.helper");
let _userService = null;

class AuthService {
    constructor({ UserService }){
        _userService = UserService;
    }

    async signUp(user){
        const {username} = user;
        const userExist = await _userService.getUserByUsername(username);
        if(userExist){
            const error = new Error();
            error.status = 400;
            error.message = "user already exist";
            throw error;
        }

        return await _userService.create(user);
    }

    async signIn(user){
        const {username, password} = user;   
        const userExist = await _userService.getUserByUsername(username);
        if(!userExist){
            const error = new Error();
            error.status = 404;
            error.message = "user dont exist";
            throw error;
        }
        
        userExist.comparePasswords(password, user.password, function(err, isMatch){
            if (err) throw done(err);
            if (isMatch) {
             //return done(null, user);
            } else {
             done(null, false, {message: 'Invalid Password'});
            }
        });

        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        };

        const token = generateToken(userToEncode);

        return { token, user: userExist };
    }

}

module.exports = AuthService;