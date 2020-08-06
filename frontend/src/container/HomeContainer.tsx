import React, { Component } from "react";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IHomeContainerProps } from "../interface/ComponentInterface";
import socket from "../socket";
import AvatarComponent from "../component/AvatarComponent";
import { Button, InputGroup, FormControl, Row, Col, ButtonGroup } from "react-bootstrap";

class HomeContainer extends Component<IHomeContainerProps> {
    constructor(props: IHomeContainerProps) {
        super(props);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    componentWillMount() {
        let { app } = this.props;
        socket.init({ deviceId: app.deviceId });
    }

    onClickLogout() {
        this.props.logout();
    }

    render() {
        return (
            <div className="home">
                <div className="content">
                    <div className="content-header justify-content-between px-3 py-2">
                        <div className="d-flex align-items-center">
                            <AvatarComponent
                                url="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                                type="normal"
                                className="mr-3"
                            />
                            <h1 className="text-23 text-bold m-0">
                                Chat
                            </h1>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="outline-danger" className="btn-outline-custom btn-circle mr-3">
                                <i className="fa fa-cog" />
                            </Button>
                            <Button variant="outline-primary" className="btn-outline-custom btn-circle">
                                <i className="fa fa-pencil-square-o" />
                            </Button>
                        </div>
                    </div>
                    <div className="content-body" style={{ height: window.innerHeight - 54 - 56 }}>
                        <div className="content-conversation">
                            <div className="px-3 pt-2 pb-3">
                                <InputGroup className="search">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            <i className="fa fa-search" />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Tìm kiếm trên Message"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>
                            <div className="list-conversation">
                                {
                                    Array(20).fill('').map(o => (
                                        <div className="conversation-item px-3 py-2">
                                            <div className="left">
                                                <AvatarComponent
                                                    url="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                                                    type="medium"
                                                />
                                                <div className="info ml-2">
                                                    <p className="text-normal">Hanoicomputer</p>
                                                    <div className="last-message">
                                                        <p className="text-normal text-light">Bạn: có ai tư vấn không ạ</p>
                                                        <p className="text-normal text-light"><span>· </span> 30 Tháng 7</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                {/* <button>
                                            <i className="fa fa-ellipsis-h" />
                                        </button> */}
                                                <AvatarComponent
                                                    url="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                                                    type="tiny"
                                                    className="d-inline-flex"
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="content-people">
                            <div className="navigation px-3 py-2">
                                <Button variant="outline-primary" className="btn-outline-custom">Friends</Button>
                                <Button variant="outline-warning" className="btn-outline-custom">Request</Button>
                            </div>
                            <div className="list-people">
                                <p className="text-normal text-light text-uppercase text-12 px-3 py-2">Active now</p>
                                {
                                    Array(20).fill('').map((o, i) => (
                                        <div className="people-item px-3 py-2" key={i}>
                                            <AvatarComponent type="normal" />
                                            <p className="people-item-name text-normal text-18">Văn Khắc Huy</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="list-request">
                                {
                                    Array(20).fill('').map((o, i) => (
                                        <div className="request-item mx-3 py-3" key={i}>
                                            <div className="d-flex align-items-center">
                                                <AvatarComponent type="normal" />
                                                <p className="ml-2 text-normal text-18">Văn Khắc Huy</p>
                                            </div>
                                            <div>
                                                <Button variant="outline-danger" className="btn-outline-custom">
                                                    Refuse
                                                </Button>
                                                <Button variant="outline-primary" className="btn-outline-custom ml-2">
                                                    Accept
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="content-footer px-3 pt-2">
                        <div className="footer-item">
                            <div className="item-content">
                                <i className="fa fa-comment" />
                                <p className="text-normal">Chats</p>
                            </div>
                        </div>
                        <div className="footer-item">
                            <div className="item-content">
                                <i className="fa fa-users" />
                                <p className="text-normal">People</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-chat">
                    <div className="info-area px-3 py-2">
                        <div className="d-flex">
                            <AvatarComponent type="normal" />
                            <div className="user-info ml-3">
                                <p className="text-bold text-16">Cún (Mập)</p>
                                <p className="text-normal text-light text-12">Hoạt động 15 phút trước</p>
                            </div>
                        </div>
                        <div className="control d-flex align-items-center">
                            <button>
                                <i className="fa fa-info-circle" />
                            </button>
                        </div>
                    </div>
                    <div className="chat-area" style={{ height: window.innerHeight - 57 - 50 }}>

                    </div>
                    <div className="control-area px-3 py-2">
                        <InputGroup>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <Button className="ml-2 btn-circle">
                            <i className="fa fa-paper-plane" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ app }: IStoreState) => ({
    app
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);