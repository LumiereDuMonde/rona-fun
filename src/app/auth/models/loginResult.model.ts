export interface loginResult {
    idToken: string;
    email: string;
    refreshToken:string;
    expiresIn:	string;
    localId: string;
    kind?: string;
    registered?: boolean;
}