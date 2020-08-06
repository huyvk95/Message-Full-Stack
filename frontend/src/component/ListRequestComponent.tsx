import React from "react";
import { Button } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";

interface IItemProps {
    avatar?: string,
    name: string
}

export default function ListRequestComponent() {
    return (
        <div className="list-request">
            {
                Array(5).fill('').map((o, i) => (
                    <ItemRequestComponent
                        avatar="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                        name="Văn Khắc Huy"
                        key={i}
                    />
                ))
            }
        </div>
    )
}

function ItemRequestComponent({ name, avatar }: IItemProps) {
    return (
        <div className="request-item mx-3 py-3">
            <div className="d-flex align-items-center">
                <AvatarComponent
                    url={avatar}
                    type="normal"
                />
                <p className="ml-2 text-normal text-18">{name}</p>
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
    )
}