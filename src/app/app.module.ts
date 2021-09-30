import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData, CurrencyPipe } from '@angular/common';
import localeFr from '@angular/common/locales/es';
registerLocaleData(localeFr);

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { GalleryRouteModule } from './pipes/gallery-route/gallery-route.module';
import { AppRoutingModule } from './app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { NgxMaskModule, IConfig, MaskPipe } from 'ngx-mask';

import { GalleryRoutePipe } from './pipes/gallery-route/gallery-route.pipe';

import { AppComponent } from './app.component';

import { RefreshTokenInterceptorService } from './services/api/refresh-token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const options: Partial<IConfig> = {
  thousandSeparator: ","
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    GalleryRouteModule,
    AppRoutingModule,
    MatNativeDateModule,
    MaterialModule,
    NgxMaskModule.forRoot(options),

    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'},
    GalleryRoutePipe,
    MaskPipe,
    CurrencyPipe,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
