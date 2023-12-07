import User from '../../models/user.js';

const findUser = async (uid) => {
    const user = await User.findOne({ firebaseId: uid });
    if (!user) {
        console.log('User not found.');
        return null;
    }
    return user;
};

export default findUser
 