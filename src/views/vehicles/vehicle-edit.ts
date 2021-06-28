import { bindable, HttpClient } from "aurelia";
import { IRouter } from 'aurelia-direct-router';
import { IVehicle } from "../../domain/IVehicle";
import { IVehicleType } from "../../domain/IVehicleType";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class VehicleEdit {
    private service: BaseService<IVehicleType> =
        new BaseService<IVehicleType>("/VehicleTypes", this.httpClient, this.state.token);

    private vehicleService: BaseService<IVehicle> =
        new BaseService<IVehicle>("/Vehicles", this.httpClient, this.state.token);

    @bindable private vTypes: IVehicleType[] = [];
    @bindable private vehicle: IVehicle;

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient,
        private state: AppState) {

    }

    async attached() {
        console.log("attached");
        let response = await this.service.getAll();
        if (response.data) {
            this.vTypes = response.data;
        }

        console.log(response);
    }

    async updateClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('Vehicle create clicked');
        console.log(this.vehicle);

        let response = await this.vehicleService.put(this.vehicle.id, this.vehicle);

        if (response.statusCode === 204) {

            await this.router.load('/vehicles-index');
        }
        console.log(response.statusCode);
    }

    async load(parameters) {
        console.log("Load");
        console.log(parameters);
        let response = await this.vehicleService.get(parameters[0]);
        if (response.data) {
            console.log("has data");
            this.vehicle = response.data;
            this.formatDate();

        }
        console.log('vehicle edit release date' + this.vehicle.releaseDate);
    }

    formatDate(){
        this.vehicle.releaseDate = this.vehicle.releaseDate.split('T')[0];
    }
}