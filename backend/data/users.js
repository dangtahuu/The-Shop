import bcrypt from 'bcryptjs';


const Users = [
    // {
    //     name: 'Admin User',
    //     email: 'admin@example.com',
    //     password: bcrypt.hashSync('123456', 10),
    //     isAdmin: true
    // },
    {
        name: 'Jane',
        email: 'jane@example.com',
        password:  bcrypt.hashSync('123456', 10),
    },
    // {
    //     name: 'Jane Doe',
    //     email: 'Jane11@example.com',
    //     password:  bcrypt.hashSync('123456', 10),
    // },
]

export default Users