import React, { Component } from "react";
import AvatarComponent from "./AvatarComponent";
import { InputGroup, FormControl, Button } from "react-bootstrap";

class ContentChatComponent extends Component {
    render() {
        return (
            <div className="content-chat">
                <div className="info-area px-3 py-2">
                    <div className="d-flex">
                        <AvatarComponent size="normal" />
                        <div className="user-info ml-3">
                            <p className="text-bold text-16">Cún (Mập)</p>
                            <p className="text-normal text-light text-12">Hoạt động 15 phút trước</p>
                        </div>
                    </div>
                    <div className="control d-flex align-items-center">
                        <button>
                            <i className="fa fa-info-circle" />
                        </button>
                    </div>
                </div>
                <div className="chat-area" style={{ height: window.innerHeight - 57 - 50 }}>

                </div>
                <div className="control-area px-3 py-2">
                    <InputGroup>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <Button className="ml-2 btn-circle">
                        <i className="fa fa-paper-plane" />
                    </Button>
                </div>
            </div>
        )
    }
}

export default ContentChatComponent;