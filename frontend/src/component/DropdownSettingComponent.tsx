import React from "react";
import { Button } from "react-bootstrap";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";

function ContentSettingDropComponents({ logout }: { logout: Function }) {
    return (
        <div className="setting_drop_content">
            <Button variant="outline-secondary setting_drop_item">Cài đặt</Button>
            <div className="setting_drop_seperate" />
            <Button variant="outline-secondary setting_drop_item">Giới thiệu</Button>
            <Button variant="outline-secondary setting_drop_item">Điều khoản</Button>
            <Button variant="outline-secondary setting_drop_item">Chính sách quyền riêng tư</Button>
            <Button variant="outline-secondary setting_drop_item">Chính sách về cookie</Button>
            <div className="setting_drop_seperate" />
            <Button variant="outline-secondary setting_drop_item">Trợ giúp</Button>
            <Button variant="outline-secondary setting_drop_item">Báo cáo sự cố</Button>
            <div className="setting_drop_seperate" />
            <Button variant="outline-secondary setting_drop_item" onClick={() => { logout() }}>Đăng xuất</Button>
        </div>
    )
}

export default connect(null, { logout })(ContentSettingDropComponents)