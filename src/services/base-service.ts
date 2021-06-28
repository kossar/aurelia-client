import { HttpClient } from "aurelia";
import { baseUrl } from "../config";
import { IVehicle } from "../domain/IVehicle";
import { IVehicleAdd } from "../domain/IVehicleAdd";
import { IFetchResponse } from "../types/IFetchResponse";
import { IMessage } from "../types/IMessage";
import { IQueryParams } from "../types/IQueryParams";

export class BaseService<TEntity>{

    private baseUrl = baseUrl;
    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient, private jwt?: string){

    }

    private autHeaders = this.jwt !== undefined ? {
        'Authorization': 'Bearer ' + this.jwt
    } : {};


    async put(id: string, entity: IVehicle): Promise<IFetchResponse<TEntity>>{
        let url: string = this.apiEndpointUrl;
        url = this.baseUrl + url + "/" + id;
        try{
            //let body = account;
            console.log(this.autHeaders);
            console.log(JSON.stringify(entity));
            const response = await this.httpClient.put(url, JSON.stringify(entity), 
            {
                cache: "no-store",
                headers: this.autHeaders
            });
            console.log("response in put:");

            console.log(response);
            if(response.ok){
                console.log("put response ok");
                // console.log(await response.json());
                // const data = (await response.json()) as any;
                //console.log(data);
                return {
                    statusCode: response.status,
                    //data: data,
                };
            } 
            const data = (await response.json()) as IMessage;
            console.log(data.messages)
            return {
                statusCode: response.status,
                errorMessage: response.statusText + ' ' + data.messages.join(' '),
            };
        }catch(reason){
            console.log('some error in put');
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
    async delete(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>>{
        let url = this.apiEndpointUrl;
        url = this.baseUrl + url + "/" + id;

        if(queryParams !== undefined){
            //TODO: add query params to url
        }
        

        try{
            const response = await this.httpClient.delete(
                url,
                null, 
                {
                    cache: "no-store",
                    headers: this.autHeaders
                });
            if(response.ok){
                const data = (await response.json()) as TEntity;
                console.log(data);
                return {
                    
                    statusCode: response.status,
                    data: data,
                };
            } 
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        }catch(reason){
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
    async post(entity: IVehicleAdd): Promise<IFetchResponse<TEntity>>{
        let url: string = this.baseUrl + this.apiEndpointUrl;
        try{
            //let body = account;
            console.log(this.autHeaders);
            console.log(JSON.stringify(entity));
            const response = await this.httpClient.post(url, JSON.stringify(entity), 
            {
                cache: "no-store",
                headers: this.autHeaders
            });
            if(response.ok){
                const data = (await response.json()) as any;
                return {
                    statusCode: response.status,
                    data: data,
                };
            } 
            const data = (await response.json()) as IMessage;
            console.log(data.messages)
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

    async getAll(queryParams?: IQueryParams): Promise<IFetchResponse<TEntity[]>>{
        let url = this.baseUrl + this.apiEndpointUrl;

        if(queryParams !== undefined){
            //TODO: add query params to url
        }
        console.log("try start");
        try{
           
            const response = await this.httpClient.fetch(
                url, 
                {
                    cache: "no-store",
                    headers: this.autHeaders
                });
            if(response.ok){
                const data = (await response.json()) as TEntity[];
                console.log('responseok');
                return {
                    statusCode: response.status,
                    data: data,
                };
            };
            console.log('notok'); 
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        }catch(reason){
            console.log('error');
            return {
                
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async get(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>>{
        let url = this.apiEndpointUrl;
        url = this.baseUrl + url + "/" + id;

        if(queryParams !== undefined){
            //TODO: add query params to url
        }
        

        try{
            const response = await this.httpClient.fetch(url, {cache: "no-store", headers: this.autHeaders });
            if(response.ok){
                const data = (await response.json()) as TEntity;
                console.log(data);
                return {
                    
                    statusCode: response.status,
                    data: data,
                };
            } 
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        }catch(reason){
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}