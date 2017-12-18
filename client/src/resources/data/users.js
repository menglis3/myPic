import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Users {

    constructor(data) {
        this.data = data;

        this.USER_SERVICE = 'users';
  }

//Save a User
async save(user){
    if(user){
        //try{
            let serverResponse = await this.data.post(user, this.USER_SERVICE);
            return serverResponse;
        // } catch (error) {
        //     console.log(error)
        //     return error;
        // }
        }

    }
}



