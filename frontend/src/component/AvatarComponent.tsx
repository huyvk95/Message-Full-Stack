import React from "react";
import { IAvatarComponentProps } from "../interface/ComponentInterface";
import { Badge } from "react-bootstrap";
import util from "../util";
import common from "../common";
import * as api from "../Api";

export default function AvatarComponent({ url, online, size, className, onClick }: IAvatarComponentProps) {
    return (
        <div
            className={`avatar ${className}`}
            onClick={() => { if (typeof onClick === 'function') onClick() }}
            style={{ cursor: typeof onClick === 'function' ? "pointer" : "initial" }}
        >
            <div className={`wrap ${size}`}>
                <div className="img-wrap">
                    {
                        url ?
                            <img src={`${api.getHost()}/${url}`} alt="" height="100%" />
                            :
                            <i className="fa fa-user" />
                    }
                </div>
                {
                    online ?
                        online.status ?
                            <div className="online-status" />
                            :
                            <Badge variant="pill dark text-bolder">{util.string.roundTime(Date.now() - (new Date(online.lastOnlineTime)).getTime())}</Badge>
                        :
                        <></>
                }
            </div>
        </div>
    )
}