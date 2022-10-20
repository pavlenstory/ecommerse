import ReactDOM from 'react-dom/client';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore } from 'redux';
import App from './App';
import reducer, { initState } from './store/reducer';

const store = legacy_createStore(
  reducer,
  initState,
  applyMiddleware(thunk, logger)
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);