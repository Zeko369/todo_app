import { ListsPage } from '../../modules/Lists';
import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';
export default () => (
  <AuthWrapper>
    <ListsPage />
  </AuthWrapper>
);
