
import { useQuery , useMutation , useLazyQuery } from '@apollo/react-hooks';
import {  CREATE_POST, POSTS_BY_TOPIC, TOPIC_BY_SLUG,CREATE_TOPIC,TOPICS_BY_CATEGORY,FORUM_CATEGORIES,GET_PORTFOLIO,SIGN_OUT,GET_USER_PORTFOLIOS,GET_USER,GET_PORTFOLIOS,
  SIGN_IN, CREATE_PORTFOLIO,UPDATE_PORTFOLIO,DELETE_PORTFOLIO } from "@/apollo/queries";

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

// Forum actions Start -----------------------
export const useGetForumCategories = () => useQuery(FORUM_CATEGORIES);
export const useGetTopicsByCategory = (options) => useQuery(TOPICS_BY_CATEGORY, options);

export const useGetTopicBySlug = options => useQuery(TOPIC_BY_SLUG, options)

export const useCreateTopic = () => useMutation(CREATE_TOPIC, {
  update(cache, {data: {createTopic}}) {
    try {
      const { topicsByCategory } = cache.readQuery({query: TOPICS_BY_CATEGORY, variables: {
        category: createTopic.forumCategory.slug}});
        cache.writeQuery({
          query: TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topicsByCategory, createTopic]},
          variables: {
            category: createTopic.forumCategory.slug
          }
        });
    } catch(e) {}
  }
});

export const useGetPostsByTopic = options => useQuery(POSTS_BY_TOPIC, options);
export const useCreatePost = () => useMutation(CREATE_POST);

// Forum actions End -----------------------