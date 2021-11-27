import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';

const Secret = withAuth(() => {
    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                <div className="col-md-5 mx-auto">
                    <h1 className="page-title">Secret</h1>
                    Secret page , only authenticated users allowed!
                </div>
                </div>
            </div>
        </BaseLayout>
    )
},['instructor'])

export default withApollo(Secret);