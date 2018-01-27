

export interface IFacebookApiComponent {

    getUserInformation(accessToken: string): Promise<any>;
}