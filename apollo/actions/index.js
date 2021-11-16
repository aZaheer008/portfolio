
import { useQuery , useMutation } from '@apollo/react-hooks';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO,UPDATE_PORTFOLIO,DELETE_PORTFOLIO } from "@/apollo/queries";

export const useGetPotfolios = () => useQuery(GET_PORTFOLIOS);
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