import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Category } from "./category";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class CategoryService {
    constructor(private httpClient: HttpClient) { }

    categoryMap: { [id: string]: Category } = null;
    categories: Category[] = null;

    getCategories(accountId: number): Observable<Category[]> {
        return this.httpClient.get<Category[]>(baseUrl + `accounts/${accountId}/categories`);
    }

    async listCategories(accountId: number) {
        if (this.categories == null) {
            await this.initialize(accountId);
        }
        return this.categories;
    }

    async getCategoryMap(accountId: number) {

        if (this.categoryMap == null) {
            await this.initialize(accountId);
        }

        return this.categoryMap;
    }

    async initialize(accountId: number) {
        const categories = await this.getCategories(accountId).toPromise();
        this.categories = categories;
        let result: { [id: string]: Category; } = {};
        categories.forEach(category => {
            result[category.id] = category;
        });
        this.categoryMap = result;
    }
}