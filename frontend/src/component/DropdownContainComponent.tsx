import React from "react";
import { connect } from "react-redux";
import { closeDialog } from "../action/AppActions";
import { IStoreState, IAppData } from "../interface/DataInterface";

function DropdownContainComponent({ app, closeDialog }: { app: IAppData, closeDialog: Function }) {
    return (
        <div
            className={`drop_contain ${app.dropdown ? "d-block" : "d-none"}`}
            onClick={() => { closeDialog() }}
        >
            <div
                className="drop_wrap"
                style={{
                    top: `${app.dropdown?.position.y || 0}px`,
                    left: `${app.dropdown?.position.x || 0}px`,
                }}
            >
                {app.dropdown?.content}
            </div>
        </div>
    )
}

export default connect(({ app }: IStoreState) => ({ app }), { closeDialog })(DropdownContainComponent)