import { Account } from 'msal';

export class User {
    id : string;
    email : string;
    name : string;
    lastname : string;
    // password : string;
    // role : Role;

    constructor(account : Account) {
        this.id = account.sid;
        this.email = account.idToken.emails[0],
        this.name = account.idToken.given_name;
        this.lastname = account.idToken.family_name;
    }
}

export class Role {
    id : number;
    name : string;   
}