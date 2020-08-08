import React from "react";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import { toggleNotification, toggleSound } from "../action/AppActions";
import { IPopupSettingProps } from "../interface/ComponentInterface";
import { Form } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";

function PopupSettingComponent({ user, app, toggleNotification, toggleSound }: IPopupSettingProps) {
    let { avatar, firstName, lastName } = user;
    let { sound, notification } = app;

    return (
        <div className="popup_setting">
            <div className="popup_item">
                <div className="popup_item_title">
                    Account
                </div>
                <div className="popup_item_content">
                    <AvatarComponent size="small" url={avatar} className="mr-3" />
                    <p>
                        {`${lastName} ${firstName}`}
                    </p>
                </div>
            </div>
            <div className="popup_item">
                <div className="popup_item_title">
                    Sound
                </div>
                <div className="popup_item_content">
                    <Form>
                        <Form.Check
                            type="switch"
                            id="sound-switch"
                            label=""
                            defaultChecked={sound}
                            onChange={() => { toggleSound(!sound) }}
                        />
                    </Form>
                </div>
            </div>
            <div className="popup_item">
                <div className="popup_item_title">
                    Notification
                </div>
                <div className="popup_item_content">
                    <Form>
                        <Form.Check
                            type="switch"
                            id="notification-switch"
                            label=""
                            defaultChecked={notification}
                            onChange={() => { toggleNotification(!notification) }}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default connect(({ user, app }: IStoreState) => ({ user, app }), { toggleNotification, toggleSound })(PopupSettingComponent)