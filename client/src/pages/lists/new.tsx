import { NewListPage } from '../../modules/Lists';
import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';

const New = () => (
  <AuthWrapper>
    <NewListPage />
  </AuthWrapper>
);

export default New;
