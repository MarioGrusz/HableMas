import admin from "../config/firebaseAdmin.js";


const authenticateToken = async (req, res, next) => {
  try {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.uid = decodedToken.uid;
      next();
    } else {
      console.log(req.headers?.authorization)
      throw new Error('Unauthorized');
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export default authenticateToken;

 