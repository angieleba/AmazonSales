import { Action } from '@ngrx/store';
import { LoginActionTypes } from '../LoginActionTypes';
import { User } from '../user.model';

export class LoginBaseAction implements Action {
    type : string;
    data : {
        user : User;
        token : string;
        error : string;
    }
}

export class LoginRequest implements Action {
    readonly type = LoginActionTypes.LoginRequest;

    constructor() {}
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccessful;

    constructor(public user : User) {}
}

export class LoginError extends LoginBaseAction {
    readonly type = LoginActionTypes.LoginError;

    constructor(public error : string) {super()}
}

export class LogoutRequest implements Action {
    readonly type = LoginActionTypes.LogoutRequest;
    constructor() {}
}

export class LogoutSuccess implements Action {
    readonly type = LoginActionTypes.LogoutSuccessful;
    constructor() {}
}

export class LogoutError implements Action {
    readonly type = LoginActionTypes.LogoutError;
    constructor(public error : string) {}
}

export type LoginActionsUnion = LoginRequest | LoginSuccess | LoginError | LogoutRequest | LogoutSuccess | LogoutError;