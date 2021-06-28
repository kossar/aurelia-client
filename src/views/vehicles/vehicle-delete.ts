import { HttpClient } from "aurelia";
import { IRouter } from 'aurelia-direct-router';
import { IVehicle } from "../../domain/IVehicle";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class VehicleDelete {
    private service: BaseService<IVehicle> =
        new BaseService<IVehicle>("/Vehicles", this.httpClient, this.state.token);

    private data: IVehicle;

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient,
        private state: AppState) {

    }

    async attached() {
        console.log("attached");
    }
    async load(parameters) {
        console.log("Load");
        console.log(parameters)
        let response = await this.service.get(parameters[0]);
        if (response.data) {
            console.log("has data");
            this.data = response.data;
            this.formatDate();
        }
    }

    async deleteClicked(event: Event){
        event.preventDefault();
        event.stopPropagation();
        console.log('delete clicked');

        let response = await this.service.delete(this.data.id);
        console.log('stat code' + response.statusCode);
        if (response.statusCode === 200) {
            await this.router.load('/vehicles-index');
        }
    }
    formatDate(){
        this.data.releaseDate = this.data.releaseDate.split('T')[0];
    }
}