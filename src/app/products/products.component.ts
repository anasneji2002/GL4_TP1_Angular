import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  scan,
  catchError,
  of,
  tap,
  takeWhile,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}

  settingSubject = new BehaviorSubject<Settings>({
    limit: 12,
    skip: 0,
  });

  totalProducts = 0;

  // Observable for accumulating products
  products$ = this.settingSubject.pipe(
    // Stop the stream if we've fetched all products 
    takeWhile(
      ({ skip }) => this.totalProducts === 0 || skip < this.totalProducts,
      true 
    ),
    
    concatMap((setting) =>
      this.productService.getProducts(setting).pipe(
        tap((data) => {
          this.totalProducts = data.total; // Update total products count
          console.log(
            `fetched ${data.products.length + setting.skip} of ${data.total} products`
          );
        }),
        map((data) => data.products),
        catchError(() => of([] as Product[]))
      )
    ),
    scan(
      (fetchedProducts: Product[], newProducts: Product[]) => [
        ...fetchedProducts,
        ...newProducts,
      ],
      []
    )
  );

  // Update the request settings
  loadMore(): void {
    const { limit, skip } = this.settingSubject.value;
    this.settingSubject.next({ limit, skip: skip + limit });
  }
} 

