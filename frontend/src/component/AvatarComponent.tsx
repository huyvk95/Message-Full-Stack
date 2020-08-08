import React from "react";
import { IAvatarComponentProps } from "../interface/ComponentInterface";
import { Badge } from "react-bootstrap";
import util from "../util";

export default function AvatarComponent({ url, online, size, className }: IAvatarComponentProps) {
    return (
        <div className={`avatar ${className}`}>
            <div className={`wrap ${size}`}>
                {
                    url ?
                        <img src={url} alt="" height="100%" />
                        :
                        <i className="fa fa-user" />
                }
                {
                    online ?
                        online.status ?
                            <div className="online-status" />
                            :
                            <Badge variant="dark text-bolder">{util.string.roundTime(Date.now() - (new Date(online.lastOnlineTime)).getTime())}</Badge>
                        :
                        <></>
                }
            </div>
        </div>
    )
}