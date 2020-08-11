import React from "react";
import { Button } from "react-bootstrap";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import { openPopup } from "../action/AppActions";
import { setConversationViewType } from "../action/NavigationActions";
import PopupSettingComponent from "./PopupSettingComponent";
import { EConversationType } from "../common/TypeCommon";

function ContentSettingDropComponents({ logout, openPopup, setConversationViewType }: { logout: Function, openPopup: Function, setConversationViewType: Function }) {
    return (
        <div className="setting_drop_content drop_content">
            <Button
                variant="outline-secondary drop_item"
                onClick={() => {
                    openPopup({
                        header: {
                            title: "Setting",
                            btnRight: {
                                title: "Done"
                            }
                        },
                        body: <PopupSettingComponent />
                    })
                }}
            >
                Setting
            </Button>
            <div className="drop_seperate" />
            <Button
                variant="outline-secondary drop_item"
                onClick={() => { setConversationViewType(EConversationType.NORMAL) }}
            >
                Chat message
            </Button>
            <Button
                variant="outline-secondary drop_item"
                onClick={() => { setConversationViewType(EConversationType.ARCHIVE) }}
            >
                Archive message
            </Button>
            <Button
                variant="outline-secondary drop_item"
                onClick={() => { setConversationViewType(EConversationType.BLOCK) }}
            >
                Block message
            </Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item">About</Button>
            <Button variant="outline-secondary drop_item">Rule</Button>
            <Button variant="outline-secondary drop_item">Privacy policy</Button>
            <Button variant="outline-secondary drop_item">Cookie policy</Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item">Help</Button>
            <Button variant="outline-secondary drop_item">Report problem</Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item" onClick={() => { logout() }}>Logout</Button>
        </div>
    )
}

export default connect(null, { logout, openPopup, setConversationViewType })(ContentSettingDropComponents)