export class loginUser {    
    constructor(public email: string, public password: string, private returnSecureToken: boolean = true) {};
}