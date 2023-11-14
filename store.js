import { createStore } from 'redux';
import rootReducer from './reducers'; // Importa el rootReducer

const store = createStore(rootReducer);

export default store;
