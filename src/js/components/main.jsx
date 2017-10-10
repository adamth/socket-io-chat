import React, { Component } from 'react';

import Messages from './Messages.jsx';
import { parseMessage, socket } from './../parseMessage';

const INIT_STATE = {
    messages: []
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMessageEvent = this.handleMessageEvent.bind(this);
        this.handleHistoryEvent = this.handleHistoryEvent.bind(this);

        this.state = INIT_STATE;
    }
    componentDidMount() {
        this.handleMessageEvent();
        this.handleHistoryEvent();
    }
    handleSubmit(e) {     
        e.preventDefault();
        const message = e.target.m.value;
        parseMessage(message);
        e.target.m.value = '';
        e.target.m.focus();
    }

    handleMessageEvent() {
        socket.on('chat message', (msg) => {
            console.log('Got a new message');
            const updatedMessages = this.state.messages;
            updatedMessages.push(msg);
            this.setState({
                messages: updatedMessages
            });
        });
    }

    handleHistoryEvent() {
        socket.on('msg history', (history) => {
            console.log(history)
            this.setState({
                messages: history
            });
        });
    }

    render() {
        return (
            <div>
                <Messages messages={this.state.messages} />
                <form action="" onSubmit={this.handleSubmit}>
                    <input id="m" autoComplete="off" /><button>Send</button>
                </form>
            </div>
        );
    }
}

export default Main;
