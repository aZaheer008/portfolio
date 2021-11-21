
  const Portfolio = require('../../database/models/portfolio');

  exports.portfolioQueries = {
    portfolio: async (root,{id},ctx) => {
      return ctx.models.Portfolio.getById(id);
    },
    portfolios: async (root , args , ctx) => {
      return ctx.models.Portfolio.getAll();
    }
  };

  exports.portfolioMutations = {
    createPortfolio: async (root, {input},ctx) => {
      const newPortfolio = await ctx.models.Portfolio.create(input);
      return newPortfolio;
    },
    updatePortfolio : async (root , {id , input},ctx) => {
      const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(id,input);
      return updatedPortfolio;
    },
    deletePortfolio : async(root, {id},ctx) => {
      const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
      return deletedPortfolio._id;
    }
  };

  exports.userQueries = {
    user : (root, args, ctx) => {
      return ctx.models.User.getAuthUser(ctx);
    }
  }

  exports.userMutations = {
    signUp: async (root, {input},ctx) => {
      const registeredUser = await  ctx.models.User.signUp(input);
      return registeredUser._id;
    },
    signIn : async (root, {input},ctx) => {
      return  ctx.models.User.signIn(input, ctx);
    },
    signOut : async(root, args,ctx) => {
      return ctx.models.User.signOut(ctx);
    }
  };
