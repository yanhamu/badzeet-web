import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Category } from "./category";
import { environment } from "src/environments/environment";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class CategoryService {
    constructor(private httpClient: HttpClient) { }

    getCategories(accountId: number) {
        return this.httpClient.get<Category[]>(baseUrl + `accounts/${accountId}/categories`);
    }

    listCategories(accountId:number){
        return this.getCategories(accountId).toPromise();
    }

    async getCategoryMap(accountId: number) {
        const categories = await this.getCategories(accountId)
            .toPromise();
        let result: { [id: string]: Category; } = {};
        categories.forEach(category => {
            result[category.id] = category;
        });
        return result;
    }
}