import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadUp();
  }

  async loadUp(): Promise<void> {
    await this.httpClient.get('https://localhost:44373/api/auth').toPromise().then(res => console.log(res));
  }
}