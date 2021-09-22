import { Component, OnInit } from '@angular/core';
import { AdminInformation } from 'src/app/Interfaces/AdminInformation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public appPages = [
    { title: 'Trang chủ', url: '/main/dashboard', icon: 'apps' },
    { title: 'Quản lý người dùng', url: '/main/user-management', icon: 'people' },
    { title: 'Thư viện hình ảnh', url: '/main/gallery', icon: 'images' },
    { title: 'Quản lý đơn hàng', url: '/main/order-manager', icon: 'receipt' },
    { title: 'Quản lý sản phẩm', url: '/main/product-manager', icon: 'fish' },
    { title: 'Quản lý bài viết', url: '/main/post-manager', icon: 'reader' },
    { title: 'Thông tin nhận diện', url: '/main/identification-information', icon: 'cog' },
    { title: 'Trả lời khách hàng', url: '/main/chat', icon: 'chatbubbles' },
  ];

  public partner = [
    { title: 'AhaMove', url: '/main/partner/shipping', logo: 'assets/logo/partner/ahamove-logo.jpg' },
  ];

  admin: AdminInformation;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.listenUser();
  }

  listenUser(){
    this.authService.getUserInformation().subscribe(res=>{
      this.admin = res;
      console.log(this.admin);
      
    })
  }
}
