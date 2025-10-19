const USerModel = require("../models/user_model");

class UserService {
    static async registerUser(email, password) {
        try {
            const createUser = new USerModel({ email, password });
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;