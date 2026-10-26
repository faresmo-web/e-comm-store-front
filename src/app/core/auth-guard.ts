import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../services/auth";


export const authGaurd:CanActivateFn = (route,state) => {
    const authService = inject(Auth)
    const router = inject(Router)
    if(authService.isLoggedIn()){
        return true;
    }
    else{
        router.navigateByUrl("/login");
        return false
    }
}