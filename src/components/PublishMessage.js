import React, { useState } from "react";
// import Context from '../context';
// import { MessageContext } from "../context";
import { useAppContext } from "./hooks";
import { newMessage } from "../state/actions";

function PublishMessage() {
    // const { dispatch } = useContext(Context);
    // const { dispatch } = useAppContext();
    const { state: {username}, pubsub: {publish} } = useAppContext();

    const [text, setText] = useState('');

    const updateText = event => {
        setText(event.target.value);
    }

    const publishMessage = () => {
        // dispatch(newMessage(text));
        publish(newMessage({text, username}));
    }

    const handleKeyPress = event => {
        if (event.key === "Enter") {
            publishMessage();
        }
    }

    return <div>
        <h3>Have something to say?</h3>
        <input value={text} onChange={updateText} onKeyDown={handleKeyPress} />
        {' '}
        <button onClick={publishMessage}>Publish</button>
    </div>
}

export default PublishMessage;