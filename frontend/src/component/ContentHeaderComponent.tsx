import React, { Component } from "react";
import AvatarComponent from "./AvatarComponent";
import { Button } from "react-bootstrap";

class ContentHeaderComponent extends Component {
    render() {
        return (
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
                    <Button variant="outline-primary" className="btn-outline-custom btn-circle mr-3">
                        <i className="fa fa-user-plus" style={{fontSize: '18px'}}/>
                    </Button>
                    <Button variant="outline-primary" className="btn-outline-custom btn-circle">
                        <i className="fa fa-pencil-square-o" />
                    </Button>
                </div>
            </div>
        )
    }
}

export default ContentHeaderComponent;