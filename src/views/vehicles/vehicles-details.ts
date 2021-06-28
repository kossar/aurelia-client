import { HttpClient, IRouteViewModel } from "aurelia";
import { IVehicle } from "../../domain/IVehicle";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class VehiclesDetails implements IRouteViewModel {

    private service: BaseService<IVehicle> =
        new BaseService<IVehicle>("/Vehicles", this.httpClient, this.state.token);

    private data: IVehicle;

    constructor(
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
    formatDate(){
        this.data.releaseDate = this.data.releaseDate.split('T')[0];
    }

}