import { setOtherUser } from './actions';
import store from '../store';

export const connect = () =>{
    return{
        promise: (socket) => socket.connect(),
        type: 'socket',
        types: ['REQUEST', 'CONNECT_SUCCESS', 'CREATE_FAILURE'],
    }
}

export const createRoom = (name) =>{
    return{
        promise: (socket) => socket.emit('create-room', name),
        type: 'socket',
        types: ['REQUEST', 'SET_ROOM_ID', 'FAILURE']
    }
}

export const joinRoom = (room, name) =>{
    return{
        promise: (socket) => socket.emit('join-room', {roomId: room, name: name}),
        type: 'socket',
        types: ['REQUEST', 'SET_ROOM_ID', 'FAILURE']
    }
}

export const updateUserList = () =>{
    return{
        promise: (socket) => socket.on('update-user-list', (userName, id) =>{
            store.dispatch(setOtherUser(userName, id));
        }),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
}

export const makeOffer = (data) =>{
    return {
        promise: (socket) => socket.emit('make-offer', data),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
}

export const makeAnswer = (data) =>{
    return {
        promise: (socket) => socket.emit('make-answer', data),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
}

export const offerMade = (fun) =>{
    return {
        promise: (socket) => socket.on('offer-made', fun),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
}

export const answerMade = (fun) =>{
    return {
        promise: (socket) => socket.on('answer-made', fun),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
}

// export const addUser = (fun) =>{
//     return {
//         promise: (socket) => socket.on('add-user', fun),
//         type: 'socket',
//         types: ['REQUEST', 'SUCCESS', 'FAILURE']
//     }
// }

export const removeUser = (fun) =>{
    return {
        promise: (socket) = socket.on('remove-user', fun),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
}

export const initUser = (name) =>{
    return {
        promise: (socket) => socket.emit('add-user', { userName: name, socketId: socket.getId()}),
        type: 'socket',
        types: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }
}