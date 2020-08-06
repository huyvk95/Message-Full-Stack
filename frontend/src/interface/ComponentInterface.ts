import { ELoginViewType } from "../common/TypeCommon";
import { IAppData } from "./DataInterface";

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