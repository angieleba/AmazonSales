export class User {
    id : number;
    username : string;
    email : string;
    password : string;
    role : Role
}

export class Role {
    id : number;
    name : string;   
}