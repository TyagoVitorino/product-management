import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Importando os componentes
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CategoryListComponent} from './category-list/category-list.component'; // Importando componente de listagem de categorias
import {CategoryCreateComponent} from './category-create/category-create.component'; // Importando componente de criação de categoria
import {CategoryDetailComponent} from './category-detail/category-detail.component'; // Importando componente de detalhes/edição de categoria

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'}, // Redireciona para a listagem de produtos
  {path: 'products', component: ProductListComponent}, // Rota para listar os produtos
  {path: 'products/list', component: ProductListComponent}, // Listagem de produtos (pode ser igual à rota anterior)
  {path: 'products/create', component: ProductCreateComponent}, // Rota para criar um produto
  {path: 'products/edit/:id', component: ProductDetailComponent}, // Rota para editar um produto (com id dinâmico)

  // Rotas para categorias
  {path: 'categories', component: CategoryListComponent}, // Rota para listar as categorias
  {path: 'categories/create', component: CategoryCreateComponent}, // Rota para criar uma nova categoria
  {path: 'categories/edit/:id', component: CategoryDetailComponent}, // Rota para editar uma categoria

  {path: '**', redirectTo: '/products'} // Rota curinga para redirecionar para a listagem de produtos caso uma URL inválida seja acessada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura as rotas no módulo
  exports: [RouterModule] // Exporta o RouterModule para estar disponível em outros módulos
})
export class AppRoutingModule {
}
