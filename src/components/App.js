import React, { useReducer, useEffect } from 'react';
import reducer, { initialState } from '../state/reducer';
import Context from '../context';
import PubSub from '../pubsub';
// import { MessageContext } from '../context';
// import { newMessage } from '../state/actions';
import PublishMessage from './PublishMessage';
import MessageBoard from './MessageBoard';
import SetUsername from './SetUsername';

const pubsub = new PubSub();

setTimeout(() => {
  pubsub.publish({ type: 'foo', value: 'bar' });
}, 3000);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    pubsub.addListener({
      message: messageObject => {
        const {channel, message} = messageObject;
    
        console.log('Received message ',message,' channel ',channel);
    
        dispatch(message);
      }
    });
  }, []);

  console.log('state ', state);

  return (
  <Context.Provider value={{ state, dispatch, pubsub }}>
    <h2>Reaction</h2>
    <SetUsername />
    <hr />
    <PublishMessage />
    <hr />
    <MessageBoard />
  </Context.Provider>
  );
}

export default App;
