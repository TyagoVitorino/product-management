import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {Product, ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err: any) => {
        console.error('Erro ao carregar produtos', err);
      },
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir esse produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Produto excluído com sucesso');
          this.loadProducts(); // Recarregar a lista de produtos
        },
        error: (err: any) => {
          console.error('Erro ao excluir o produto', err);
        },
      });
    }
  }
}
