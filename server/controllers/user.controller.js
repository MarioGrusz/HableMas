import { createUser } from '../services/user.service.js';


/**
 * @desc   Creates a new user in the database.
 * @route  POST /api/v1/user
 * @access public
*/


const createUserController = async (req, res, next) => {

  const { name, email, firebaseId } = req.body;

  try {
    const newUser = await createUser(name, email, firebaseId);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};


export {
  createUserController,
}