import React from "react";
import { IPopupConfirmProps } from "../interface/ComponentInterface";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { closePopup } from "../action/AppActions";

function PopupConfirmComponent({ content, buttons, closePopup }: IPopupConfirmProps) {
    return (
        <div className="popup_confirm">
            <div className="popup_content text-normal mb-4">
                {content}
            </div>
            <div className="popup_control">
                {
                    buttons.map((o, i) => (
                        <Button
                            variant={o.primary? "primary":"light"}
                            onClick={() => {
                                if (o.func) o.func();
                                closePopup()
                            }}
                            className={`${o.primary? "":"text-primary"} text-bold`}
                            key={i}
                        >
                            {o.title}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default connect(null, { closePopup })(PopupConfirmComponent)