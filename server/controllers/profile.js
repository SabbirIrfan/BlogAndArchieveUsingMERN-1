import User from "../models/user.js";

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const userData = await User.find({email: id});
        console.log(userData)
        res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
