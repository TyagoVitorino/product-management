import {Component} from '@angular/core';
import {Category, CategoryService} from '../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  category: Category = {id: 0, name: ''}; // Inicializando a categoria com um objeto vazio

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
  }

  saveCategory(): void {
    this.categoryService.createCategory(this.category).subscribe({
      next: () => {
        alert('Categoria criada com sucesso!');
        this.router.navigate(['/categories']); // Redireciona para a lista de categorias
      },
      error: (err) => {
        console.error('Erro ao criar categoria', err);
      }
    });
  }
}
