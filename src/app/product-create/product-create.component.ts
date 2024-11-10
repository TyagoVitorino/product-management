import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../services/product.service';
import {Router} from '@angular/router';
import {Category, CategoryService} from '../services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: {id: 0, name: ''} // A categoria já começa com um valor válido
  };
  categories: Category[] = []; // Array para armazenar as categorias carregadas
  categoriesLoaded: boolean = false; // Flag para verificar se as categorias foram carregadas

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, // Injetando o CategoryService
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // Carregar as categorias ao inicializar o componente
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories; // Atribui as categorias ao array 'categories'
        this.categoriesLoaded = true; // As categorias foram carregadas com sucesso
      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err);
        this.categoriesLoaded = true; // Mesmo se der erro, marcamos que a consulta foi feita
      },
    });
  }

  createProduct(): void {
    // Verifica se a categoria foi selecionada antes de tentar criar o produto
    if (!this.product.category || this.product.category.id === 0) {
      alert('Por favor, selecione uma categoria');
      return;
    }

    this.productService.createProduct(this.product).subscribe({
      next: (data) => {
        alert('Produto criado com sucesso');
        this.router.navigate(['/products']); // Redireciona para a lista de produtos
      },
      error: (err) => {
        console.error('Erro ao criar o produto', err);
      },
    });
  }

  isCreateButtonDisabled(): boolean {
    return !this.categoriesLoaded || this.categories.length === 0;
  }
}
