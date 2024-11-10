import { Component, OnInit } from '@angular/core';
import {Category, CategoryService} from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  category: Category = { id: 0, name: '' }; // Inicializando a categoria
  isEditing: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditing = true;
      this.categoryService.getCategoryById(+categoryId).subscribe({
        next: (data) => {
          this.category = data; // Preenche os dados da categoria no formulário
        },
        error: (err) => {
          console.error('Erro ao carregar categoria', err);
        }
      });
    }
  }

  saveCategory(): void {
    if (this.isEditing) {
      // Se for edição, passa o id da categoria
      this.categoryService.updateCategory(this.category.id, this.category).subscribe({
        next: () => {
          alert('Categoria atualizada com sucesso!');
          this.router.navigate(['/categories']); // Redireciona para a lista de categorias
        },
        error: (err) => {
          console.error('Erro ao atualizar categoria', err);
        }
      });
    } else {
      // Se for criação, não passa o id
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
}
