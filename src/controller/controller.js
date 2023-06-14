const mongoose = require('mongoose');
const httpStatus = require('http-status');
const User = require('../models/user');

// const user = mongoose.model('User', userSchema);
const findAll = async (ctx) => {
    const users = await User.find();
    ctx.body = { message: 'User list', data: users };
};

const create = async (ctx) => {
    const { name, email } = ctx.request.body;
    const newUser = new User({ name, email });
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        ctx.status = httpStatus.CONFLICT;
        ctx.body = { message: 'Email already exists' };
    } else {
        const savedUser = await newUser.save()
        ctx.status = httpStatus.OK;
        ctx.body = { message: 'User created successfully', data: savedUser };
    }
};

// Get a specific user by ID
const findOne = async (ctx) => {
    const { id } = ctx.params;
    const user = await User.findOne({ _id: id });
    if (user) {
        ctx.body = { message: 'User list', data: user };
        return user;

    } else {
        ctx.status = httpStatus.NOT_FOUND;
        ctx.body = { message: 'not found', data: {} };
    }
};


// Update a user
const update = async (ctx) => {
    const { id } = ctx.params;
    const user = await findOne(ctx);
    if (!user) {
        ctx.body = { message: 'Not found', data: {} };
    } else {
        const { name, email } = ctx.request.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true },
        );
        ctx.status = httpStatus.OK;
        ctx.body = { message: 'User updated successfully', data: updatedUser };
    }
};

// Delete a user
const remove = async (ctx) => {
    const { id } = ctx.params;

    const findUser = await findOne(ctx);
    if (!findUser) {
        ctx.status = httpStatus.NOT_FOUND;
        ctx.body = { message: 'Not Found', data: {} };
    }
    else {
        const user = await User.findByIdAndDelete(id);
        ctx.status = httpStatus.OK;
        ctx.body = { message: 'User deleted successfully', data: user };
    }
};

module.exports = {
    remove,
    findAll,
    findOne,
    create,
    update
};
