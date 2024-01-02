const AuthModel = require('../Models/AuthModel');
const ContactModel = require('../Models/ContactModel');
const Bcrypt = require('bcrypt');
const { resposeReturn } = require('../Utils/Response');
const { CreateToken } = require('../Utils/CreateToken');
const formidable = require('formidable');

class AuthController {
  
    UserLogin = async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await AuthModel.findOne({ email }).select('+password')
            if (user) {
                const match = await Bcrypt.compare(password, user.password)
                if (match) {
                    const token = await CreateToken({
                        id: user.id,
                    })
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                   resposeReturn(res, 200, { token, message: 'Login success' })
                } else {
                   resposeReturn(res, 404, { error: "Password wrong" })
                }
            } else {
                resposeReturn(res, 404, { error: "email not found" })
            }
        } catch (error) {
            resposeReturn(res, 500, { error: error.message })
        }
    }

    UserRegister = async (req, res) => {
        const { email, name, password } = req.body
        try {
            const getUser = await AuthModel.findOne({ email })
            if (getUser) {
                resposeReturn(res, 404, {error: 'email already exit'})
            }
            else {
                const user = await AuthModel.create({
                    name,
                    email,
                    password: await Bcrypt.hash(password, 10),
                    method: 'menualy'
                })
                console.log(user)
                 resposeReturn(res, 200, { user, message: 'Registation Successful' })
            }
        } catch (error) {
            console.log(error)
            
        }
    }

     getUser= async(req, res)=> {
        try {
            const { id } = req;

            if (role === 'user') {
                const user = await Adminmodel.findById(id);
                resposeReturn(res, 200, { userInfo: user });
            } else {
                console.log('User Find');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
   
}

module.exports = new AuthController();
