import { User } from "./user.model";

describe('User Model', () => {
    let user: User;
    beforeEach(() => {
        jasmine.clock().install();     
        jasmine.clock().mockDate(new Date(2021, 1, 1));                
        
    });
    
    it('token with expiration date in the future', () => {
         
        user = new User('user@user.com','1','2',new Date(2021,1,1,1));
        expect(user.token).toEqual('2');
    });

    it('token with expiration date in the past', () => {
        user = new User('user@user.com','1','2',new Date(2021,0,31,12,59));
        expect(user.token).toEqual(null);
    }); 
    
    it('expirationMilliseconds', () => {
         
        user = new User('user@user.com','1','2',new Date(2021,1,1,0,0,1));
        expect(user.expirationMilliseconds).toEqual(1000);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });
});
