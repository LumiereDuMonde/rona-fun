export class LoginUser {    
    constructor(public email: string, public password: string, private returnSecureToken: boolean = true) {};
}