import { bindable } from "@aurelia/runtime-html";
import { IVehicle } from "../domain/IVehicle";

export class VehicleDetailsElement{
    @bindable private data: IVehicle;
}