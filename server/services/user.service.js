import User from '../models/user.js';

const createUser = async (name, email, firebaseId) => {
    
  try {
    const userExists = await User.findOne({ email });

    if (userExists) return userExists;

    const newUser = await User.create({
      name,
      email,
      firebaseId,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

export { createUser };