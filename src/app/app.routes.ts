import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [

      {
        path: 'login',
        title: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page.component'),
      },

      {
        path: 'registro',
        title: 'registro',
        loadComponent: () => import('./auth/pages/register-page/register-page.component'),
      },

      {
        path: '',
        redirectTo: 'login', pathMatch: 'full',
      }

    ]
  },

  {
    path: 'properties',
    title: 'properties',
    loadComponent: () => import('./properties/properties.component'),
    children: [
      {
        path: 'home',
        title: 'home',
        loadComponent: () => import('./properties/pages/front-page/front-page.component'),
      },
      {
        path: 'listado-propiedades',
        title: 'listado-propiedades',
        loadComponent: () => import('./properties/pages/list-properties/list-properties.component'),
      },
      {
        path: 'listado-busqueda',
        title: 'listado-busqueda',
        loadComponent: () => import('./properties/pages/list-filteredProperties/list-filteredProperties.component'),
      },

      {
        path: 'listado-favoritos',
        title: 'listado-favoritos',
        loadComponent: () => import('./properties/pages/list-favProperties/list-favProperties.component'),
      },

      {
        path: 'propiedad/:id',
        title: 'propiedad',
        loadComponent: () => import('./properties/pages/property/property.component'),
      },

      {
        path: 'addproperty',
        title: 'addproperty',
        loadComponent: () => import('./properties/pages/add-property/add-property.component'),
      },

      {
        path: 'editproperty/:id',
        title: 'editproperty',
        loadComponent: () => import('./properties/pages/edit-property/edit-property.component'),
      },

      {
        path: 'modifyproperty',
        title: 'modifyproperty',
        loadComponent: () => import('./properties/pages/modify-property/modify-property.component'),
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full',
      }


    ]
  },
  {
    path: '',
    redirectTo: 'properties/home',
    pathMatch: 'full'
  },

];
