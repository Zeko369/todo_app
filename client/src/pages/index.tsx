import { AuthWrapper } from '../modules/Auth/shared/AuthWrapper';
import { HomePage } from '../modules/Todos';

const Index = () => (
  <AuthWrapper>
    <HomePage />
  </AuthWrapper>
);

export default Index;
