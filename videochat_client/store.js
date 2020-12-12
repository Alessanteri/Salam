import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { socketMiddleware, loggerMiddleware } from './features/middlewares';
import SocketClient from './features/SocketClient'
import { loadState, saveState } from './features/storage'
import throttle from 'lodash/throttle';

const socketClient = new SocketClient();
const persistedState = loadState();
console.log(persistedState);
const store = createStore(rootReducer, persistedState, applyMiddleware(socketMiddleware(socketClient), loggerMiddleware));

store.subscribe(throttle(() =>{
    saveState({
        user: {
            ...store.getState().user    
        }
    })
}, 1000))

export default store;