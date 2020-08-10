import React from "react";
import AvatarComponent from "./AvatarComponent";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentHeaderProps } from "../interface/ComponentInterface";
import { openPopup, openDropdown } from "../action/AppActions";
import util from "../util";
import PopupSearchUserComponent from "./PopupSearchUserComponent";
import DropdownSettingComponent from "./DropdownSettingComponent";
import PopupProfileComponents from "./PopupProfileComponents";

function ContentHeaderComponent({ openPopup, openDropdown, navigation, user }: IContentHeaderProps) {
    return (
        <div className="content-header justify-content-between px-3 py-2 position-relative">
            <div className="d-flex align-items-center" style={{ width: "100px" }}>
                <AvatarComponent
                    url={user.avatar}
                    size="normal"
                    className="mr-3"
                    onClick={() => { openPopup({ body: <PopupProfileComponents /> }) }}
                />
            </div>
            <h1 className="text-23 text-bold m-0 text-capitalize">
                {util.string.capitalize(navigation.contentTab)}
            </h1>
            <div className="d-flex align-items-center" style={{ width: "100px" }}>
                <Button
                    variant="outline-danger"
                    className="btn-outline-custom btn-circle mr-3"
                    onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        let rect = ((event.target as any).getBoundingClientRect())
                        openDropdown(<DropdownSettingComponent />, { x: rect.left - 10, y: rect.bottom + 15 })
                    }}
                >
                    <i className="fa fa-cog" />
                </Button>
                <Button
                    variant="outline-primary"
                    className="btn-outline-custom btn-circle mr-3"
                    onClick={() => {
                        openPopup({
                            header: {
                                title: "User",
                                btnRight: {
                                    title: "Done"
                                }
                            },
                            body: <PopupSearchUserComponent />
                        })
                    }}
                >
                    <i className="fa fa-user-plus" style={{ fontSize: '18px' }} />
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ navigation, user }: IStoreState) => ({ navigation, user })
const mapDispatchToProps = { openPopup, openDropdown }

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeaderComponent);