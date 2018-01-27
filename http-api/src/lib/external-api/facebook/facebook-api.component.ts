

import {IFacebookApiComponent} from '../interfaces';
import {injectable} from 'inversify';

@injectable()
export default class FacebookApiComponent implements IFacebookApiComponent {

    getUserInformation(accessToken) {
        return Promise.resolve({});
    }
}