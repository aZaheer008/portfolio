
import RegisterForm from '@/components/forms/RegisterForm';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';
import Redirect from '@/components/shared/Redirect';
import BaseLayout from '@/layouts/BaseLayout';

const Register = () => {

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  const errorMessage = (error) => {
    return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Ooops something went wrong...';
  }

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={registerData => {
              signUp({variables:registerData})
            }} />
            { data && data.signUp && <Redirect to="/login" />}
            { error && <div className="alert alert-danger">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withApollo(Register)