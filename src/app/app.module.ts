import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { GalleryRouteModule } from './pipes/gallery-route/gallery-route.module';
import { AppRoutingModule } from './app-routing.module';

import { GalleryRoutePipe } from './pipes/gallery-route/gallery-route.pipe';

import { AppComponent } from './app.component';

import { RefreshTokenInterceptorService } from './services/api/refresh-token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    // GalleryRoutePipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    GalleryRouteModule,
    AppRoutingModule
  ],
  providers: [
    GalleryRoutePipe,
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
