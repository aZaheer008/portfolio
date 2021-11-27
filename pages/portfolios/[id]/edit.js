import PortfolioForm from '@/components/forms/PortfolioForm';
import { useGetPotfolio , useUpdatePortfolio} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';
import { useRouter } from 'next/router';

const PortfolioEdit = () => {
    const router = useRouter();
    const [ updatePortfolio, { error }] = useUpdatePortfolio();
    const { id } = router.query;
    const { data } = useGetPotfolio({ variables: { id, ...data } });

    const errorMessage = (error) => {
        console.log("--------error----",error);
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Ooops something went wrong...';
      }

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Edit Portfolio</h1>
            { data && <PortfolioForm
                initialData={data.portfolio}
                onSubmit={(data) => updatePortfolio({variables: {id,...data}})} />}
            { error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(withAuth(PortfolioEdit, ['admin','instructor']));