import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    declarations: [],
    imports: [      
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]    
})
export class AuthRoutingModule {}