import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
export default class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType.Personal;
        this.maritalStatus = MaritalStatus.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
    }
}
