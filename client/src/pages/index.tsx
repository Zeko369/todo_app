import { AuthWrapper } from '../modules/Auth/shared/AuthWrapper';
import { HomePage } from '../modules/Todos';
export default () => (
  <AuthWrapper>
    <HomePage />
  </AuthWrapper>
);
