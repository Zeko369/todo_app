import { EditListPage } from '../../../modules/Lists';
import { AuthWrapper } from '../../../modules/Auth/shared/AuthWrapper';

const Edit = () => <AuthWrapper>
  <EditListPage />
</AuthWrapper>;

export default Edit;
