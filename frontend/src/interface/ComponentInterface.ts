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
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
}

/* HOME */
export interface IHomeContainerProps {
    app: IAppData,
    cleanUserData: Function
    getFriend: Function
    setFriendNickName: Function
    updateFriendData: Function
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

export interface IToastItemProps {
    autohide?: number
    onClick?: Function
    content: string | JSX.Element
    time: Date
}

export interface IPopupProps {
    show?: boolean,
    header?: {
        btnLeft?: {
            title: string,
            func?: Function,
        }
        btnRight?: {
            title: string,
            func?: Function,
        }
        title: string
    }
    body?: JSX.Element | string | undefined
    openRecent?: boolean
}

export interface IContentHeaderProps {
    navigation: INavigatorData
    openPopup: Function
}