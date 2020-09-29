import { EditNotePage } from '../../../modules/Notes';
import { AuthWrapper } from '../../../modules/Auth/shared/AuthWrapper';

const Index = () => (
  <AuthWrapper>
    <EditNotePage />
  </AuthWrapper>
);

export default Index;
