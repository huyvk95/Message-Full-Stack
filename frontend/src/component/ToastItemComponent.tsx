import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import _ from "underscore";
import util from "../util";
import { IToastItemProps } from "../interface/ComponentInterface";

function ToastItemComponent(props: IToastItemProps) {
    let { content, time, autohide, onClick } = props
    const [show, setShow] = useState(true);
    const [onHorver, setOnHorver] = useState(false);
    const [now] = useState(Date.now())
    // Time handle
    let timeSpace = now - time.getTime();
    let timeString = util.string.milisecondsToTimeString(timeSpace);
    let timeAgo = timeSpace < 5000 ? timeString : `${timeString} ago`

    return (
        <Toast
            onClick={() => {
                // Set show
                setShow(false)
                //Handle
                if (_.isFunction(onClick)) onClick()
            }}
            onClose={() => {
                // Set show
                setShow(false)
                //Handle
                if (_.isFunction(onClick)) onClick()
            }}
            onMouseEnter={() => {
                setOnHorver(true)
            }}
            onMouseLeave={() => {
                setOnHorver(false)
            }}
            show={show}
            style={{ cursor: "pointer" }}
            delay={_.isNumber(autohide) ? autohide : 4000}
            autohide={onHorver ? false : true}
        >
            <Toast.Body>
                <div>{content}</div>
                <small>{timeAgo}</small>
            </Toast.Body>
        </Toast>
    )
}

export default ToastItemComponent