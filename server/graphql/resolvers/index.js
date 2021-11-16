
  const Portfolio = require('../../database/models/portfolio');

  exports.portfolioQueries = {
    portfolio: async (root,{id}) => {
      return await Portfolio.findById(id);
    },
    portfolios: async () => {
      return await Portfolio.find({})
    }
  };

  exports.portfolioMutations = {
    createPortfolio: async (root, {input}) => {
      const newPortfolio = await Portfolio.create(input);
      return newPortfolio;
    },
    updatePortfolio : async (root , {id , input}) => {
      const updatedPortfolio = await Portfolio.findOneAndUpdate({_id : id}, input, {new : true});
      return updatedPortfolio;
    },
    deletePortfolio : async(root, {id}) => {
      const deletedPortfolio = await Portfolio.findOneAndRemove({_id : id});
      return deletedPortfolio._id;
    }
  };
