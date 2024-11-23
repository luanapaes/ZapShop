import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { MarcasService } from "../services/MarcasService.service";

export const getMarca = (route: ActivatedRouteSnapshot) => {
    const marcasService = inject(MarcasService);
    return marcasService.getMarcaByID(route.paramMap.get('id') as string)
}