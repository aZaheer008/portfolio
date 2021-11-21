
class User {

    constructor(model) {
        this.Model = model;
    }

    getAuthUser(ctx) {
        if (ctx.isAuthenticated()){
            return ctx.getUser();
        }
        return null;
    }

    async signUp(signUpData) {
        if ( signUpData.passowrd !== signUpData.passowrdConfirmation ){
            throw new Error('Password must be the same as confirmation Password!');
        }
        try {
            return await this.Model.create(signUpData);
        } catch (e) {
            if (e.code && e.code === 11000 ) {
                throw new Error('User with provided email already exists!');
            }
            throw e;
        }
    }

    async signIn(signInData, ctx) {
        try {
            const user = await ctx.authenticate(signInData);
            console.log(user);
            console.log(`User : ${user.username}`);
            return user;
        } catch (error) {
            return error;   
        }
    }

    signOut(ctx) {
        try {
            console.log("Before Logout ------");
            console.log("is Authenticated ", ctx.isAuthenticated());
            console.log("Before get User Function is called ", ctx.getUser());
            ctx.logout();
            console.log("After Logout ------");
            console.log("is Authenticated ", ctx.isAuthenticated());
            console.log("After get User Function is called ", ctx.getUser());
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = User;