import { Component, OnInit } from '@angular/core';
import {Category, CategoryService} from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, protected router: Router) {}

  ngOnInit(): void {
    // Carregar todas as categorias
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err);
      },
    });
  }

  editCategory(id: number): void {
    this.router.navigate(['/category/edit', id]);
  }

  deleteCategory(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          alert('Categoria excluída com sucesso!');
          this.ngOnInit(); // Recarrega a lista de categorias
        },
        error: (err) => {
          console.error('Erro ao excluir a categoria', err);
        },
      });
    }
  }
}
