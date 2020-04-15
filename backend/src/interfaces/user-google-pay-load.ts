export interface UserGooglePayload {
    id?: string;
    jwt?: string;
    displayName: string;
    name: {
        familyName: string,
        givenName: string
    },
    emails: Array<{ value: string }>
    photos: Array<any>;
}