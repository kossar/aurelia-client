import { HttpClient} from "aurelia";
import { ILogin } from "../../domain/ILogin";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";
import { IRouter } from 'aurelia-direct-router';

export class IdentityLogin {

    private service: AccountService =
        new AccountService("/Account/Login", this.httpClient);

    // private email: string;
    // private password: string;
    private login: ILogin;

    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async loginClicked(event: Event){
        event.preventDefault();
        event.stopPropagation();
        console.log(this.login);

        let response = await this.service.registerLogin(this.login);

        if(response.statusCode === 200 && response.data){
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;

            await this.router.load('/vehicles-index');
        }
        console.log(response);
    }
}