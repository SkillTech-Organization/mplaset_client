import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef,
  LOCALE_ID
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { MapDataService } from './map/data.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ToasterModule } from 'angular2-toaster';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { MapComponent } from './map';
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/headings.css';

import { IntlModule } from '@progress/kendo-angular-intl';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import {
  MatButtonModule, MatSidenavModule, MatCheckboxModule,
  MatTooltipModule, MatMenuModule, MatInputModule,
  MatFormFieldModule, MatIconModule, MatTabsModule,
  MatListModule, MatDatepickerModule,
  MATERIAL_COMPATIBILITY_MODE,
  MAT_PLACEHOLDER_GLOBAL_OPTIONS,
  MatNativeDateModule, MdFormFieldModule
} from '@angular/material';
// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import '@progress/kendo-angular-intl/locales/hu/all';
import 'hammerjs';
import { DynamicMarkerGeneratorService } from './map/dynamic-marker-generator.service';
import { AuthService } from './_auth/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth-guard.service';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

import * as moment from 'moment';
import 'moment/locale/hu';

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    UserManagementComponent,
    NoContentComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    // TODO migrate to target module when prototyping is done
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1oqjfMX6DSl_35LGzUgN5Ds48rZnl9lk'
    }),
    DialogsModule,
    AgmJsMarkerClustererModule,
    ToasterModule,
    AngularFontAwesomeModule,
    AgmSnazzyInfoWindowModule,
    IntlModule,
    GridModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateInputsModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: LOCALE_ID, useValue: 'hu-HU'
    },
    MapDataService,
    DynamicMarkerGeneratorService,
    AuthService,
    AuthGuard,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
    { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'} },
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {
    moment.locale('hu');
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
