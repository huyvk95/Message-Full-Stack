import React, { Component } from "react";
import ContentChatHeaderComponent from "./ContentChatHeaderComponent";
import ContentChatControlComponent from "./ContentChatControlComponent";
import ContentChatMessagesComponent from "./ContentChatMessagesComponent";

class ContentChatComponent extends Component {
    render() {
        return (
            <div className="content-chat">
                <ContentChatHeaderComponent />
                <ContentChatMessagesComponent />
                <ContentChatControlComponent />
            </div>
        )
    }
}

export default ContentChatComponent;