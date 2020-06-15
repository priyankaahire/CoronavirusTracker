import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/providers/api-service';
import { map, catchError } from "rxjs/operators";
import { Observable , } from 'rxjs';
import { Chart } from 'chart.js';
import {  LoadingController , ModalController, Platform} from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
export interface Config {
  technologies: string;
}
@Component({
  selector: 'app-world',
  templateUrl: 'world.page.html',
  styleUrls: ['world.page.scss']
})
export class WorldPage implements OnInit {
  info: any = [];
  listdata:any = [];
  total: string;
  todaydate;
  chartData: any = [];
  labels: any = [];
  activeCases: any;
  private pieChart: Chart;
  disconnectSubscription:any;
  public columns : any = [
    { prop: 'name' },
    { name: 'Summary' },
    { name: 'Company' }
  ]
  public rows : any;
  public config : Config;
 
  @ViewChild("pieCanvas") pieCanvas: ElementRef;
  constructor(private _apiService: ApiService,
    public platform: Platform,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public network: Network,
    public elementRef: ElementRef,
    private _HTTP   	: HttpClient) {
    this.getDetails();
   // this.getTableData();
    this.columns = [
      { prop: 'name' },
      { name: 'Summary' },
      { name: 'Company' }
    ];
        // watch network for a disconnection
  this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    
  });

  // stop disconnect watch
  this.disconnectSubscription.unsubscribe();


  // watch network for a connection
  let connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    // We just got a connection but we need to wait briefly
    // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 3000);
  });

  // stop connect watch
  connectSubscription.unsubscribe();
    
  }
  
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getPieChart();
  }
  getDetails() {
    this._apiService.getInfo().subscribe((response: any) => {
      this.info = response.result;
      // for (let key of Object.keys(this.info)) {
      //    this.chartData.push(this.info[key]);
      // }
      // let sum = this.chartData.reduce((a, b) => a + b, 0)
      // this.total = sum;
      // this.todaydate = response.date;
    //  for (let key of Object.keys(this.info)) {
        this.activeCases = this.info["confirmed"] - (this.info["recovered"] + this.info["deaths"]);
       // this.chartData.push(this.info["confirmed"]);
        this.chartData.push(this.activeCases);
        this.chartData.push(this.info["recovered"]);
        this.chartData.push(this.info["deaths"]);
     //}
     //let sum = this.chartData.reduce((a, b) => a + b, 0)
     //this.total = sum;
     this.todaydate = response.date;
        
    });
  }
  getPieChart() {
    return this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: ["Active", "Recovered", "Deaths"],
        datasets: [
          {
            label: "",
            data: this.chartData,
            backgroundColor: this.getColorTheory(),
            borderColor: this.getColorTheory(),
            borderWidth: [1, 1, 1, 1],
            hoverBackgroundColor:this.getColorTheory(),
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Summery of Total Active, Recovered, Deaths',
          position: "top",
        },
        legend: {
          display: true,
          label:true,
          position: "bottom",
          labels: {
            render: 'label',
            fontSize: 10,
            fontStyle: 'bold',
            fontColor: '#000',
            position: 'outside'
          }
        }
      }
    });
   
  }
  getColorTheory() {
    return ["#2a8cb9", "#26c164", "#eb445a"];
  }
  getTableData() {
    // this._apiService.getTableData().subscribe((response: any) => {
    //   this.listdata = response.result;
    //   console.log(this.listdata);
    // });
    this._HTTP
    .get<Config>('../../../assets/data/demo.json')
    .subscribe((data) =>
    {
       this.rows = data.technologies;
    });
    console.log("in ionic load");
    console.log(this.rows);
  }

}


