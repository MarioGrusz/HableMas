import User from '../../models/user.js';

const findUser = async (firebaseId) => {
    const user = await User.findOne({ firebaseId }).session(session);
    if (!user) {
        console.log('User not found.');
        return null;
    }
    return user;
};

export default findUser
 