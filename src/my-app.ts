import { IRouter } from 'aurelia-direct-router';
import { AppState } from "./state/app-state";

export class MyApp {
  constructor(private state: AppState, @IRouter private router: IRouter,){

  }

  async attached(){
    console.log(this.state);
    if (this.state.token === null) {
      await this.router.load('/identity-login');
    }
  }

  async logOut(){
    this.state.token = null;
    this.state.firstname = null;
    this.state.lastname = null; 

    await this.router.load('/home-index');
  }
}
