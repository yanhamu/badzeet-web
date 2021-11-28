import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccountUserService } from 'src/app/services/account-users/account-user.service';
import { User } from 'src/app/services/account-users/user';
import { Category } from 'src/app/services/categories/category';
import { CategoryService } from 'src/app/services/categories/category.service';

const accountId: number = 2;

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  categories: Category[];
  users: User[];
  newPayment: NewPaymentDto = {
    date: new Date(),
    description: null,
    amount: null,
    categoryId: null,
    userId: "",
    type: 1
  };

  userId: string = "not set";
  userData: any;

  constructor(
    private categoryService: CategoryService,
    private accountUserService: AccountUserService,
    private oidcSecurityService: OidcSecurityService) { }

  async ngOnInit() {
    this.categories = await this.categoryService.listCategories(accountId);
    this.users = await this.accountUserService.listUsers(accountId);
    this.newPayment.date = new Date();
  }

  onSave() {
    console.log("saving");
    console.log(this.newPayment);
  }
}

export interface NewPaymentDto {
  date: Date,
  description: string,
  amount: number,
  categoryId: number,
  userId: string,
  type: number
}
