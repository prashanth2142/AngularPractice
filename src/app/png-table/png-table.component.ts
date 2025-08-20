import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-png-table', 
   standalone: true,
  imports: [CommonModule, TableModule], 
  templateUrl: './png-table.component.html',
  styleUrl: './png-table.component.css'
})
export class PngTableComponent implements AfterViewInit{
products: Product[] = [];
  cols: any[] = [];
@ViewChild('customDivContainer') customDivContainer!: ElementRef;

@ViewChild('dataTable') dataTable!: ElementRef;

  constructor(private renderer: Renderer2) {}


  ngAfterViewInit() {
    
  }
  ngOnInit() {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'category', header: 'Category' },
      { field: 'price', header: 'Price' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'inventoryStatus', header: 'Status' },
      { field: 'rating', header: 'Rating' },
      { field: 'orders', header: 'Orders' },
      { field: 'sales', header: 'Sales' },
      { field: 'revenue', header: 'Revenue' },
      { field: 'profit', header: 'Profit' },
      { field: 'margin', header: 'Margin' }
    ];

    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description for Bamboo Watch',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        orders: 150,
        sales: 9750,
        revenue: 85000,
        profit: 15000,
        margin: 17.6
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description for Black Watch',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        orders: 89,
        sales: 6408,
        revenue: 72000,
        profit: 12000,
        margin: 16.7
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description for Blue Band',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        orders: 456,
        sales: 36024,
        revenue: 95000,
        profit: 18000,
        margin: 18.9
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description for Blue T-Shirt with very long description text',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        orders: 234,
        sales: 6786,
        revenue: 42000,
        profit: 8000,
        margin: 19.0
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description for Bracelet',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        orders: 167,
        sales: 2505,
        revenue: 28000,
        profit: 5000,
        margin: 17.9
      }
    ];
  }
}

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  orders: number;
  sales: number;
  revenue: number;
  profit: number;
  margin: number;
}
