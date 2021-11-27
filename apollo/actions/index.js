
import { useQuery , useMutation , useLazyQuery } from '@apollo/react-hooks';
import { GET_PORTFOLIO,SIGN_OUT,GET_USER_PORTFOLIOS,GET_USER,GET_PORTFOLIOS,SIGN_IN, CREATE_PORTFOLIO,UPDATE_PORTFOLIO,DELETE_PORTFOLIO } from "@/apollo/queries";

export const useGetPotfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetPotfolio = (options) => useQuery(GET_PORTFOLIO,options);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO,{
  update(cache, {data : {deletePortfolio}}){
    const { userPortfolios } = cache.readQuery({query: GET_USER_PORTFOLIOS})
    const updatedPortfolios = userPortfolios.filter(p => p._id !== deletePortfolio);
    cache.writeQuery({
      query: GET_USER_PORTFOLIOS,
      data : { userPortfolios: updatedPortfolios}
    })
  }
});
export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO,{
  update(cache, { data :{ createPortfolio }}) {
    const { portfolios } = cache.readQuery({ query : GET_PORTFOLIOS })
    cache.writeQuery({
      query : GET_PORTFOLIOS,
      data : { portfolios : [...portfolios , createPortfolio] }
    })
  }
});

// Auth Action start--------------------

export const useSignIn = () => useMutation(SIGN_IN, {
  update(cache, { data : { signIn : signedInUser }}){
    cache.writeQuery({
      query: GET_USER,
      data: { user: signedInUser }
    });
  }
});

export const useSignOut = () => useMutation(SIGN_OUT);
export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);

// Auth Action End----------------------