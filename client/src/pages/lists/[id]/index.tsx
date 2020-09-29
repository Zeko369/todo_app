import { ListPage } from '../../../modules/Lists';
import { AuthWrapper } from '../../../modules/Auth/shared/AuthWrapper';

const Index = () => <AuthWrapper>
  <ListPage />
</AuthWrapper>;

export default Index;
