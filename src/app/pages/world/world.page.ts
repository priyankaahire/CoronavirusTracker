import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/providers/api-service';
import { map, catchError } from "rxjs/operators";
import { Observable , } from 'rxjs';
import { Chart } from 'chart.js';
import { ToastController, LoadingController , ModalController, Platform, IonRouterOutlet} from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
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
  @ViewChild("pieCanvas") pieCanvas: ElementRef;
  
  constructor(private _apiService: ApiService,
    public platform: Platform,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public network: Network,
    public elementRef: ElementRef,
    private _HTTP   	: HttpClient,
    private toastCtrl: ToastController,
    private routerOutlet: IonRouterOutlet) {
      // this.platform.backButton.subscribeWithPriority(666666, () => {
      //   if (!this.routerOutlet.canGoBack()) {
      //     if(window.confirm("Do you want to exist app")) {
      //               navigator["app"].exitApp();
      //         // App.exitApp();
      //     }
          
      //   }
      // });
      // this.subscripbe = this.platform.subscribeWithPriority(666666, () => {
      //   if(this.constructor.name == "WordPage") {
      //     if(window.confirm("Do you want to exist app")) {
      //         navigator["app"].exitApp();
      //     }

      //   }
      // })
    this.getDetails();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getPieChart();
  }
  getDetails() {
    this._apiService.getInfo().subscribe((response: any) => {
      this.info = response.result;
        this.activeCases = this.info["confirmed"] - (this.info["recovered"] + this.info["deaths"]);
        this.chartData.push(this.activeCases);
        this.chartData.push(this.info["recovered"]);
        this.chartData.push(this.info["deaths"]);
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
  }

}


