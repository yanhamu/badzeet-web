import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccountUserService } from 'src/app/services/account-users/account-user.service';
import { User } from 'src/app/services/account-users/user';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { Category } from 'src/app/services/categories/category';
import { CategoryService } from 'src/app/services/categories/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NewPaymentDto } from './new-payment';
import { NewPaymentservice } from './new-payment.service';

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
  accountId: number;

  constructor(
    private categoryService: CategoryService,
    private accountUserService: AccountUserService,
    private oidcSecurityService: OidcSecurityService,
    private newPaymentService: NewPaymentservice,
    private router: Router,
    private storageService: StorageService) { }

  async ngOnInit() {
    this.accountId =this.storageService.getAccount().id
    this.categories = await this.categoryService.listCategories(this.accountId);
    this.users = await this.accountUserService.listUsers(this.accountId);
    this.newPayment.date = new Date();
    let userId = this.oidcSecurityService.getUserData().sub;
    this.newPayment.userId = userId;
  }

  onSave() {
    console.log("saving");
    this.newPaymentService.createPayment(this.accountId, this.newPayment)
      .toPromise()
      .then(r => {
        this.router.navigate(['/payments']);
      });
  }
}
