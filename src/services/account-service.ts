import { HttpClient } from "aurelia";
import { baseUrl } from "../config";
import { ILogin } from "../domain/ILogin";
import { IRegister } from "../domain/IRegister";
import { IFetchResponse } from "../types/IFetchResponse";
import { IJwt } from "../types/IJwt";
import { IMessage } from "../types/IMessage";

export class AccountService{
    private baseUrl = baseUrl;
    
    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient){

    }

    async registerLogin(account: ILogin | IRegister): Promise<IFetchResponse<IJwt | IMessage>>{
        let url = this.baseUrl + this.apiEndpointUrl;
        console.log("logging in?");
        try{
            //let body = account;

            const response = await this.httpClient.post(url, JSON.stringify(account), {cache: "no-store"});
            if(response.ok){
                const data = (await response.json()) as IJwt;
                return {
                    statusCode: response.status,
                    data: data,
                };
            } 
            const data = (await response.json()) as IMessage;
            return {
                statusCode: response.status,
                errorMessage: response.statusText + ' ' + data.messages.join(' '),
            };
        }catch(reason){
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}