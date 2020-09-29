import { NotePage } from '../../../modules/Notes';
import { AuthWrapper } from '../../../modules/Auth/shared/AuthWrapper';

const Index = () => <AuthWrapper>
  <NotePage />
</AuthWrapper>;

export default Index;
