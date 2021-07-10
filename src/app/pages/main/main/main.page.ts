import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public appPages = [
    { title: 'Trang chủ', url: '/main/dashboard', icon: 'apps' },
    { title: 'Thư viện hình ảnh', url: '/main/gallery', icon: 'images' },
    { title: 'Quản lý đơn hàng', url: '/main/order-manager', icon: 'receipt' },
    { title: 'Quản lý sản phẩm', url: '/main/product-manager', icon: 'fish' },
    { title: 'Quản lý bài viết', url: '/main/post-manager', icon: 'reader' },
    { title: 'Thông tin nhận diện', url: '/main/identification-information', icon: 'cog' },
    { title: 'Trả lời khách hàng', url: '/main/chat', icon: 'chatbubbles' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
