import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http'; // Importando o HttpClientModule
import {NavbarComponent} from './navbar/navbar.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {FormsModule} from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    CategoryCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  // Configuração correta para a versão Angular 18.x
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
