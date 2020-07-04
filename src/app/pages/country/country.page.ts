import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { ApiService } from 'src/app/providers/api-service';
import { CountryMappingService } from 'src/app/providers/country-mapping.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import {  LoadingController , ModalController, Platform, IonRouterOutlet} from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import {map,tap} from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
@Component({
  selector: 'app-country',
  templateUrl: 'country.page.html',
  styleUrls: ['country.page.scss']
})
export class CountryPage implements OnInit {

  pieChart: any;
  barChart: any;
  info: any = [];
  listdata:any = [];
  total: string;
  chartData: any = [];
  labels: any = ["Active", "Recovered", "Deaths"];
  countryData:any = [];
  currWeekData:any = [];
  response:any = [];
  weekLabels:any = [];
  selectedCountry: any = "IND";
  pieFlag: any = false;
  disconnectSubscription:any;
  activeCases: any;
  dataset = [];
  d:any;

  @ViewChild("pieCanvas") pieCanvas: ElementRef;
  @ViewChild("barCanvas") barCanvas: ElementRef;
 

  constructor(
    public datePicker: DatePicker, 
    public _apiService: ApiService, 
    public _countryMapService: CountryMappingService, 
    public platform: Platform,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public network: Network,
    public elementRef: ElementRef,
    private routerOutlet: IonRouterOutlet) {
    

    // watch network for a disconnection
  this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
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
   this.getCountry();
   this.getCountryWiseData();
   this.getCurrentWeek();

  }
  getDate(selecteddate) {
    console.log(selecteddate.toISOString().split('T')[0]);
  }
  countryfilter(event){
    this.selectedCountry = event.target.value
    this.getCountryWiseData();
    this.getCurrentWeek();
  }
  
  getPieChart(dataChart) {
  document.getElementById('pieChartContainer').innerHTML = "";
  document.getElementById('pieChartContainer').innerHTML = `<canvas #pieCanvas style="height:40vh; width:80vw" id="pieCanvas"></canvas>`;

    this.pieChart = new Chart('pieCanvas', {
      type: "pie",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "",
            data: dataChart,
            backgroundColor: this.getColorTheory(),
            borderColor: this.getColorTheory(),
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          position: "top",
        },
        legend: {
          display: true,
          label:true,
          position: "bottom",
          labels: {
            enable:true,
            render: 'label',
            fontSize: 10,
            fontStyle: 'bold',
            fontColor: '#000',
            position: 'outside'
          }
        }
      },
      
    });
  
 
}

  getBarChart(datachart) {
    document.getElementById('barChartContainer').innerHTML = "";
    document.getElementById('barChartContainer').innerHTML = `<canvas #barCanvas style="height:40vh; width:80vw" id="barCanvas"></canvas>`;
   
    var numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    this.barChart = new Chart('barCanvas',  {
      type: 'bar',
      data: {
        labels: this.weekLabels,
        datasets: datachart
      },
      options: {
        title: {
          display: true,
          text: 'Cases in the current week'
          },
          tooltips: {
            mode: 'label',
            callbacks: {
              label: function(tooltipItem, data) { 
                return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
              }
            }
           },
          scales: {
            xAxes: [{ 
              stacked: true, 
              gridLines: { display: true},
              }],
            yAxes: [{ 
              stacked: true, 
              gridLines: { 
               display: true},
              }],
          }, // scales
          legend: {
            display: true,
            label:true,
            position: "bottom",
            labels: {
              enable:true,
              render: 'label',
              fontSize: 10,
              fontStyle: 'bold',
              fontColor: '#000',
              position: 'outside'
            }
          }
      } // options
     
    });
  }
  
  getCountry() {
    this._apiService.getCountry().subscribe((response: any) => {
      this.listdata =  response.result.map(function(item) {
        return Object.keys(item)[0];
      });
      this._countryMapService.mappingCountry(this.listdata)
      .subscribe(res => {
        this.countryData = res;
      });
    });
  }
  async getCountryWiseData() {
    this.chartData = [];
    this.total = '';
    await this._apiService.getCountryWiseRecord(this.selectedCountry).toPromise().then((response: any) => {
        for (let key of Object.keys(response.result)) {
          this.info = response.result[key];
        }
       this.activeCases = this.info["confirmed"] - (this.info["recovered"] + this.info["deaths"]);
       this.chartData.push(this.activeCases);
       this.chartData.push(this.info["recovered"]);
       this.chartData.push(this.info["deaths"]);
    });
  
   this.getPieChart(this.chartData);
  }
 
  async getCurrentWeek() {
    this.currWeekData = [];
    this.dataset = [];
    let endDate: string = new Date().toISOString().split('T')[0];
    let todaysDate = new Date();
    let startDate: string = new Date(todaysDate.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    await this._apiService.getCurrentWeekData(this.selectedCountry, startDate, endDate).toPromise().then((res: any) => {
      var result = res.result;
      var count = res.count;
    
      var color = this.getColorTheory();
      var dataset1 = [];
      var active = [];
      var recovered = [];
      var deaths = [];
      this.weekLabels = [];
      this.activeCases = '';
      for(var i = 0; i < count; i++) {
        this.weekLabels.push(this.convertFormat(result[i].date,'D MMM YYYY'));
        this.activeCases = result[i]["confirmed"] - (result[i]["recovered"] +result[i]["deaths"]);
        active.push(this.activeCases);
        recovered.push(result[i].recovered);
        deaths.push(result[i].deaths);
      }
      this.dataset.push(active);
      this.dataset.push(recovered);
      this.dataset.push(deaths);
      for(var j = 0; j < 3; j++) {
        this.currWeekData.push({"label":this.labels[j], "data":this.dataset[j],"backgroundColor": color[j]});
      }
    });
    this.getBarChart(this.currWeekData);
  }
  convertFormat(date,format) {
   return moment(date).format(format);
  }
  getColorTheory() {
    return ["#2a8cb9", "#26c164", "#eb445a"];
  }
 
}
