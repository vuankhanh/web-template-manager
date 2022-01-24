import { Component, OnDestroy, OnInit } from '@angular/core';

import { AdminInformation } from 'src/app/Interfaces/AdminInformation';
import { MenuParner, MenuSideBar } from 'src/app/Interfaces/MenuSideBar';

import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/api/config.service';

import { combineLatest, Subscription } from 'rxjs';
import { AdminRight, ServerConfig } from 'src/app/Interfaces/ServerConfig';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
  public appPages: Array<MenuSideBar> = [
    { title: 'Trang chủ', url: '/main/dashboard', icon: 'apps', permission: 0 },
    { title: 'Quản lý tài khoản', url: '/main/account-management', icon: 'people', permission: 1 },
    { title: 'Thư viện hình ảnh', url: '/main/gallery', icon: 'images', permission: 1 },
    { title: 'Thư viện video', url: '/main/gallery-video', icon: 'videocam', permission: 1 },
    { title: 'Quản lý đơn hàng', url: '/main/order-manager', icon: 'receipt', permission: 2 },
    { title: 'Quản lý sản phẩm', url: '/main/product-manager', icon: 'fish', permission: 2 },
    { title: 'Quản lý bài viết', url: '/main/post-manager', icon: 'reader', permission: 3 },
    { title: 'Thông tin nhận diện', url: '/main/identification-information', icon: 'cog', permission: 1 },
    { title: 'Quản lý chuyển tiếp', url: '/main/redirect-manager', icon: 'arrow-redo', permission: 1 },
    { title: 'Trả lời khách hàng', url: '/main/chat', icon: 'chatbubbles', permission: 1 },
  ];

  public partner: Array<MenuParner> = [
    { title: 'AhaMove', url: '/main/partner/shipping', logo: 'assets/logo/partner/ahamove-logo.jpg', permission: 0 },
  ];

  admin: AdminInformation;
  permissionName: string;

  private subscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.getUserAndConfig();
  }

  private getUserAndConfig(){
    const getUser$ = this.authService.getUserInformation();
    const getConfig$ = this.configService.get();
    
    this.subscription.add(
      combineLatest([getUser$, getConfig$]).subscribe(([user, config])=>{
        if(user && config){
          this.admin = user;
          config.adminRights.forEach(adminRight=>{
            if(this.admin.permission === adminRight.code){
              this.permissionName = adminRight.name
            }
          })
        }
      })
    )
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
