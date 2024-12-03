import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/Auth/change-password/change-password.component';
import { LoginComponent } from './component/Auth/login/login.component';
import { DepartementsListComponent } from './component/departements-list/departements-list.component';
import { PostesListComponent } from './component/postes-list/postes-list.component';
import { SallesListComponent } from './component/salles-list/salles-list.component';
import { ReservationsListComponent } from './component/reservations-list/reservations-list.component';
import { Error404Component } from './component/errors/error-404/error-404.component';
import { Error500Component } from './component/errors/error-500/error-500.component';
import { ProfileComponent } from './component/Auth/profile/profile.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { title: 'Connexion' } },
    { path: 'change-password', component: ChangePasswordComponent, data: { title: 'Changer le Mot de Passe' } },
    { path: 'departement/list', component: DepartementsListComponent, data: { title: 'Liste des Départements' } },
    { path: 'departement/poste/list', component: PostesListComponent, data: { title: 'Liste des Postes' } },
    { path: 'salle/list', component: SallesListComponent, data: { title: 'Liste des Salles' } },
    { path: 'reservation/list', component: ReservationsListComponent, data: { title: 'Liste des Réservations' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'Votre profile' }, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full', data: { title: 'Connexion' } },
    { path: 'error/500', component: Error500Component, data: { title: 'Erreur 500' } },
    { path: '**', component: Error404Component, data: { title: 'Erreur 404 - Page Introuvable' } },
  ];