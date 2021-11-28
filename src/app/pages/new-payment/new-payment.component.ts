import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccountUserService } from 'src/app/services/account-users/account-user.service';
import { User } from 'src/app/services/account-users/user';
import { Category } from 'src/app/services/categories/category';
import { CategoryService } from 'src/app/services/categories/category.service';
import { NewPaymentDto } from './new-payment';
import { NewPaymentservice } from './new-payment.service';

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
    userId: null,
    type: 1
  };

  paymentTypes = [{ id: 1, name: "Normal" }, { id: 3, name: "Pending" }];

  constructor(
    private categoryService: CategoryService,
    private accountUserService: AccountUserService,
    private oidcSecurityService: OidcSecurityService,
    private newPaymentService: NewPaymentservice) { }

  async ngOnInit() {
    this.categories = await this.categoryService.listCategories(accountId);
    this.users = await this.accountUserService.listUsers(accountId);
    this.newPayment.date = new Date();
    let userId = this.oidcSecurityService.getUserData().sub;
    this.newPayment.userId = userId;
    this.newPayment.type = 1;
  }

  onSave() {
    console.log("saving");
    this.newPaymentService.createPayment(accountId, this.newPayment)
      .toPromise()
      .then(r => {
        console.log("saved");
      });
  }
}
