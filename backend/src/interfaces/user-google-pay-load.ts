export interface UserGooglePayload {
    id: string;
    displayName: string;
    name: {
        familyName: string,
        givenName: string
    },
    emails: Array<{ value: string }>

}