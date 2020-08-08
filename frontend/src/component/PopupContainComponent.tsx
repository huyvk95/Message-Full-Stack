import React, { useState } from "react";
import { connect } from "react-redux";
import { IStoreState, IAppData } from "../interface/DataInterface";
import { Modal, Button } from "react-bootstrap";
import { closePopup } from "../action/AppActions";
import _ from "underscore";

interface IProps {
    app: IAppData,
    closePopup: Function
}

function PopupContainComponent({ app, closePopup }: IProps) {
    let { show, body, header, openRecent } = app.popup;
    if (!body) show = false;

    return (
        <Modal
            show={show}
            onHide={() => { closePopup(openRecent) }}
            dialogClassName="popup"
            centered
        >
            <Modal.Body>
                {
                    header ?
                        <div className="popup-header px-1">
                            <Button
                                variant="link text-16"
                                onClick={() => {
                                    if (header && typeof header?.btnLeft?.func === 'function') {
                                        header.btnLeft.func()
                                    }
                                    closePopup(openRecent)
                                }}
                                style={{
                                    visibility: header?.btnLeft ? "visible" : "hidden"
                                }}
                            >
                                {
                                    header?.btnLeft?.title ? header?.btnLeft?.title : "Cancel"
                                }
                            </Button>
                            <div className="title text-16">{header.title}</div>
                            <Button
                                variant="link text-16"
                                onClick={() => {
                                    if (header && typeof header?.btnRight?.func === 'function') {
                                        header.btnRight.func()
                                    }
                                    closePopup(openRecent)
                                }}
                                style={{
                                    visibility: header?.btnRight ? "visible" : "hidden"
                                }}
                            >
                                {
                                    header?.btnRight?.title ? header?.btnRight?.title : "Done"
                                }
                            </Button>
                        </div>
                        :
                        <></>
                }
                <div className="popup-content">
                    {body}
                </div>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = ({ app }: IStoreState) => ({ app })
const mapDispatchToProps = { closePopup }

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainComponent)