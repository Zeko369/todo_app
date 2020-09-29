import { NewNotePage } from '../../modules/Notes';
import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';

const New = () => <AuthWrapper>
  <NewNotePage />
</AuthWrapper>;

export default New;
