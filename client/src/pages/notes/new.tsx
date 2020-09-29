import { NewNotePage } from '../../modules/Notes';
import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';
export default () => (
  <AuthWrapper>
    <NewNotePage />
  </AuthWrapper>
);
