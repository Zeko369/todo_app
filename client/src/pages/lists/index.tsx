import { ListsPage } from '../../modules/Lists';
import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';

const Index = () => <AuthWrapper>
  <ListsPage />
</AuthWrapper>;

export default Index;
