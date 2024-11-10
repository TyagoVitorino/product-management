import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, ProductService} from '../services/product.service';
import {Category, CategoryService} from '../services/category.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = {id: 0, name: '', price: 0, category: {id: 0, name: ''}};
  categories: Category[] = [];
  selectedCategoryId: number | undefined;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Carrega o produto
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;

        // Inicializa selectedCategoryId com o ID da categoria do produto carregado
        if (this.product.category) {
          this.selectedCategoryId = this.product.category.id;
        } else {
          this.selectedCategoryId = undefined; // Define como undefined se não houver categoria
        }
      },
      error: (err) => {
        console.error('Erro ao carregar o produto', err);
      },
    });

    // Carrega as categorias
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Erro ao carregar as categorias', err);
      },
    });
  }

  public updateProduct(): void {
    // Verifica se selectedCategoryId está definido
    if (this.selectedCategoryId !== undefined) {
      const selectedCategory = this.categories.find(cat => cat.id === +this.selectedCategoryId!);

      if (selectedCategory) {
        // Define a categoria no produto antes de enviar a atualização
        this.product.category = selectedCategory;

        // Chama o serviço para atualizar o produto
        this.productService.updateProduct(this.product.id, this.product).subscribe({
          next: () => {
            alert('Produto atualizado com sucesso');
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Erro ao atualizar o produto', err);
          },
        });
      } else {
        console.warn('Categoria selecionada não encontrada');
      }
    } else {
      console.warn('Categoria não selecionada');
    }
  }

  public goBack(): void {
    this.router.navigate(['/products']);
  }
}
