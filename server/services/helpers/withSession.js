import mongoose from 'mongoose';


const withSession = async (callback) => {
    const session = await mongoose.startSession();
    try {
        const result = await session.withTransaction(callback);
        if (session.inTransaction()) {
            await session.commitTransaction();
        }
        return result;
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        throw error;
    } finally {
        session.endSession();
    }
 };
 

export default withSession
 