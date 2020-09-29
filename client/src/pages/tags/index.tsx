import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';
import { TagsPage } from '../../modules/Tags';

const Index = () => <AuthWrapper>
  <TagsPage />
</AuthWrapper>;

export default Index;
