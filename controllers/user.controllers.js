import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try{
        const allUsers = await User.find();
        if(!allUsers){
            const error = new Error('Error while querying to find all users!');

            error.statusCode = 500;
            throw error;
        }

        if(allUsers.length === 0){
            return res.status(200).json({
                success: true,
                message: 'No user created till now!',
                data: allUsers,
            });
        }

        return res.status(200).json({
            success: true, 
            message: 'Returned All Users!',
            data: allUsers,
        });

    }catch(err){
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found');

            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Returned the user!',
            data: user
        });

    }catch(err){
        next(err);
    }
}