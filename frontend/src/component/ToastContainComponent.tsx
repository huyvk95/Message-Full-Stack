import React, { Component } from "react";
import { connect } from "react-redux";
import { IStoreState, IAppData } from "../interface/DataInterface";
import { pushToast } from "../action/AppActions";
import ToastItemComponent from "./ToastItemComponent";

interface IProps {
    app: IAppData
    pushToast: Function
}

interface IState {
    elements: JSX.Element[]
}

class ToastContainComponent extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = { elements: [] }
    }

    shouldComponentUpdate(nextProps: IProps) {
        if (nextProps.app.toast && nextProps.app.notification) {
            let { content, time, onClick, autohide } = nextProps.app.toast
            let { elements } = this.state
            // Play sound
            if (nextProps.app.sound) {
                let audio = new Audio('./src/mp3/notification.mp3')
                audio.play()
            }
            // Set state
            this.setState({
                elements: [...elements, <ToastItemComponent content={content} time={time} onClick={onClick} autohide={autohide} key={elements.length} />]
            })
            this.props.pushToast(undefined)
            return false
        }
        return true
    }

    render() {
        return (
            <div className="toast_contain">
                {this.state.elements}
            </div>
        )
    }
}

const mapStateToProps = ({ app }: IStoreState) => ({ app })
const mapDispatchToProps = { pushToast }
export default connect(mapStateToProps, mapDispatchToProps)(ToastContainComponent)