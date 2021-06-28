import { bindable } from "@aurelia/runtime-html";
import { IVehicle } from "../domain/IVehicle";
import { IVehicleAdd } from "../domain/IVehicleAdd";
import { IVehicleType } from "../domain/IVehicleType";

export class VehicleCreateEdit{
    @bindable private vTypes: IVehicleType[] = [];
    @bindable private vehicle: IVehicleAdd | IVehicle;  

    // constructor(private eventAggregator: EventAggregator) {
    
    //     this.subscriptions.push(
    //       this.eventAggregator.subscribe('vTypes-loaded', (vehicleTypes: IVehicleType[]) => this.vTypes = [...this.vTypes, ...vehicleTypes]),
    //       this.eventAggregator.subscribe('organisations-loaded', (orgs: IOrganisation[]) => this.organisations = [...this.organisations, ...orgs])
    //     );
    //     // this.subscriptions.push(
    //     //     this.eventAggregator.subscribe('data-loaded', (joke: IJoke) => console.log("joke: " + joke.value))
    //     //   );
    
    //   }
}