const { getAllUsers, createNewUser, updateUserByUsername, deleteUserByUsername } = require('./crud');
const db = require('./models');

async function initializeDatabase() {
    try {
        await db.sequelize.sync();
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

async function main() {
    await initializeDatabase();

    // // Fetch all users (SELECT)
    // await getAllUsers();

    // // Create a new user (INSERT)
    // await createNewUser();

    // // Update a user (UPDATE)
    // await updateUserByUsername();

    // // Delete a user (DELETE)
    // await deleteUserByUsername();

    // Add a new post to an existing user
    await addPostToUser('john_doe');
    
    // Fetch all users and their posts (SELECT with JOIN)
    await fetchUsersWithPosts();
}

main();


async function fetchUsersWithPosts() {
    try {
        const users = await db.User.findAll({
            include: db.Post
        });

        users.forEach(user => {
            console.log(`User: ${user.username}`);
            user.Posts.forEach(post => {
                console.log(`Post: ${post.title}`);
            });
        });
    } catch (error) {
        console.error('Error fetching users with posts:', error);
    }
}

async function addPostToUser(username) {
    try {
        const user = await db.User.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            console.log('User not found');
            return;
        }

        const newPost = await db.Post.create({
            title: 'New Post',
            content: 'This is a new post'
        });

        await user.addPost(newPost);

        console.log('New post added to user:', user.username);
    } catch (error) {
        console.error('Error adding new post:', error);
    }
}