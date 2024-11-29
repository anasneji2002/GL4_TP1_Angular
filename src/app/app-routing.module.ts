import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { TestRainbowWritingComponent } from "./components/test-rainbow-writing/test-rainbow-writing.component";
import { MasterDetailsCvComponent } from "./cv/master-details-cv/master-details-cv.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },

  // Master-Detail setup for CVs
  {
    path: 'master-details-cv',
    component: MasterDetailsCvComponent,
    children: [
      {
        path: ':id',
        component: DetailsCvComponent,
      }
    ]
  },

  // { path: "cv", component: CvComponent },
  // { path: "cv/add", component: AddCvComponent, canActivate: [AuthGuard] },
  // { path: "cv/:id", component: DetailsCvComponent },

  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", component: TodoComponent },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  { path: "test-rainbow-writing", component: TestRainbowWritingComponent},
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
