import { ELoginViewType } from "../common/TypeCommon";
import { IAppData, INavigatorData } from "./DataInterface";

/* _______________CONTAINER_______________ */
/* LOGIN */
export interface ILoginContainerProps {
    login: Function
    register: Function
}

export interface ILoginContainerState {
    viewType: ELoginViewType,
    email: string,
    password: string,
    confirmPassword: string,
}

/* HOME */
export interface IHomeContainerProps {
    app: IAppData,
    logout: Function
}

/* _______________COMPONENT_______________ */
export interface IAvatarComponentProps {
    url?: string,
    type: "langer" | "medium" | "normal" | "small" | "tiny",
    className?: string,
}

export interface IFooterComponentProps {
    navigation: INavigatorData
    chooseContentTab: Function
}

export interface IContentBodyProps {
    navigation: INavigatorData
}

export interface IContentPeopleProps {
    navigation: INavigatorData
    choosePeopleTab: Function
}

export interface IItemConversationProps {
    data: {
        avatar: string,
        name: string
        lastMessageUser: string,
        lastMessage: string,
        lastMessageTime: Date,
        avatarRead: string,
    }
}