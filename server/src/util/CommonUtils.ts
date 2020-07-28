export function emptyKeyFilter(payload: { [key: string]: any }) {
    //Filter
    Object.keys(payload).forEach((key: string) => {
        if (payload[key] === undefined) delete payload[key]
    });
    //Return payload
    return payload;
}

export function userPrivateInfoFilter(info: { [key: string]: any }) {
    const filter = ['password']
    //Filter
    Object.keys(info).forEach((key: string) => {
        if (filter.some(o => o == key)) delete info[key]
    });
    //Return payload
    return info;
}