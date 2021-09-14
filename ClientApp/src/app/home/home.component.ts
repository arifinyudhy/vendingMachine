import { Component } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  moneyValues: number[] = [2000, 5000, 10000, 20000, 50000];
  foods: ProductModel[] = [];
  selectedMoney: number;
  selectedFood: string;
  remainingMoney: number;
  currentMoney: number = 0;
  go: boolean = false;
  checked: boolean = false;
  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this._productService.getProducts().subscribe(
      (res: any) => {
        this.foods = res;
      },
      error => {

      }
    )
  }
  checkout(id: number) {
    this._productService.checkout(id.toString()).subscribe(
      res => {
        this.onSuccess(id);
      },
      error => {

      }
    )
  }
  onSuccess(id) {
    let food = this.foods.find(x => x.id == id);
    this.remainingMoney = this.currentMoney - food.price;
    this.selectedFood = food.name;
    this.checked = true;
    this.getFoods();
  }
  cancel() {
    this.remainingMoney = this.currentMoney;
    this.selectedFood = '-';
    this.checked = true;
  }
  updateMoney() {
    this.currentMoney = +this.currentMoney + +this.selectedMoney;
    this.go = true;
    this.selectedMoney = undefined;
  }
  done() {
    this.currentMoney = 0;
    this.go = false;
    this.checked = false;
    this.selectedMoney = undefined;
  }
}
