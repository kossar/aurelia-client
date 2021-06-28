import { bindable, HttpClient } from "aurelia";
import { IRouter } from 'aurelia-direct-router';
import { IVehicle } from "../../domain/IVehicle";
import { IVehicleAdd } from "../../domain/IVehicleAdd";
import { IVehicleType } from "../../domain/IVehicleType";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class VehicleCreate {
    private service: BaseService<IVehicleType> =
        new BaseService<IVehicleType>("/VehicleTypes", this.httpClient, this.state.token);

        private postVehicleService: BaseService<IVehicle> =
        new BaseService<IVehicle>("/Vehicles", this.httpClient, this.state.token);

    @bindable private vTypes: IVehicleType[] = [];
    @bindable private vehicle: IVehicleAdd; 
    


    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient,
        private state: AppState) {

    }

    async attached() {
        console.log("attached");
        let response = await this.service.getAll();
        if(response.data){
            this.vTypes = response.data;
        }
        console.log(response);
    }

    async createClicked(event: Event){
        event.preventDefault();
        event.stopPropagation();
        console.log('Vehicle create clicked');
        console.log(this.vehicle);

        let response = await this.postVehicleService.post(this.vehicle);

        if(response.statusCode === 201 && response.data){

            await this.router.load('/vehicles-index');
        }
        console.log(response);
    }

}