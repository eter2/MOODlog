const User = require('../models/User');
const UserService = require("../services/UserService");

// 사용자 목록 가져오기
exports.getUserList = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 사용자 삭제하기
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 비밀번호 변경
exports.changePassword = async (req, res) => {
    try {
        console.log(req.user);
        const email = req.email;
        const {password} = req.body;
        console.log(email);
        console.log(password);

        const user = await UserService.changePW(email,password);

        res.status(200).send("성공적으로 변경되었습니다!");
    } catch (error) {res.status(500).json({ message: error.message });}
};