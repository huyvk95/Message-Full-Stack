import React from "react";
import { IAvatarComponentProps } from "../interface/ComponentInterface";

export default function AvatarComponent({ url, type, className }: IAvatarComponentProps) {
    return (
        <div className={`avatar ${className}`}>
            <div className={`wrap ${type}`}>
                {
                    url ?
                        <img src={url} alt="" height="100%" />
                        :
                        <i className="fa fa-user" />
                }
            </div>
        </div>
    )
}