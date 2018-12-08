import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const serverlessUrl = 'http://192.168.99.100:3000/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'interface';
  cities = [];
  vehicles = [];

  getCities = () => {
    this.http.get(serverlessUrl + 'getCities',{observe: 'response'})
      .subscribe(resp => {
        this.cities = [];
        for (let i = 0; i < 5; i++){
          this.cities.push(resp.body[i].position);
        }
      });
  };

  getVehicles = () => {
    this.http.get(serverlessUrl + 'getVehicles',{observe: 'response'})
      .subscribe(resp => {
        this.vehicles = [];
        for (let i = 0; i < 1; i++){
          this.vehicles.push(resp.body[i].position);
        }
      });
  };

  drawOnCanvas = () => {
    this.getCities();
    this.getVehicles();
    let canvas =  <HTMLCanvasElement>document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 5; i++){
      ctx.beginPath();
      ctx.arc(this.cities[i][0]*6,this.cities[i][1]*6,10,0,2*Math.PI);
      ctx.stroke();
    }
    for (let i = 0; i < 1; i++){
      ctx.beginPath();
      ctx.arc(this.vehicles[i][0]*6,this.vehicles[i][1]*6,5,0,2*Math.PI);
      ctx.stroke();
    }
  };

  constructor(public http: HttpClient) {


  }

  ngOnInit(): void {
    setInterval(this.drawOnCanvas, 400);
  }

}
