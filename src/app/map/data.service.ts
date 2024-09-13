import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'lodash';
import { TourDataProcessingOptions } from './tour-data-processing-options';
import { ProcessedTourData } from './processed-tour-data';
import { DynamicMarkerGeneratorService } from './dynamic-marker-generator.service';
import { ProcessedVehicleData } from './processed-vehicle-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class MapDataService {
  private _getTourDataUrl = 'Tour/GetTourData';
  private _getTourDataCompletionUrl = 'Tour/GetTourCompletionData';
  private _getVehiclePositionDataUrl = 'Tour/GetVehicleData';
  private _exportUserTrackingCSVUrl = 'Tour/ExportUserTrackingCSV';
  private _setManualTPCompletionUrl = 'Tour/SetManualTrackingData';

  constructor(public http: HttpClient,
              public dynMarkerGenService: DynamicMarkerGeneratorService) {
  }

  public getUTCSVFromServer(filterDateFrom: any, filterDateTo: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('filterFrom', moment(filterDateFrom).format('YYYY-MM-DDThh:mm:ss'));
    params = params.append('filterTo', moment(filterDateTo).format('YYYY-MM-DDThh:mm:ss'));
    return this.http.get(this._exportUserTrackingCSVUrl, {params});
  }

  public getTourData(filterDate: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('filterDate', moment(filterDate).format('YYYY-MM-DDThh:mm:ss'));
    return this.http.get(this._getTourDataUrl, {params});
  }

  public getVeichleData(filterDate: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('filterDate', moment(filterDate).format('YYYY-MM-DDThh:mm:ss'));
    return this.http.get(this._getVehiclePositionDataUrl, {params});
  }

  public getTourCompletionData(): Observable<any> {
    return this.http.get(this._getTourDataCompletionUrl);
  }

  public setManualTPCompletion(TourStartLocalTime: Date, TimestampLocalTime: Date,
                               Device: string, Latitude: number, Longitude: number): Observable<any> {
    return this.http.post(this._setManualTPCompletionUrl, {
      TourStartLocalTime,
      TimestampLocalTime,
      Device,
      Latitude,
      Longitude
    });
  }

  public processTourData(tourData: any[], processingOptions: TourDataProcessingOptions): ProcessedTourData {
    let tmpDispTourPolyLines: any[] = [];
    let tmpDispTourPoints: any[] = [];

    let tourPointGlobalIdx: number = 0;

    tourData.forEach((td) => {
      this.sortTourPoints(td.TourPoints);
      let polyLines = [];
      let tourPoints = [];

      for (let i = 0; i < td.TourPoints.length; i++) {
        let tp = td.TourPoints[i];
        if (i !== td.TourPoints.length - 1) {
          polyLines.push(tp.MapPoints);
        }

        tp['tourPointGlobIdx'] = tourPointGlobalIdx++;
        tourPoints.push({
          tourID: td.ID,
          tourPointGlobIdx: tp['tourPointGlobIdx'],
          order: tp.Order,
          tourColor: td.TourColor,
          selected: false,
          title: tp.Code + ' ' + tp.Name + '\n' + tp.Addr + '\n' + 'Megrendelés: ' + tp.OrdNum,
          code: tp.Code,
          name: tp.Name,
          address: tp.Addr,
          ordNum: tp.OrdNum,
          arriveTime: tp.ArrTime,
          serviceTime: tp.ServTime,
          departureTime: tp.DepTime,
          predictedArriveTime: undefined,
          predictedServiceTime: undefined,
          predictedDepartureTime: undefined,
          realArriveTime: undefined,
          realServiceTime: undefined,
          realDepartureTime: undefined,
          truckRegNo: td.TruckRegNo,
          isCompleted: tp.Completed,
          isUncertain: tp.Uncertain,
          isUnderCompletion: tp.UnderCompletion,
          startPoint: JSON.parse(tp.Position),
          type: tp.Type,
          visible: true,
          isEverVisible: tp.IsEverVisible,
          iconUrl: tp.Type === 'WHS' ?
            processingOptions.defaultTourPointWHSMarkerUrl :
            tp.Completed ?
              this.dynMarkerGenService.generateMarkerCompletedBase64(td.TourColor) :
              this.dynMarkerGenService.generateMarkerBase64(td.TourColor),
          infoWindowVisible: false,
          zIndex: undefined,
          previousZIndex: undefined,
        });
      }

      let polyLineDescriptors = [];
      polyLines.forEach((pl) => {
        polyLineDescriptors.push({
          tourID: td.ID,
          polyLinePoints: pl,
          lineColor: td.TourColor,
          lineWidth: processingOptions.defaultPolyLineWidth,
          lineOpacity: processingOptions.defaultPolyLineOpacity,
          visible: true,
          previousZIndex: undefined,
          zIndex: undefined,
          startTime: td.Start,
          endTime: td.End,
          tourLength: td.TourLength,
          truckRegNo: td.TruckRegNo,
          infoWindow: {
            toShow: false,
            latitude: 0,
            longitude: 0,
            isOpen: false
          }
        });
      });

      tmpDispTourPolyLines = tmpDispTourPolyLines.concat(polyLineDescriptors);
      tmpDispTourPoints = tmpDispTourPoints.concat(tourPoints);
    });

    let retProcessedData = new ProcessedTourData();
    retProcessedData.tourList = tourData;
    retProcessedData.tourPolyLines = tmpDispTourPolyLines;
    retProcessedData.tourPoints = tmpDispTourPoints;

    return retProcessedData;
  }

  public processTourCompletionData(rawTourCompletionData: any[],
                                   processingOptions: TourDataProcessingOptions): any[] {
    let tourCompletionData: any[] = [];

    rawTourCompletionData.forEach((td) => {
      let tourPoints = [];
      td.TourPoints.forEach((tp) => {
        tourPoints.push({
          tourID: td.ID,
          tourColor: td.TourColor,
          arriveTime: tp.ArrTime,
          serviceTime: tp.ServTime,
          departureTime: tp.DepTime,
          predictedArriveTime: tp.PredictedArrTime,
          predictedServiceTime: tp.PredictedServTime,
          predictedDepartureTime: tp.PredictedDepTime,
          realArriveTime: tp.RealArrTime,
          realServiceTime: tp.RealServTime,
          realDepartureTime: tp.RealDepTime,
          truckRegNo: td.TruckRegNo,
          order: tp.Order,
          isCompleted: tp.Completed,
          isUncertain: tp.Uncertain,
          isUnderCompletion: tp.UnderCompletion,
          isDelayed: tp.IsDelayed,
          type: tp.Type,
          iconUrl: tp.Type === 'WHS' ?
            processingOptions.defaultTourPointWHSMarkerUrl :
            this.dynMarkerGenService.generateMarkerBase64(td.TourColor),
        });
      });
      tourCompletionData.push({
        tourID: td.ID,
        tourColor: td.TourColor,
        tourPoints
      });
    });

    return tourCompletionData;
  }

  public processVehicleData(rawVehiclePosData): ProcessedVehicleData {
    let processedData = new ProcessedVehicleData();
    let vehicleList = [];
    if (rawVehiclePosData) {
      rawVehiclePosData.forEach((vd) => {
        vehicleList.push({
          device: vd.device,
          time: vd.time,
          latitude: vd.latitude,
          longitude: vd.longitude,
          direction: vd.direction,
          ignition: vd.ignition,
          speed: vd.speed,
          odometer: vd.odometer,
          iconUrl: this.dynMarkerGenService.generateVehicleMarkerBase64('#0000ee'),
          zIndex: 0,
          isDelayed: vd.isDelayed,
          delay: vd.delay,
          distance: vd.distance,
          previousTPCompletion: vd.previousTPCompletion,
          predictedNextTPCompletion: vd.predictedNextTPCompletion,
          visible: true
        });
      });
    }

    processedData.vehicles = vehicleList;
    return processedData;
  }

  /**
   * Extract raw data for tour tracking grid.
   * @param {any[]} tourData to be processed
   * @returns {any[]} tour data subset for grid
   */
  public extractTourTrackingRawGridData(tourData: any[]): any[] {
    let dataForGrid: any[] = [];
    let idx = 0;
    tourData.forEach((td) => {
      dataForGrid.push({
        tourID: td.ID,
        visible: true,
        truckRegNo: td.TruckRegNo,
        tourColor: td.TourColor,
        tourStart: td.Start,
        tourEnd: td.End,
        tourLength: td.TourLength
      });
    });
    return dataForGrid;
  }

  /**
   * Extract tour point tracking raw data to feed tour point tracking grid.
   * @param {any[]} tourPointsData tour point data for a given tour
   * @returns {any[]} grid data transformed from general tour point data
   */
  public extractTourPointTrackingRawGridData(tourPointsData: any[]): any[] {
    let dataForGrid: any[] = [];
    let idx: number = 0;
    tourPointsData.forEach((tp) => {
      if (tp.IsEverVisible) {
        dataForGrid.push({
          tourID: tp.TourID,
          isDelayed: tp.IsDelayed,
          isCompleted: tp.Completed,
          delay: tp.delay,
          visible: true,
          tourPointIdx: idx++,
          tourPointGlobIdx: tp.tourPointGlobIdx,
          tourPointName: tp.Code + ' ' + tp.Name,
          arriveTime: tp.ArrTime,
          serviceTime: tp.ServTime,
          departureTime: tp.DepTime
        });
      }
    });
    return dataForGrid;
  }

  /**
   * Extract vehicle tracking raw data for tracking grid.
   * @param {any[]} vehicleTrackingData downloaded from server
   * @returns {any[]} grid data transformed from general vehicleTrackingData
   */
  public extractVehicleTrackingGridRawGridData(vehicleTrackingData: any[]): any[] {
    let dataForGrid: any[] = [];
    vehicleTrackingData.forEach((vd) => {
      dataForGrid.push({
        isDelayed: vd.isDelayed,
        delay: vd.delay,
        device: vd.device,
        time: vd.time,
        ignition: vd.ignition,
        speed: vd.speed,
        odometer: vd.odometer,
        distance: vd.distance,
        previousTPCompletion: vd.previousTPCompletion,
        predictedNextTPCompletion: vd.predictedNextTPCompletion,
        visible: true
      });
    });
    return dataForGrid;
  }

  /**
   * Sort tour point list by tourPoint.Order property.
   * @param {any[]} tourPoints to sort in-place
   */
  private sortTourPoints(tourPoints: any[]) {
    tourPoints.sort((a: any, b: any): number => {
      return a.Order - b.Order;
    });
  }
}
