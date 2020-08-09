import React from "react";
import AvatarComponent from "./AvatarComponent";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentHeaderProps } from "../interface/ComponentInterface";
import { openPopup, openDialog } from "../action/AppActions";
import util from "../util";
import PopupSearchUserComponent from "./PopupSearchUserComponent";
import DropdownSettingComponent from "./DropdownSettingComponent";

function ContentHeaderComponent({ openPopup, openDialog, navigation, user }: IContentHeaderProps) {
    return (
        <div className="content-header justify-content-between px-3 py-2 position-relative">
            <div className="d-flex align-items-center">
                <AvatarComponent
                    url={user.avatar}
                    size="normal"
                    className="mr-3"
                />
                <h1 className="text-23 text-bold m-0 text-capitalize">
                    {util.string.capitalize(navigation.contentTab)}
                </h1>
            </div>
            <div className="d-flex align-items-center">
                <Button
                    variant="outline-danger"
                    className="btn-outline-custom btn-circle mr-3"
                    onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        let rect = ((event.target as any).getBoundingClientRect())
                        openDialog(<DropdownSettingComponent />, { x: rect.left - 10, y: rect.bottom + 15 })
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
const mapDispatchToProps = { openPopup, openDialog }

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeaderComponent);