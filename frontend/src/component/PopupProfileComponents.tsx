import React, { useState, ChangeEvent } from "react";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import { IPopupProfileProps } from "../interface/ComponentInterface";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { updateUserData } from "../action/UserActions";
import { pushToast, closePopup } from "../action/AppActions";
import AvatarComponent from "./AvatarComponent";
import socket from "../socket";
import common from "../common";

function PopupProfileComponents({ user, updateUserData, pushToast,closePopup }: IPopupProfileProps) {
    let [view, setView]: [string, Function] = useState("view")
    let [error, setError] = useState(false)
    let [firstName, setFirstName] = useState(user.firstName)
    let [lastName, setLastName] = useState(user.lastName)
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [oldPassword, setOldPassword] = useState("")

    const resetState = () => {
        setView("view")
        setPassword("")
        setConfirmPassword("")
        setOldPassword("")
        setError(false)
    }

    const onClickDone = () => {
        let sc = socket.getSocket()
        if (!sc) return setView("view")

        if (view === "changePassword") {
            if (password === confirmPassword) {
                sc.invoke(common.packet.PROFILE,
                    {
                        evt: common.event.PROFILE.PUT,
                        data: { oldPassword, password }
                    }).then(data => {
                        pushToast({
                            content: data.message,
                            time: new Date()
                        })
                        updateUserData(data.data)
                        resetState()
                        closePopup()
                    }).catch(err => {
                        pushToast({
                            content: "Edit profile error",
                            time: new Date()
                        })
                        setError(true)
                    })
            } else {
                setError(true)
            }
        } else if (view === "editData") {
            sc.invoke(common.packet.PROFILE,
                {
                    evt: common.event.PROFILE.PUT,
                    data: { oldPassword, firstName, lastName }
                }).then(data => {
                    pushToast({
                        content: data.message,
                        time: new Date()
                    })
                    updateUserData(data.data)
                    resetState()
                }).catch(err => {
                    pushToast({
                        content: "Edit profile error",
                        time: new Date()
                    })
                    setError(true)
                })
        } else {
            setView("view")
        }
    }

    const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const onChangeOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(event.target.value);
    }

    return (
        <div className="popup_profile">
            <div className="d-flex justify-content-center mb-1 position-relative">
                <AvatarComponent url={user.avatar} size="langer" />
                <button
                    className={`position-absolute text-18 ${view === 'view' ? 'd-none' : 'd-block'}`}
                    style={{ left: "0px" }}
                    onClick={() => { resetState() }}
                >
                    <i className="fa fa-chevron-left font-weight-light" />
                </button>
            </div>
            <div className="mb-3 text-center">{user.email}</div>
            <InputGroup className={`mb-3 ${view === "changePassword" ? "d-none" : "d-flex"}`}>
                <FormControl
                    placeholder="Lastname"
                    aria-label="Lastname"
                    className={`text-bold ${view !== "view" && error ? "wrong" : ""}`}
                    value={lastName}
                    readOnly={view === "view"}
                    onChange={onChangeLastName}
                />
            </InputGroup>
            <InputGroup className={`mb-3 ${view === "changePassword" ? "d-none" : "d-flex"}`}>
                <FormControl
                    placeholder="Firstname"
                    aria-label="Firstname"
                    className={`text-bold ${view !== "view" && error ? "wrong" : ""}`}
                    value={firstName}
                    readOnly={view === "view"}
                    onChange={onChangeFirstName}
                />
            </InputGroup>
            <InputGroup className={`mb-3 ${view === "changePassword" ? "d-flex" : "d-none"}`}>
                <FormControl
                    placeholder="Password"
                    aria-label="Password"
                    className={`text-normal ${view !== "view" && error ? "wrong" : ""}`}
                    value={password}
                    type="password"
                    onChange={onChangePassword}
                />
            </InputGroup>
            <InputGroup className={`mb-3 ${view === "changePassword" ? "d-flex" : "d-none"}`}>
                <FormControl
                    placeholder="Confirm password"
                    aria-label="Confirm password"
                    value={confirmPassword}
                    className={`text-normal ${view !== "view" && error ? "wrong" : ""}`}
                    type="password"
                    onChange={onChangeConfirmPassword}
                />
            </InputGroup>
            <InputGroup className={`mb-3 ${view === "view" ? "d-none" : "d-flex"}`}>
                <FormControl
                    placeholder="Old password"
                    aria-label="Old password"
                    value={oldPassword}
                    className={`text-normal ${view !== "view" && error ? "wrong" : ""}`}
                    type="password"
                    onChange={onChangeOldPassword}
                />
            </InputGroup>
            <div className="profile_control">
                <Button
                    variant="outline-primary"
                    className={`btn-outline-custom text-bold ${view === "view" ? "d-inline-block" : "d-none"}`}
                    onClick={() => { setView("editData") }}
                >
                    Edit profile
                </Button>
                <Button
                    variant="outline-primary"
                    className={`btn-outline-custom text-bold ${view === "view" ? "d-inline-block" : "d-none"}`}
                    onClick={() => { setView("changePassword") }}
                >
                    Change password
                </Button>
                <Button
                    variant="primary"
                    className={`text-bold ${view !== "view" ? "d-inline-block" : "d-none"}`}
                    onClick={() => { onClickDone() }}
                >
                    Done
                </Button>
            </div>
        </div>
    )
}

export default connect(({ user }: IStoreState) => ({ user }), { updateUserData, pushToast, closePopup })(PopupProfileComponents)