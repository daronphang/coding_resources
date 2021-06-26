import { Provider } from 'react-redux';
import store from './store/index';

// only wrap provider to components that need access to redux store

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
  document.getElementById('root')
)
