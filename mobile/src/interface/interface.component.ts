import { IAppData } from "./interface.data";

export interface IComponentProps {
    navigation?: any
}

export interface IApp extends IComponentProps {
    initialize: Function,
    app: IAppData
}

export interface ILoginContainer extends IComponentProps {
    
}