const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/userModels');

// Create a new user
const createUser = expressAsyncHandler(async (req, res) => {
    const { clerk_id, firstname, lastname, phone, bio, university, level } = req.body;

    // Check if the user with the given clerk_id already exists
    const userExists = await UserModel.findOne({ clerk_id });

    if (userExists) {
        return res.status(400).json({ message: 'User with this clerk_id already exists' });
    }

    // Create a new user
    const user = new UserModel({
        clerk_id,
        firstname,
        lastname,
        phone,
        bio,
        university,
        level
    });

    await user.save();
    res.status(201).json(user);
});

// Get a user by clerk_id
const getUser = expressAsyncHandler(async (req, res) => {
    const { clerk_id } = req.query;
    const user = await UserModel.findOne({ clerk_id });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
});

// Update a user by clerk_id
const updateUser = expressAsyncHandler(async (req, res) => {
    const { clerk_id } = req.query;
    const updatedData = req.body;

    const user = await UserModel.findOneAndUpdate({ clerk_id }, updatedData, { new: true });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
});

module.exports = {
    createUser,
    getUser,
    updateUser,
};