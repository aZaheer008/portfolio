
import { useQuery , useMutation , useLazyQuery } from '@apollo/react-hooks';
import { SIGN_OUT,GET_USER_PORTFOLIOS,GET_USER,GET_PORTFOLIOS,SIGN_IN, CREATE_PORTFOLIO,UPDATE_PORTFOLIO,DELETE_PORTFOLIO } from "@/apollo/queries";

export const useGetPotfolios = () => useQuery(GET_PORTFOLIOS);
// export const useGetUserPortfolios = async() => {
//   let result = await useQuery(GET_USER_PORTFOLIOS);
//   console.log("-----------result--------",result)
// }
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO,{
  update(cache, {data : {deletePortfolio}}){
    const { portfolios } = cache.readQuery({query: GET_PORTFOLIOS})
    const updatedPortfolios = portfolios.filter(p => p._id !== deletePortfolio);
    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data : { portfolios: updatedPortfolios}
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