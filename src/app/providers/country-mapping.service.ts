import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AppGlobalService } from './app-global.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class CountryMappingService {

  error = '';
  public data:any = [];
  constructor(
    private http: HTTP,
    private _global: AppGlobalService,
    private _httpClient: HttpClient
  ) { }
  
  mappingCountry(data:any):Observable<any[]>{
    var countries = [
                      {code: "KAZ",name:"Kazakhstan"}, 
                      {code: "KWT",name:"Kuwait"},
                      {code: "KOR",name:"South Korea"}, 
                      {code: "KEN",name:"Kenya"} ,
                      {code: "LVA",name:"Latvia"} ,
                      {code: "LBR",name:"Liberia"} ,
                      {code: "KGZ",name:"Kyrgyzstan"}, 
                      {code: "LBN",name:"Lebanon"} ,
                      {code: "LIE",name:"Liechtenstein"} ,
                      {code: "LUX",name:"Luxembourg"} ,
                      {code: "LTU",name:"Lithuania"} ,
                      {code: "MDG",name:"Madagascar"} ,
                      {code: "MDV",name:"Maldives"} ,
                      {code: "MYS",name:"Malaysia"} ,
                      {code: "MLT",name:"Malta"} ,
                      {code: "MDA",name:"Malta"} ,
                      {code: "MRT",name:"Mauritania"} ,
                      {code: "MEX",name:"Mexico"} ,
                      {code: "MUS",name:"Mauritius"}, 
                      {code: "MNG",name:"Mongolia"} ,
                      {code: "MAR",name:"Morocco"} ,
                      {code: "MCO",name:"Monaco"} ,
                      {code: "MNE",name:"Montenegro"}, 
                      {code: "NAM",name:"Namibia"}, 
                      {code: "NLD",name:"Netherlands"} ,
                      {code: "NPL",name:"Nepal"} ,
                      {code: "NZL",name:"New Zealand"} ,
                      {code: "NER",name:"Niger"} ,
                      {code: "NIC",name:"Nicaragua"} ,
                      {code: "NGA",name:"Nigeria"} ,
                      {code: "PAK",name:"Pakistan"} ,
                      {code:"MKD",name:"North Macedonia"} ,
                      {code:"OMN",name:"Oman"} ,
                      {code:"NOR",name:"Norway"}, 
                      {code: "PNG",name:"Papua New Guinea"} ,
                      {code: "PER",name:"Peru"} ,
                      {code: "PAN",name:"Panama"} ,
                      {code: "PRY",name:"Paraguay"}, 
                      {code: "PHL",name:"Philippines"} ,
                      {code: "PRT",name:"Portugal"} ,
                      {code: "POL",name:"Poland"} ,
                      {code: "RUS",name:"Russia"},
                      {code: "ROU",name:"Romania"}, 
                      {code: "RWA",name:"Rwanda"} ,
                      {code: "QAT",name:"Qatar"} ,
                      {code: "LCA",name:"Saint Lucia"} ,
                      {code: "SMR",name:"San Marino"} ,
                      {code: "VCT",name:"Saint Vincent and the Grenadines"} ,
                      {code:"SEN",name:"Senegal"} ,
                      {code: "SYC",name:"Seychelles"} ,
                      {code: "SAU",name:"Saudi Arabia"} ,
                      {code: "SRB",name:"Serbia"},
                      {code:"SVK",name:"Slovakia"}, 
                      {code: "SOM",name:"Somalia"} ,
                      {code: "SGP",name:"Singapore"} ,
                      {code: "SVN",name:"Slovenia"} ,
                      {code: "ZAF",name:"South Africa"} ,
                      {code: "LKA",name:"Sri Lanka"} ,
                      {code: "ESP",name:"Spain"} ,
                      {code: "SWE",name:"Sweden"} ,
                      {code: "SUR",name:"Suriname"} ,
                      {code: "CHE",name:"Switzerland"} ,
                      {code: "SDN",name:"Sudan"} ,
                      {code: "TGO",name:"Togo"} ,
                      {code: "TWN",name:"Taiwan"} ,
                      {code: "THA",name:"Thailand"} ,
                      {code: "TZA",name:"Tanzania"} ,
                      {code: "TTO",name:"Trinidad and Tobago"} ,
                      {code: "TUR",name:"Turkey"} ,
                      {code: "TUN",name:"Tunisia"} ,
                      {code: "ARE",name:"United Arab Emirates"} ,
                      {code: "UKR",name:"Ukraine"} ,
                      {code: "GBR",name:"United Kingdom"} ,
                      {code: "UGA",name:"Uganda"} ,
                      {code: "UZB",name:"Uzbekistan"} ,
                      {code: "URY",name:"Uruguay"} ,
                      {code: "USA",name:"United States"} ,
                      {code: "VEN",name:"Venezuela"} ,
                      {code: "ZMB",name:"Zambia"} ,
                      {code: "VNM",name:"Vietnam"}, 
                      {code: "ZWE",name:"Zimbabwe"} ,
                      {code: "GRD",name:"Grenada"} ,
                      {code: "DMA",name:"Dominica"} ,
                      {code: "SYR",name:"Syria"} ,
                      {code: "MOZ",name:"Mozambique"} ,
                      {code: "LAO",name:"Laos"}, 
                      {code: "BLZ",name:"Belize"} ,
                      {code: "TLS",name:"Timor-Leste"} ,
                      {code: "WBG",name:"West Bank/Gaza Strip"} ,
                      {code: "LBY",name:"Libya"} ,
                      {code: "MLI",name:"Mali"} ,
                      {code: "GNB",name:"Guinea" },           
                      {code: "KNA",name:"Saint Kitts and Nevis"} ,
                      {code: "RKS",name:"Kosovo"} ,
                      {code: "BWA",name:"Botswana"} ,
                      // {code: "MSZ",name:""} ,
                      {code: "MMR",name:"Myanmar (Burma)"} ,
                      {code: "SLE",name:"Sierra Leone"} ,
                      {code: "BDI",name:"Burundi"} ,
                      {code: "MWI",name:"Malawi"}, 
                      {code: "STP",name:"São Tomé and Príncipe"} ,
                      {code: "ESH",name:"Western Sahara"},
                      {code: "SSD",name:"South Sudan"}, 
                      {code: "YEM",name:"Yemen"} ,
                      {code: "LSO",name:"Lesotho"} ,
                      {code: "TJK",name:"Tajikistan"} ,
                      {code: "COM",name:"Comoros"} ,
                      {code: "ALB",name:"Albania"},
                      {code: "AND",name:"Andorra"} ,
                      {code: "AFG", name:"Afghanistan"},
                      {code: "DZA", name:"Algeria"} , 
                      {code: "ARG",name:"Argentina"} ,
                      {code: "ATG",name:"Antigua and Barbuda"} ,
                      {code: "ARM",name:"Armenia"} ,
                      {code: "AGO",name:"Angola"} ,
                      {code: "AUS",name:"Australia"} ,
                      {code: "AZE",name:"Azerbaijan"} ,
                      {code: "AUT",name:"Austria"} ,
                      {code: "BHS",name:"Bahamas"} ,
                      {code: "BGD",name:"Bahamas"} ,
                      {code: "BHR",name:"Bahrain"} ,
                      {code: "BRB",name:"Barbados"} ,
                      {code: "BEN",name:"Benin"} ,
                      {code: "BTN",name:"Bhutan"} ,
                      {code: "BLR",name:"Belarus"} ,
                      {code: "BEL",name:"Belgium"} ,
                      {code: "BIH",name:"Bosnia and Herzegovina"} ,
                      {code: "BOL",name:"Bolivia"}, 
                      {code: "BRA",name:"Brazil"} ,
                      {code: "CPV",name:"Cape Verde"} ,
                      {code: "BRN",name:"Brunei"} ,
                      {code: "BFA",name:"Burkina Faso"} ,
                      {code: "BGR",name:"Bulgaria"} ,
                      {code: "CMR",name:"Cameroon"} ,
                      {code: "KHM",name:"Cambodia"} ,
                      {code: "CAN",name:"Canada"} ,
                      {code: "TCD",name:"Chad"} ,
                      {code: "CHN",name:"China"} ,
                      {code: "CAF",name:"Central African Republic"} ,
                      {code: "CHL",name:"Chile"} ,
                      {code: "COL",name:"Colombia"} ,
                      {code: "COD",name:"Democratic Republic of the Congo"} ,
                      {code: "COG",name:"Republic of the Congo"} ,
                      {code: "CRI",name:"Costa Rica"} ,
                      {code: "CIV",name:"Côte d'Ivoire"} ,
                      // {code: "DPS",name:""} ,
                      {code: "HRV",name:"Croatia"} ,
                      {code: "CUB",name:"Cuba"} ,
                      {code: "CZE",name:"Czechia"} ,
                      {code: "CYP",name:"Cyprus"} ,
                      {code: "DNK",name:"Denmark"} ,
                      {code: "DOM",name:"Dominican Republic"} ,
                      {code: "EGY",name:"Egypt"} ,
                      {code: "DJI",name:"Djibouti"},
                      {code: "ECU",name:"Ecuador"} ,
                      {code: "ERI",name:"Eritrea"} ,
                      {code: "GNQ",name:"Equatorial Guinea"} ,
                      {code: "SLV",name:"El Salvador"} ,
                      {code: "SWZ",name:"Eswatini"} ,
                      {code: "FJI",name:"Fiji"} ,
                      {code: "EST",name:"Estonia"}, 
                      {code: "ETH",name:"Ethiopia"} ,
                      {code: "FIN",name:"Finland"} ,
                      {code: "GAB",name:"Gabon"} ,
                      {code: "FRA",name:"France"} ,
                      {code: "GMB",name:"The Gambia"} ,
                      {code: "DEU",name:"Germany"} ,
                      {code: "GEO",name:"Georgia"} ,
                      {code: "GHA",name:"Ghana"} ,
                      {code: "GUY",name:"Guyana"} ,
                      {code: "GRC",name:"Greece"} ,
                      {code: "GIN",name:"Guinea"} ,
                      {code: "GTM",name:"Guatemala"} ,
                      // {code: "VAT",name:""} ,
                      {code: "HUN",name:"Hungary"} ,
                      {code: "HTI",name:"Haiti"} ,
                      {code: "HND",name:"Honduras"} ,
                      {code: "ISL",name:"Iceland"} ,
                      {code: "IDN",name:"Indonesia"} ,
                      {code: "IND",name:"India"} ,
                      {code: "IRN",name:"Iran"} ,
                      {code: "IRL",name:"Ireland"} ,
                      {code: "IRQ",name:"Iraq"} ,
                      {code: "ISR",name:"Israel"} ,
                      {code: "JOR",name:"Jordan"} ,
                      {code: "ITA",name:"Italy"} ,
                      {code: "JPN",name:"Japan"} ,
                      {code: "JAM",name:"Jamaica"}
    ];
    for(var i=0; i < data.length; i++) {
        var filterData = countries.filter(a=>  (a.code.toUpperCase() == data[i]) ? a.name : null );
          if(filterData.length > 0) {
          this.data.push({code:filterData[0].code,name:filterData[0].name} );
        }
    }
    return of(this.data); //Observalabe not able to subscribe the array of data so using "of"
  }
}

