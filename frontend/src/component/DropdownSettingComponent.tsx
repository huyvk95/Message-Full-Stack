import React from "react";
import { Button } from "react-bootstrap";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import { openPopup } from "../action/AppActions";
import PopupSettingComponent from "./PopupSettingComponent";

function ContentSettingDropComponents({ logout, openPopup }: { logout: Function, openPopup: Function }) {
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
                Cài đặt
            </Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item">Giới thiệu</Button>
            <Button variant="outline-secondary drop_item">Điều khoản</Button>
            <Button variant="outline-secondary drop_item">Chính sách quyền riêng tư</Button>
            <Button variant="outline-secondary drop_item">Chính sách về cookie</Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item">Trợ giúp</Button>
            <Button variant="outline-secondary drop_item">Báo cáo sự cố</Button>
            <div className="drop_seperate" />
            <Button variant="outline-secondary drop_item" onClick={() => { logout() }}>Đăng xuất</Button>
        </div>
    )
}

export default connect(null, { logout, openPopup })(ContentSettingDropComponents)