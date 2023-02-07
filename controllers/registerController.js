const User = require('../model/Users')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({"message": 'Username and password is resquired'})
    };

    const duplicate = await User.findOne({username: user}).exec();
    if (duplicate){
        res.sendStatus(409);
    }
    try {
        //encrypt passowrd
        const hashPwd = await bcrypt.hash(pwd, 10);
        //store new user
        const result = await User.create({
            "username": user,
            "password": hashPwd
        });
        
        console.log(result);
        res.status(201).json({"succes": `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({"message": err.message});
    }
} 

module.exports = { handleNewUser };