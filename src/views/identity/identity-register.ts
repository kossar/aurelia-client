import { HttpClient } from "aurelia";
import { IRouter } from 'aurelia-direct-router';
import { IRegister } from "../../domain/IRegister";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityRegister{
    private service: AccountService =
        new AccountService("/Account/Register", this.httpClient);

    // private email: string;
    // private password: string;
    private register: IRegister;
    private confirmPassword: string;
    private passwordConfirmError = 'd-none';

    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async registerClicked(event: Event){
        console.log("registerclicked");
        event.preventDefault();
        event.stopPropagation();
        console.log(this.register);
        if (this.register.password !== this.confirmPassword) {
            console.log("psswords not equal")
            this.passwordConfirmError = 'd-block'
            return;
        }
        let response = await this.service.registerLogin(this.register);

        if(response.statusCode === 200 && response.data){
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;

            await this.router.load('home-index');
        }
        console.log(response);
    }
}