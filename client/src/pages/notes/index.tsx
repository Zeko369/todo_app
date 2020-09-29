import { NotesPage } from '../../modules/Notes';
import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';

const Index = () => <AuthWrapper>
  <NotesPage />
</AuthWrapper>;

export default Index;
