import { AuthWrapper } from '../../modules/Auth/shared/AuthWrapper';
import { TagsPage } from '../../modules/Tags';
export default () => (
  <AuthWrapper>
    <TagsPage />
  </AuthWrapper>
);
