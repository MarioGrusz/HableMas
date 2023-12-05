import mongoose from 'mongoose';

const withSession = async (callback) => {
    const session = await mongoose.startSession();
    try {
        const result = await session.withTransaction(callback);
        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export default withSession
 