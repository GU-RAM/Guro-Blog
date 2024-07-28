import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      // {
      //   path: 'main',
      //   loadComponent: () => import('./pages/main/main.component').then((c) => c.MainComponent),
      //   data: {
      //     preload: true,
      //     breadcrumb: 'მთავარი გვერდი',
      //   },
      //   title: 'მთავარი გვერდი',
      // },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component').then((m) => m.UsersComponent),
        title: 'იუზერები',
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/posts/posts.component').then((m) => m.PostsComponent),
        title: 'პოსტები',
      },
      {
        path: 'user-posts/:userId',
        loadComponent: () =>
          import('./pages/posts/posts.component').then((m) => m.PostsComponent),
        title: 'იუზერის პოსტები',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404',
  },
];
