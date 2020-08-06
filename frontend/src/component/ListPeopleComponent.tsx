import React from "react";
import AvatarComponent from "./AvatarComponent";

interface IItemProps { 
    avatar?: string, 
    name: string 
}

export default function ListPeopleComponent() {
    return (
        <div className="list-people">
            <p className="text-normal text-light text-uppercase text-12 px-3 py-2">Active now</p>
            {
                Array(3).fill('').map((o, i) => (
                    <PeopleItemComponent
                        avatar="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                        name="Văn Khắc Huy"
                        key={i}
                    />
                ))
            }
            <p className="text-normal text-light text-uppercase text-12 px-3 py-2">Friends</p>
            {
                Array(5).fill('').map((o, i) => (
                    <PeopleItemComponent
                        avatar="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                        name="Văn Khắc Huy"
                        key={i}
                    />
                ))
            }
        </div>
    )
}

function PeopleItemComponent({ name, avatar }: IItemProps) {
    return (
        <div className="people-item px-3 py-2">
            <AvatarComponent url={avatar} type="normal" />
            <p className="people-item-name text-normal text-18">{name}</p>
        </div>
    )
}