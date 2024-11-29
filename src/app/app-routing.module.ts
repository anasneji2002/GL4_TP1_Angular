import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

const routes: Route[] = [
  { path: "login", loadComponent: () => import("./auth/login/login.component").then(m => m.LoginComponent) },
  { path: "rh", loadComponent: () => import("./optimizationPattern/rh/rh.component").then(m => m.RhComponent) },
  {
    path: "cv",
    loadChildren: () => import("./cv/cv.module").then((m) => m.CvModule)
  },
  {
    path: "",
    loadChildren: () => import("./templates/front/front.module").then(m => m.FrontRoutingModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./templates/admin/admin.module").then(m => m.AdminRoutingModule)
  },
  { path: "rainbow-writing-directive", loadComponent: () => import("./components/test-rainbowWritingDirective/test-rainbow-writing-directive/test-rainbow-writing-directive.component").then(m => m.TestRainbowWritingDirectiveComponent) },
  { path: "ttc", loadComponent: () => import("./components/ttcCalculator/ttc-calculator/ttc-calculator.component").then(m => m.TtcCalculatorComponent) },

  { path: "**", loadComponent: () => import("./components/nf404/nf404.component").then(m => m.NF404Component) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
