import { HttpClient } from "aurelia";
import { IRouter } from 'aurelia-direct-router';
import { IVehicle } from "../../domain/IVehicle";
import { IVehicleType } from "../../domain/IVehicleType";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class VehiclesIndex{

    private service: BaseService<IVehicle> =
         new BaseService<IVehicle>("/Vehicles", this.httpClient, this.state.token);
    
    private vTypesService: BaseService<IVehicleType> =
         new BaseService<IVehicleType>("/VehicleTypes", this.httpClient, this.state.token);

    private data: IVehicle[] = [];
    private vTypes: IVehicleType[] = [];

    constructor( 
        @IRouter private router: IRouter,
        protected httpClient: HttpClient,
        private state: AppState
        ) {
        
    }

    async attached() {
        console.log("attached");

        if (this.state.token == null) {
            this.router.load('/vehicles-index');
        }
        

        let vTypesResponse = await this.vTypesService.getAll();
        if (vTypesResponse.data) {
            this.vTypes = vTypesResponse.data;
        }

        let response = await this.service.getAll();
        if(response.data){
            this.data = response.data;
            console.log(this.data);
            this.formatDate();
        }
        console.log(response);
    }

    getTypeById(vId: string): string{
        if (this.vTypes.length > 0) {
            return this.vTypes.find(i => {
                return i.id == vId;
            }).vehicleTypeName;
        }
        return "";
        
    }

    formatDate(){
        this.data.forEach(d => d.releaseDate = d.releaseDate.split('T')[0]);
    }
}