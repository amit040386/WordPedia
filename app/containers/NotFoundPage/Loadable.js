import Loadable from 'react-loadable';

import LoadingIndicator from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./NotFoundPage'),
  loading: LoadingIndicator
});
