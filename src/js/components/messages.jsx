import React, { Component } from 'React';

class Messages extends Component {
    renderMessages() {
        const { messages } = this.props;
        let obj = [];
        if (messages) {
            for (let i = 0; i < messages.length; i++) {
                obj.push(<li key={i}>{`[${messages[i].time}] ${messages[i].user}: ${messages[i].message}`}</li>);
            }
            return obj;
        }
    }
    render() {
        return (
            <div>
                <ul id="messages">
                    {this.renderMessages()}
                </ul>
            </div>
        );
    }
}

export default Messages;
