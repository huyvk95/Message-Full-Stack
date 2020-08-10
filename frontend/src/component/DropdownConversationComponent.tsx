import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

function DropdownConversationComponent() {
    return (
        <div className="setting_drop_content drop_content">
            <Button variant="outline-secondary drop_item">Delete</Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item">Mask as unread</Button>
            <Button variant="outline-secondary drop_item">Block</Button>
        </div>
    )
}

export default connect(null)(DropdownConversationComponent)