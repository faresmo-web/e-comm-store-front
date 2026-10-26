import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../services/auth";


export const adminGaurd:CanActivateFn = (route,state) => {
    const authService = inject(Auth)
    const router = inject(Router)
    if(authService.isLoggedIn()){
        if(authService.isAdmin()){
            return true
        }
        else{
            router.navigateByUrl("/");
            return false
        }
    }
    else{
        router.navigateByUrl("/login");
        return false
    }
}