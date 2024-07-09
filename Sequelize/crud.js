const db = require('./models');


async function deleteUserByUsername() {
    try {
        await db.User.destroy({
            where: { username: 'jane_doe' },
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
    }
}
exports.deleteUserByUsername = deleteUserByUsername;

async function updateUserByUsername() {
    try {
        await db.User.update(
            { username: 'jane_doe' },
            { where: { username: 'john_doe' } }
        );
    }
    catch (error) {
        console.error('Error updating user:', error);
    }
}
exports.updateUserByUsername = updateUserByUsername;

async function createNewUser() {
    try {
        const newUser = await db.User.create({
            username: 'john_doe',
            email: 'new_email_' + Math.random() + '@example.com',
        });
        console.log('New user created:', newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
}
exports.createNewUser = createNewUser;

async function getAllUsers() {
    try {
        const users = await db.User.findAll();
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
exports.getAllUsers = getAllUsers;
