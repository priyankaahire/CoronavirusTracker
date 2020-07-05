import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AppGlobalService {
    
    readonly MOBILE_KEY = "mobile"
    readonly FIRST_TIME_LOGIN_KEY = "first_time_login"
    readonly USER_DATA_KEY = "user_data"
    readonly BASE_URL_COVID = "https://covidapi.info/api/v1/global"

    user_id: string = ""

    constructor(
        private toastCtrl: ToastController
    ) {}

    async presentNetworkToast(message) {
        let toast = await this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      }
}