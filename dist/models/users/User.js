"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountType_1 = require("./AccountType");
const MaritalStatus_1 = require("./MaritalStatus");
class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map