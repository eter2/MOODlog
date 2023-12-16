const User = require('../models/User');
const hashUtil = require("../../utils/hashUtil");

class UserService {
    async createUser(userData) {
        const salt = crypto.randomBytes(64).toString('base64');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
        const user = await User.create({
            email,
            password: HashedPassword,
            username,

        });
        await user.save();
        return user;
    }

    async findUserById(userId) {
        return User.findById(userId);
    }

}

exports.changePW = async (email,password) => {
    const hashedPassword = await hashUtil.hashPassword(password);
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
    );

    console.log(updatedUser);
    return updatedUser;
};

