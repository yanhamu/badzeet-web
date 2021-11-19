import { Component, OnInit } from '@angular/core';
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
  constructor(private categoryService: CategoryService, private accountUserService: AccountUserService) { }

  async ngOnInit() {
    this.categories = await this.categoryService.listCategories(accountId);
    this.users = await this.accountUserService.listUsers(accountId);
  }
}
