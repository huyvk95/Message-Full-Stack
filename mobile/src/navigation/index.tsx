import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name: string, params?: any) {
    (navigationRef as any).current?.navigate(name, params);
}