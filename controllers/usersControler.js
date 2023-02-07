const Users = require('../model/Users')

const getAllUsers = async (req, res) => {
    const users = await Users.find();
    if (!users) return res.status(204).json({'error': 'Users not found'});
    res.json(users);
};

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
};

const getUser = async (req, res) => {
    if (!req.params.id) return res.status(404).json({'message': "User dosn't exist"});
    const user = await Users.findOne({_id: req.params.id}).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
};

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
};