import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const serverlessUrl = process.env.SERVERLESS_URL;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interface';

  constructor(private http: HttpClient) {
    let a = this.http.get(serverlessUrl + 'getCities');
    console.log(a);
  }
}
