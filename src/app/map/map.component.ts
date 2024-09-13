import {
  Component,
  OnInit,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/Rx';

import { AgmMap, LatLngBounds, PolyMouseEvent } from '@agm/core';

import { MapDataService } from './data.service';
import { DynamicMarkerGeneratorService } from './dynamic-marker-generator.service';

import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import {
  GridDataResult, RowArgs, RowClassArgs,
  SelectionEvent
} from '@progress/kendo-angular-grid';

import * as FileSaver from 'file-saver';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { TourDataProcessingOptions } from './tour-data-processing-options';
import { process, State } from '@progress/kendo-data-query';
import { AuthService } from '../_auth/auth.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers';
import { HttpParams } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'map',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .k-grid tr.isDelayed {
      background-color: #ffeeee;
    }

    .k-grid tr.isCompleted {
      background-color: #eeffee;
    }

    .k-grid tr.isUncertain {
      background-color: #faffa4;
    }

    .k-grid tr.isUnderCompletion {
      background-color: #67b2ff;
    }
  `],
  templateUrl: './map.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class MapComponent implements OnInit {
  public DISP_POLYLINE_FOCUS_WIDTH: number = 9;
  public DISP_POLYLINE_BASE_WIDTH: number = 6;
  public DISP_POLYLINE_BASE_OPACITY: number = 0.4;
  public DISP_POLYLINE_FOCUS_OPACITY: number = 1.0;
  public DISP_POLYLINE_BASE_Z_INDEX: number = 10;
  public DISP_POLYLINE_FOCUS_Z_INDEX: number = 1000;

  public DISP_TOUR_POINT_ICON_URL: string = 'assets/img/base-marker-1.svg';
  public DISP_TOUR_POINT_WHS_ICON_URL: string = 'assets/img/industries.png';
  public DISP_TOUR_POINT_WHS_SELECTED_ICON_URL: string = 'assets/img/industries_selected.png';

  public DISP_MARKER_GRID_BUTTON_BASE_TOP: string = '115px';
  public DISP_MARKER_GRID_BUTTON_TOP: string = '435px';
  public DISP_MARKER_GRID_CONTAINER_BASE_TOP: string = '115px';
  public DISP_MARKER_GRID_CONTAINER_TOP: string = '435px';

  public DISP_MARKER_BASE_Z_INDEX: number = 11;
  public DISP_MARKER_FOCUS_Z_INDEX: number = 1001;

  public tourDateFilter: Date = new Date(Date.now());

  public utcExportDateFrom: Date = new Date(Date.now());
  public utcExportDateTo: Date = new Date(Date.now());

  @ViewChild(AgmMap) public agmMap: AgmMap;

  public mapUsePanning: boolean = false;
  public tourList: any[] = [];
  public dispTourPolylines: any[] = [];
  public dispTourPoints: any[] = [];
  public localState: any;
  public dispMapCenterLat = 47.4984;
  public dispMapCenterLng = 19.0408;

  public visibilityOfAllTours: boolean = true;
  public visibilityOfAllTourPoints: boolean = true;
  public visibilityOfAllVehicles: boolean = true;

  public utcExportModalOpened: boolean = false;

  public mapLatLngBounds: LatLngBounds;
  public manualCompletionDate: Date;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: {warning: true, error: false},
      positionClass: 'toast-bottom-center'
    });

  public tourTrackingGridState: State = {
    skip: 0,
    take: 2048
  };

  public tourPointTrackingGridState: State = {
    skip: 0,
    take: 2048
  };

  public vehicleTrackingGridState: State = {
    skip: 0,
    take: 2048
  };

  public tourTrackingGridSelection: any = [];
  public tourPointTrackingGridSelection: any = [];
  public tourTrackingGridVisible: boolean = false;
  public tourTrackingGridButtonVisible: boolean = true;
  public tourTrackingParameterContainerVisible: boolean = false;
  public markerGridButtonTop: string = this.DISP_MARKER_GRID_BUTTON_BASE_TOP;
  public markerGridContainerTop: string = this.DISP_MARKER_GRID_BUTTON_BASE_TOP;
  public markerGridButtonVisible: boolean = true;
  public markerGridVisible: boolean = false;
  public selectedTourID: number;
  public selectedTourPointIdx: number;

  public tourTrackingGridData: GridDataResult;
  public tourTrackingRawGridData: any[] = [];
  public tourGridPageSize: number = 2048;
  public tourGridPageSkip: number = 0;

  public vehicleTrackingGridData: GridDataResult;
  public vehicleTrackingRawGridData: any[] = [];
  public vehicleTrackingGridSelection: any[] = [];

  public tourPointTrackingGridData: GridDataResult;
  public tourPointTrackingRawGridData: any[] = [];
  public tourPointGridPageSize: number = 2048;
  public tourPointGridPageSkip: number = 0;

  public vehicleList: any[];
  public vehicleGridPageSize: number = 2048;
  public vehicleGridPageSkip: number = 0;

  private _getTourDataCompletionPollInterval: number = 30000;
  private _getVehicleDataPollInterval: number = 30000;

  public mapResetTrackingButtonDisabled: boolean = false;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public http: Http,
              public authService: AuthService,
              public mapDataService: MapDataService,
              public dynMarkerGenService: DynamicMarkerGeneratorService,
              public toasterService: ToasterService) {
    this.manualCompletionDate = new Date();
  }

  public navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  public ngOnInit() {
    this.route.data.subscribe((data: any) => {
      /**
       * Your resolved data from route.
       */
      this.localState = data.yourData;
    });

    // for now, use mock data for testing
    // ======================== MOCK DATA ========================
    // console.log('Using mock map data...');
    // let processedTourData = this.mapDataService.processTourData(MockMapData,
    // tourDataProcessingOpts);
    //
    // this.dispTourPolylines = processedTourData.tourPolyLines;
    // this.dispTourPoints = processedTourData.tourPoints;
    // this.tourList = processedTourData.tourList;
    //
    // // use mock data for faster development
    // this.tourTrackingRawGridData = this
    // .mapDataService.extractTourTrackingRawGridData(MockMapData);
    // this.loadTourTrackingRawGridData();
    // ===========================================================

    // ======================== REAL DATA ========================
    this.loadTourData();
    this.loadVehicleData();
    // ===========================================================

    // Instantly get tracking data
    this.mapDataService.getTourCompletionData()
      .subscribe((rawTourCompletionData: any) => {
        this.authService.resetAutoLogoutCountdown();
        this.processTourCompletionData(rawTourCompletionData);
      });

    this.mapDataService.getVeichleData(this.tourDateFilter)
      .subscribe((rawVehicleData: any) => {
        console.log('Periodic GetVehicleData: ', rawVehicleData);
        this.authService.resetAutoLogoutCountdown();
        this.processVehicleTrackingLiveData(rawVehicleData);
      });
    // Set periodic tracking data updates
    Observable
      .interval(this._getTourDataCompletionPollInterval)
      .switchMap(() => this.mapDataService.getTourCompletionData())
      .subscribe((rawTourCompletionData: any) => {
        this.authService.resetAutoLogoutCountdown();
        this.processTourCompletionData(rawTourCompletionData);
      });

    Observable
      .interval(this._getVehicleDataPollInterval)
      .switchMap(() => this.mapDataService.getVeichleData(this.tourDateFilter))
      .subscribe((rawVehicleData: any) => {
        this.authService.resetAutoLogoutCountdown();
        this.processVehicleTrackingLiveData(rawVehicleData);
      });
  }

  public polyLineMouseClickHandler(e: PolyMouseEvent, polyLineIndex: number) {
    let selectedPolyLine = this.dispTourPolylines[polyLineIndex];
    let selectedTourID = selectedPolyLine.tourID;

    if (this.selectedTourID !== selectedTourID) {
      this.setTourFocusState(this.selectedTourID, false);
      this.setTourInfoWindowState(this.selectedTourID, false);
    }

    this.tourTrackingGridSelection.pop();
    this.tourTrackingGridSelection.push('' + selectedTourID);

    this.dispTourPolylines[polyLineIndex].infoWindow.latitude = e.latLng.lat();
    this.dispTourPolylines[polyLineIndex].infoWindow.longitude = e.latLng.lng();
    this.dispTourPolylines[polyLineIndex].infoWindow.toShow = true;
    this.dispTourPolylines[polyLineIndex].infoWindow.isOpen = true;

    this.selectedTourID = selectedTourID;
    this.setTourFocusState(this.selectedTourID, true);
    this.tourTrackingGridState.filter = {
      logic: 'and',
      filters: [{field: 'tourID', operator: 'equals', value: '' + this.selectedTourID}]
    };
    this.tourTrackingGridDataStateChange(this.tourTrackingGridState);
  }

  public submitManualTPCompletion(tpInfo) {
    const tour = this.tourList.find(t => t.ID === tpInfo.tourID);
    const tourStartLocalTime = tour.Start;
    const completionTimestamp = this.manualCompletionDate; // TODO
    this.mapDataService.setManualTPCompletion(tourStartLocalTime, completionTimestamp,
      tpInfo.truckRegNo, tpInfo.startPoint.Lat, tpInfo.startPoint.Lng).subscribe((r) => {
      console.log(r);
    });
  }

  public setManualCompletionDate(event) {
    const now = new Date();
    if (event.value > now) {
      this.manualCompletionDate = now;
    } else {
      this.manualCompletionDate = event.value;
    }
  }

  public setManualCompletionTime(event) {
    const now = new Date();
    if (event > now) {
      this.manualCompletionDate = now;
    } else {
      this.manualCompletionDate = event;
    }
  }

  public tourTrackingGridRemoveFilter(): void {
    this.tourTrackingGridState.filter = undefined;
    this.tourTrackingGridDataStateChange(this.tourTrackingGridState);
  }

  public tourPointTrackingGridRemoveFilter(): void {
    this.tourPointTrackingGridState.filter = undefined;
    this.tourPointTrackingGridDataStateChange(this.tourPointTrackingGridState);
  }

  public tourTrackingGridSelectionChange(e: SelectionEvent) {
    if (e.deselectedRows.length > 0) {
      let deselectedTourID = e.deselectedRows[0].dataItem.tourID;
      if (deselectedTourID) {
        this.setTourFocusState(deselectedTourID, false);
        this.deselectTourPointByTourID(deselectedTourID);
        this.tourPointTrackingGridSelection.pop();
        this.selectedTourID = undefined;
      }
      this.tourTrackingGridSelection.pop();
    }

    if (e.selectedRows.length > 0) {
      if (!e.selectedRows[0].dataItem.visible) {
        return;
      }

      let selectedTourID = e.selectedRows[0].dataItem.tourID;
      this.selectedTourID = selectedTourID;
      this.setTourFocusState(selectedTourID, true);
      this.tourTrackingGridSelection.push('' + selectedTourID);

      let selectedTourData = this.tourList.filter((t) => t.ID === selectedTourID)[0];
      this.tourPointTrackingRawGridData = this.mapDataService
        .extractTourPointTrackingRawGridData(selectedTourData.TourPoints);
      this.loadTourPointTrackingRawGridData();

      this.setBoundsToTour(selectedTourData);
    }
  }

  public tourPointTrackingGridSelectionChange(e: SelectionEvent) {
    if (e.deselectedRows.length > 0) {
      let deselectedTourPointGridIdx = e.deselectedRows[0].dataItem.tourPointGlobIdx;
      let deselectedTourID = e.deselectedRows[0].dataItem.tourID;

      let deselectedTourData = this.tourList.filter((t) => t.ID === ('' + deselectedTourID))[0];
      let deselectedTourPointData = deselectedTourData.TourPoints.find(
        (tp) => tp.tourPointGlobIdx === deselectedTourPointGridIdx);

      let deselectedDispTourPoint = this.dispTourPoints.filter((tp) =>
        tp.tourPointGlobIdx === (deselectedTourPointData.tourPointGlobIdx))[0];

      if (deselectedDispTourPoint) {
        this.setTourPointSelected(deselectedDispTourPoint, false);
        deselectedDispTourPoint.zIndex = deselectedDispTourPoint.previousZIndex;
      }
      this.tourPointTrackingGridSelection.pop();
    }

    if (e.selectedRows.length > 0) {
      if (!e.selectedRows[0].dataItem.visible) {
        return;
      }

      let selectedTourPointGridIdx = e.selectedRows[0].dataItem.tourPointGlobIdx;
      let selectedTourID = e.selectedRows[0].dataItem.tourID;
      this.tourPointTrackingGridSelection.pop();
      this.tourPointTrackingGridSelection.push(selectedTourPointGridIdx);

      let selectedTourData = this.tourList.filter((t) => t.ID === ('' + selectedTourID))[0];
      let selectedTourPointData = selectedTourData.TourPoints.find(
        (tp) => tp.tourPointGlobIdx === selectedTourPointGridIdx);

      let selectedDispTourPoint = this.dispTourPoints.filter((tp) =>
        tp.tourPointGlobIdx === (selectedTourPointData.tourPointGlobIdx))[0];

      this.setTourPointSelected(selectedDispTourPoint, true);

      selectedDispTourPoint.previousZIndex = selectedDispTourPoint.zIndex;
      selectedDispTourPoint.zIndex = this.DISP_MARKER_FOCUS_Z_INDEX;

      this.setBoundsToTour(selectedTourData);
      let tourPointPos = JSON.parse(selectedTourPointData.Position);
      this.setMapCenter(tourPointPos.Lat, tourPointPos.Lng);
      this.selectedTourPointIdx = selectedDispTourPoint.tourPointGlobIdx;
    }
  }

  public vehicleTrackingGridSelectionChange(e: SelectionEvent) {
    if (e.deselectedRows.length > 0) {
      let deselectedVehicleDeviceId = e.deselectedRows[0].dataItem.device;
      let deselectedVehicleData = this.vehicleList.filter(
        (v) => v.device === (deselectedVehicleDeviceId))[0];
      this.setVehicleSelected(deselectedVehicleData, false);
      this.vehicleTrackingGridSelection.pop();
    }

    if (e.selectedRows.length > 0) {
      if (!e.selectedRows[0].dataItem.visible) {
        return;
      }
      let selectedVehicleDeviceId = e.selectedRows[0].dataItem.device;
      // let selectedTourID = e.selectedRows[0].dataItem.tourID;
      // this.tourPointTrackingGridSelection.pop();
      this.vehicleTrackingGridSelection.push(selectedVehicleDeviceId);

      let selectedVehicleData = this.vehicleList.filter((v) =>
        v.device === (selectedVehicleDeviceId))[0];
      this.setVehicleSelected(selectedVehicleData, true);

      // TODO cicca, errefele meg munka van

      // selectedDispTourPoint.previousZIndex = selectedDispTourPoint.zIndex;
      // selectedDispTourPoint.zIndex = this.DISP_MARKER_FOCUS_Z_INDEX;
      //
      // this.setBoundsToTour(selectedTourData);
      // let tourPointPos = JSON.parse(selectedTourPointData.Position);
      // this.setMapCenter(tourPointPos.Lat, tourPointPos.Lng);
      // this.selectedTourPointIdx = selectedDispTourPoint.tourPointGlobIdx;
    }
  }

  public tourTrackingDateFilterChanged(e: any) {
    this.tourDateFilter = e.value;
    this.loadTourData();
    this.loadVehicleData();
    // TODO uncomment if needed by user request
    // let todaysDate = new Date(Date.now());
    // if (this.tourDateFilter.getFullYear() === todaysDate.getFullYear()
    //   && this.tourDateFilter.getMonth() === todaysDate.getMonth()
    //   && this.tourDateFilter.getDay() === todaysDate.getDay()) {
    //   this.loadVehicleData();
    // } else {
    //   this.clearVehicleData();
    // }
  }

  public utcExportDateFromChanged(e: any) {
    this.utcExportDateFrom = e.value;
  }

  public utcExportDateToChanged(e: any) {
    this.utcExportDateTo = e.value;
  }

  public tourPointMarkerClickHandler(e: any, tourPointMarker: any) {
    tourPointMarker.infoWindowVisible = !tourPointMarker.infoWindowVisible;

    if (this.selectedTourPointIdx) {
      if (this.selectedTourPointIdx !== tourPointMarker.tourPointGlobIdx) {
        let tpToDeselect = this.dispTourPoints.find(
          (tp) => tp.tourPointGlobIdx === this.selectedTourPointIdx);
        tpToDeselect.selected = false;
        tpToDeselect.zIndex = tpToDeselect.previousZIndex;
        tpToDeselect.infoWindowVisible = false;
        this.setTourPointSelected(tpToDeselect, false);
      }
    }

    this.tourPointTrackingGridSelection.pop();
    this.tourPointTrackingGridSelection.push(tourPointMarker.tourPointGlobIdx);

    tourPointMarker.selected = true;
    tourPointMarker.zIndex = this.DISP_MARKER_FOCUS_Z_INDEX;
    this.setTourPointSelected(tourPointMarker, true);
    this.selectedTourPointIdx = tourPointMarker.tourPointGlobIdx;

    this.tourPointTrackingGridState.filter = {
      logic: 'and',
      filters: [{field: 'tourPointGlobIdx', operator: 'equals', value: this.selectedTourPointIdx}]
    };
    this.tourPointTrackingGridDataStateChange(this.tourPointTrackingGridState);
  }

  public vehicleMarkerClickHandler(e: any, vehicleMarker: any) {
    // TODO
    console.log('vehicleMarkerClickHandler');
    // tourPointMarker.infoWindowVisible = !tourPointMarker.infoWindowVisible;
    //
    // if (this.selectedTourPointIdx) {
    //   if (this.selectedTourPointIdx !== tourPointMarker.tourPointGlobIdx) {
    //     let tpToDeselect = this.dispTourPoints.find(
    //       (tp) => tp.tourPointGlobIdx === this.selectedTourPointIdx);
    //     tpToDeselect.selected = false;
    //     tpToDeselect.zIndex = tpToDeselect.previousZIndex;
    //     tpToDeselect.infoWindowVisible = false;
    //     this.setTourPointSelected(tpToDeselect, false);
    //   }
    // }
    //
    // this.tourPointTrackingGridSelection.pop();
    // this.tourPointTrackingGridSelection.push(tourPointMarker.tourPointGlobIdx);
    //
    // tourPointMarker.selected = true;
    // tourPointMarker.zIndex = this.DISP_MARKER_FOCUS_Z_INDEX;
    // this.setTourPointSelected(tourPointMarker, true);
    // this.selectedTourPointIdx = tourPointMarker.tourPointGlobIdx;
  }

  public isTourTrackingGridRowSelected = (e: RowArgs) =>
    this.tourTrackingGridSelection.indexOf(e.dataItem.tourID) >= 0;

  public isTourPointTrackingGridRowSelected = (e: RowArgs) =>
    this.tourPointTrackingGridSelection.indexOf(e.dataItem.tourPointGlobIdx) >= 0;

  public isVehicleTrackingGridRowSelected = (e: RowArgs) =>
    this.vehicleTrackingGridSelection.indexOf(e.dataItem.device) >= 0;

  public setVisibilityOfTourPointsForTour(tourID: string, isVisible: boolean) {
    this.dispTourPoints.forEach((tp) => {
      if (tp.tourID === tourID) {
        tp.visible = isVisible;
      }
    });

    this.tourPointTrackingRawGridData.forEach((tp) => {
      if (tp.tourID === tourID) {
        tp.visible = isVisible;
      }
    });
  }

  public toggleVisibilityOfAllTours(): void {
    this.visibilityOfAllTours = !this.visibilityOfAllTours;
    this.setVisibilityOfAllTours(this.visibilityOfAllTours);
  }

  public toggleVisibilityOfAllTourPoints(tourID: string): void {
    this.visibilityOfAllTourPoints = !this.visibilityOfAllTourPoints;
    this.setVisibilityOfTourPointsForTour(tourID, this.visibilityOfAllTourPoints);
  }

  public toggleVisibilityOfAllVehicles(): void {
    this.visibilityOfAllVehicles = !this.visibilityOfAllVehicles;
    this.setVisibilityOfVehicles(this.visibilityOfAllVehicles);
  }

  public setVisibilityOfAllTours(isVisible: boolean) {
    this.dispTourPolylines.forEach((pl) => {
      pl.visible = isVisible;
    });

    this.tourTrackingRawGridData.forEach((t) => {
      t.visible = isVisible;
    });

    this.dispTourPoints.forEach((tp) => {
      tp.visible = isVisible;
    });

    this.tourPointTrackingRawGridData.forEach((tp) => {
      tp.visible = isVisible;
    });
  }

  public setVisibilityOfVehicles(isVisible: boolean) {
    this.vehicleList.forEach((v) => {
      v.visible = isVisible;
    });

    this.vehicleTrackingRawGridData.forEach((v) => {
      v.visible = isVisible;
    });
  }

  public toggleTourTrackingParameterContainer(): void {
    this.tourTrackingParameterContainerVisible = !this.tourTrackingParameterContainerVisible;
  }

  public toggleTourVisibility(e: any, dataItem: any): void {
    dataItem.visible = !dataItem.visible;
    this.dispTourPolylines.forEach((pl) => {
      if (pl.tourID === dataItem.tourID) {
        pl.visible = dataItem.visible;
      }
    });

    this.dispTourPoints.forEach((tp) => {
      if (tp.tourID === dataItem.tourID) {
        tp.visible = dataItem.visible;
      }
    });
  }

  public toggleTourPointVisibility(e: Event, dataItem: any): void {
    dataItem.visible = !dataItem.visible;
    let tp = this.dispTourPoints.find(
      (v) => v.tourPointGlobIdx === dataItem.tourPointGlobIdx);
    tp.visible = dataItem.visible;
  }

  public toggleVehicleVisibility(e: Event, dataItem: any): void {
    dataItem.visible = !dataItem.visible;
    let v = this.vehicleList.find((v) => v.device === dataItem.device);
    v.visible = dataItem.visible;
  }

  public closeTourTrackingGrid() {
    this.tourTrackingGridVisible = false;
    this.tourTrackingGridButtonVisible = true;
    this.setMarkerControlsPositions(this.tourTrackingGridVisible);
  }

  public closeMarkerGrid() {
    this.markerGridVisible = false;
    this.markerGridButtonVisible = true;
  }

  public toggleTourTrackingGrid() {
    this.tourTrackingGridVisible = !this.tourTrackingGridVisible;
    this.tourTrackingGridButtonVisible = !this.tourTrackingGridButtonVisible;
    this.setMarkerControlsPositions(this.tourTrackingGridVisible);
  }

  public toggleMarkerGridVisible() {
    this.markerGridVisible = !this.markerGridVisible;
    this.markerGridButtonVisible = !this.markerGridButtonVisible;
  }

  public resetTracking(): void {
    this.mapResetTrackingButtonDisabled = true;
    let t1: Toast = {
      type: 'warning',
      title: 'Figyelmeztetés!',
      body: 'Követés újraindítás folyamatban, ami eltarthat pár percig.',
      showCloseButton: false
    };
    let t2: Toast = {
      type: 'warning',
      title: 'Figyelmeztetés!',
      body: 'A redszer most automatikusan kilépteti...',
      showCloseButton: false
    };
    this.toasterService.pop(t1);
    setTimeout(() => {
      this.toasterService.pop(t2);
      this.authService.logoutWithPreNavigation();
    }, 3500);
    this.http.get('Tour/ReinitializeTourTracking').subscribe((res) => {
      console.log('Tour/ReinitializeTourTracking call completed.');
    });
  }

  public mapBoundsChanged(e: any) {
    console.log('mapBoundsChanged: ', e);
  }

  public tourTrackingGridDataStateChange(state: any): void {
    this.tourTrackingGridState = state;
    this.tourTrackingGridData = process(this.tourTrackingRawGridData, this.tourTrackingGridState);
  }

  public tourPointTrackingGridDataStateChange(state: any): void {
    this.tourPointTrackingGridState = state;
    this.tourPointTrackingGridData = process(this.tourPointTrackingRawGridData,
      this.tourPointTrackingGridState);
  }

  public vehicleTrackingGridDataStateChange(state: any): void {
    this.vehicleTrackingGridState = state;
    this.vehicleTrackingGridData = process(this.vehicleTrackingRawGridData,
      this.vehicleTrackingGridState);
  }

  public openUTCExportVModal(sidenav): void {
    sidenav.close();
    this.utcExportModalOpened = true;
  }

  public closeUTCExportVModal(status): void {
    console.log(`Dialog result: ${status}`);
    if (status === 'yes') {
      this.mapDataService.getUTCSVFromServer(this.utcExportDateFrom, this.utcExportDateTo)
        .subscribe((result) => {
          this.downloadFile(result.loginCSV);
        });
    }

    this.utcExportModalOpened = false;
  }

  public setBoundsToAllTours() {
    let tourBounds = new google.maps.LatLngBounds();
    let visibleTourIds: any[] = [];
    this.tourTrackingRawGridData.forEach((t) => {
      if (t.visible) {
        visibleTourIds.push(t.tourID);
      }
    });

    this.tourList.forEach((t) => {
      t.TourPoints.forEach((tp) => {
        if (visibleTourIds.indexOf(t.ID) > -1) {
          tp.MapPoints.forEach((mp) => {
            tourBounds.extend({
              lat: mp.Lat,
              lng: mp.Lng
            });
          });
        }
      });
    });
    this.mapLatLngBounds = tourBounds;
  }

  public vehicleTrackingGridRowCallback(context: RowClassArgs): any {
    return {
      isDelayed: context.dataItem.isDelayed
    };
  }

  public tourPointGridRowCallback(context: RowClassArgs): any {
    return {
      isDelayed: !context.dataItem.isCompleted && context.dataItem.isDelayed,
      isCompleted: context.dataItem.isCompleted,
      isUncertain: context.dataItem.isUncertain,
      isUnderCompletion: context.dataItem.isUnderCompletion
    };
  }

  private setMarkerControlsPositions(tourTrackingGridVisible: boolean): void {
    if (tourTrackingGridVisible) {
      this.markerGridButtonTop = this.DISP_MARKER_GRID_BUTTON_TOP;
      this.markerGridContainerTop = this.DISP_MARKER_GRID_CONTAINER_TOP;
    } else {
      this.markerGridButtonTop = this.DISP_MARKER_GRID_BUTTON_BASE_TOP;
      this.markerGridContainerTop = this.DISP_MARKER_GRID_CONTAINER_BASE_TOP;
    }
  }

  private deselectTourPointByTourID(deselectedTourID: string) {
    let deselectedTourPoint = this.dispTourPoints.filter(
      (tp) => tp.tourID === ('' + deselectedTourID)
        && tp.selected)[0];
    if (deselectedTourPoint) {
      this.setTourPointSelected(deselectedTourPoint, false);
      deselectedTourPoint.zIndex = deselectedTourPoint.previousZIndex;
    }
  }

  private setTourPointSelected(tourPoint: any, isSelected: boolean) {
    tourPoint.selected = isSelected;
    if (isSelected) {
      if (tourPoint.type === 'WHS') {
        tourPoint.iconUrl = this.DISP_TOUR_POINT_WHS_SELECTED_ICON_URL;
      } else if (tourPoint.isCompleted || tourPoint.isUncertain || tourPoint.isUnderCompletion) {
        tourPoint.iconUrl = this.dynMarkerGenService.generateMarkerSelectedCompletedBase64(
          tourPoint.tourColor);
      } else {
        tourPoint.iconUrl = this.dynMarkerGenService.generateMarkerSelectedBase64(
          tourPoint.tourColor);
      }
    } else {
      if (tourPoint.type === 'WHS') {
        tourPoint.iconUrl = this.DISP_TOUR_POINT_WHS_ICON_URL;
      } else {
        if (tourPoint.isCompleted || tourPoint.isUncertain || tourPoint.isUnderCompletion) {
          tourPoint.iconUrl = this.dynMarkerGenService.generateMarkerCompletedBase64(
            tourPoint.tourColor);
        } else {
          tourPoint.iconUrl = this.dynMarkerGenService.generateMarkerBase64(
            tourPoint.tourColor);
        }
      }
    }
  }

  private setVehicleSelected(selectedVehicle: any, isSelected: boolean) {
    selectedVehicle.selected = isSelected;
    if (isSelected) {
      selectedVehicle.iconUrl = this.dynMarkerGenService.generateVehicleMarkerSelectedBase64(
        '#0000ff');
    } else {
      selectedVehicle.iconUrl = this.dynMarkerGenService.generateVehicleMarkerBase64(
        '#0000ff');
    }
  }

  private setMapCenter(lat: number, lng: number) {
    this.dispMapCenterLat = lat;
    this.dispMapCenterLng = lng;
  }

  private setBoundsToTour(tourData: any) {
    let tourBounds = new google.maps.LatLngBounds();
    tourData.TourPoints.forEach((tp) => {
      tp.MapPoints.forEach((mp) => {
        tourBounds.extend({
          lat: mp.Lat,
          lng: mp.Lng
        });
      });
    });
    this.mapLatLngBounds = tourBounds;
  }

  private setTourFocusState(tourID: number, isFocused: boolean) {
    if (isFocused) {
      this.dispTourPolylines.forEach((p) => {
        if (p.tourID === tourID) {
          p.previousZIndex = this.DISP_POLYLINE_BASE_Z_INDEX;
          p.zIndex = this.DISP_POLYLINE_FOCUS_Z_INDEX;
          p.lineWidth = this.DISP_POLYLINE_FOCUS_WIDTH;
          p.lineOpacity = this.DISP_POLYLINE_FOCUS_OPACITY;
        }
      });
    } else {
      this.dispTourPolylines.forEach((p) => {
        if (p.tourID === tourID) {
          p.zIndex = this.DISP_POLYLINE_BASE_Z_INDEX;
          p.lineWidth = this.DISP_POLYLINE_BASE_WIDTH;
          p.lineOpacity = this.DISP_POLYLINE_BASE_OPACITY;
        }
      });
    }
  }

  private loadTourTrackingRawGridData(): void {
    this.tourTrackingGridData = process(this.tourTrackingRawGridData, this.tourTrackingGridState);
  }

  private loadTourPointTrackingRawGridData(): void {
    this.tourPointTrackingGridData = process(this.tourPointTrackingRawGridData,
      this.tourPointTrackingGridState);
  }

  private loadVehicleTrackingRawGridData(): void {
    this.vehicleTrackingGridData = process(this.vehicleTrackingRawGridData,
      this.vehicleTrackingGridState);
  }

  private setTourInfoWindowState(tourID: number, b: boolean): void {
    let polyLines = this.dispTourPolylines.filter((x) => x.tourID === tourID + '');
    polyLines.forEach((p) => {
      p.infoWindow.toShow = false;
      p.infoWindow.isOpen = false;
    });
  }

  private loadTourData(): void {
    this.mapDataService.getTourData(this.tourDateFilter).subscribe((rawTourData) => {
      this.processTourData(rawTourData);
      if (this.tourTrackingRawGridData.length > 0) {
        let selectedTourID = this.tourTrackingRawGridData[0].tourID;
        if (this.selectedTourID !== selectedTourID) {
          this.setTourFocusState(this.selectedTourID, false);
          this.setTourInfoWindowState(this.selectedTourID, false);
        }
        this.tourTrackingGridSelection.pop();
        this.tourTrackingGridSelection.push('' + selectedTourID);
        this.setTourFocusState(selectedTourID, true);
        this.selectedTourID = selectedTourID;

        let selectedTourData = this.tourList.filter((t) => t.ID === selectedTourID)[0];
        this.tourPointTrackingRawGridData = this.mapDataService
          .extractTourPointTrackingRawGridData(selectedTourData.TourPoints);
        this.loadTourPointTrackingRawGridData();

        this.setBoundsToTour(selectedTourData);
      }
    });
  }

  private loadVehicleData(): void {
    this.mapDataService.getVeichleData(this.tourDateFilter).subscribe((vehicleData) => {
      this.processVehicleData(vehicleData);
    });
  }

  private processTourData(rawTourData: any): void {
    let tdProcessingOpts = new TourDataProcessingOptions();
    tdProcessingOpts.defaultPolyLineWidth = this.DISP_POLYLINE_BASE_WIDTH;
    tdProcessingOpts.defaultPolyLineOpacity = this.DISP_POLYLINE_BASE_OPACITY;
    tdProcessingOpts.defaultTourPointMarkerUrl = this.DISP_TOUR_POINT_ICON_URL;
    tdProcessingOpts.defaultTourPointWHSMarkerUrl = this.DISP_TOUR_POINT_WHS_ICON_URL;

    this.tourTrackingRawGridData = this.mapDataService.extractTourTrackingRawGridData(rawTourData);
    let processedTourData = this.mapDataService.processTourData(rawTourData, tdProcessingOpts);

    this.dispTourPolylines = processedTourData.tourPolyLines;
    this.dispTourPoints = processedTourData.tourPoints;
    this.tourList = processedTourData.tourList;

    this.loadTourTrackingRawGridData();
  }

  private processTourCompletionData(rawTCData: any): void {
    let tdProcessingOpts = new TourDataProcessingOptions();
    tdProcessingOpts.defaultPolyLineWidth = this.DISP_POLYLINE_BASE_WIDTH;
    tdProcessingOpts.defaultPolyLineOpacity = this.DISP_POLYLINE_BASE_OPACITY;
    tdProcessingOpts.defaultTourPointMarkerUrl = this.DISP_TOUR_POINT_ICON_URL;
    tdProcessingOpts.defaultTourPointWHSMarkerUrl = this.DISP_TOUR_POINT_WHS_ICON_URL;

    let processedTCD = this.mapDataService.processTourCompletionData(rawTCData,
      tdProcessingOpts);

    processedTCD.forEach((t) => {
      t.tourPoints.forEach((tp) => {
        // update dispTourPoints (tourpoints drawn to map)
        let tTP = this.dispTourPoints.filter((x) => x.tourID === t.tourID
          && x.order === tp.order)[0];
        if (tTP) {
          tTP.predictedArriveTime = tp.predictedArriveTime;
          tTP.predictedServiceTime = tp.predictedServiceTime;
          tTP.predictedDepartureTime = tp.predictedDepartureTime;
          tTP.realArriveTime = tp.realArriveTime;
          tTP.realServiceTime = tp.realServiceTime;
          tTP.realDepartureTime = tp.realDepartureTime;
          if (tp.isCompleted || tp.isUncertain || tp.isUnderCompletion) {
            if (tTP.selected) {
              tTP.iconUrl = this.dynMarkerGenService.generateMarkerSelectedCompletedBase64(t.tourColor);
            } else {
              tTP.iconUrl = this.dynMarkerGenService.generateMarkerCompletedBase64(t.tourColor);
            }
          }
          tTP.isCompleted = tp.isCompleted;
          tTP.isUncertain = tp.isUncertain;
          tTP.isUnderCompletion = tp.isUnderCompletion;
        }
        // update tourPoints in stored TourData
        let tsT = this.tourList.filter((x) => x.ID === t.tourID)[0];
        if (tsT) {
          let tsTP = tsT.TourPoints.filter((target) => target.Order === tp.order)[0];
          if (tsTP) {
            tsTP.PredictedArriveTime = tp.predictedArriveTime;
            tsTP.PredictedServiceTime = tp.predictedServiceTime;
            tsTP.PredictedDepartureTime = tp.predictedDepartureTime;
            tsTP.RealArriveTime = tp.realArriveTime;
            tsTP.RealServiceTime = tp.realServiceTime;
            tsTP.RealDepartureTime = tp.realDepartureTime;
            tsTP.Completed = tp.isCompleted;
            tsTP.isUncertain = tp.isUncertain;
            tsTP.isUnderCompletion = tp.isUnderCompletion;
          }
        }
        // update grid data
        let tsG = this.tourPointTrackingRawGridData.filter((x) => x.tourID === t.tourID)[0];
        if (tsG) {
          tsG.isCompleted = tp.isCompleted;
          tsG.isDelayed = tp.isDelayed;
          tsG.delay = tp.delay;
        }
      });
      this.loadTourPointTrackingRawGridData();
    });
  }

  private processVehicleTrackingLiveData(rawVTData: any): void {
    if (!this.vehicleList) {
      return;
    }

    rawVTData.forEach((rv) => {
      // update map data
      let tV = this.vehicleList.filter((v) => v.device === rv.device)[0];
      if (tV) {
        tV.isDelayed = rv.isDelayed;
        if (tV.isDelayed) {
          tV.iconUrl = this.dynMarkerGenService.generateVehicleMarkerBase64('#ff0000');
        } else {
          tV.iconUrl = this.dynMarkerGenService.generateVehicleMarkerBase64(rv.tourColor);
        }
        tV.delay = rv.delay;
        tV.direction = rv.direction;
        tV.distance = rv.distance;
        tV.ignition = rv.ignition;
        tV.latitude = rv.latitude;
        tV.longitude = rv.longitude;
        tV.odometer = rv.odometer;
        tV.predictedNextTPCompletion = rv.predictedNextTPCompletion;
        tV.previousTPCompletion = rv.previousTPCompletion;
        tV.speed = rv.speed;
        tV.time = rv.time;
        tV.tourStart = rv.tourStart;
      }

      // update grid data
      let gV = this.vehicleTrackingRawGridData.filter((gv) => gv.device === rv.device)[0];
      if (gV) {
        gV.isDelayed = rv.isDelayed;
        gV.delay = rv.delay;
        gV.distance = rv.distance;
        gV.odometer = rv.odometer;
        gV.time = rv.time;
      }
      this.loadVehicleTrackingRawGridData();
    });
  }

  private processVehicleData(vehicleData: any): void {
    let processedVehicleData = this.mapDataService.processVehicleData(vehicleData);
    this.vehicleList = processedVehicleData.vehicles;
    this.vehicleTrackingRawGridData = this.mapDataService
      .extractVehicleTrackingGridRawGridData(vehicleData);
    this.loadVehicleTrackingRawGridData();
  }

  private clearVehicleData(): void {
    this.vehicleList = [];
    this.vehicleTrackingRawGridData = [];
  }

  private downloadFile(data: Response) {
    let blob = new Blob([data], {type: 'text/csv'});
    saveAs(blob, 'trackingExport.csv');
  }
}
