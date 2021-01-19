import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  locationsArr: any = [];
  constructor(private service: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog() {
    this.service.getCatalog()
    .subscribe(res => {
      ({data: {locations: this.locationsArr}} = res);
      this.service.locationsArr = [...this.locationsArr];
      // console.log('response of json => ', this.locationsArr);
      this.service.changeListing(this.locationsArr);
    }, err => {
      console.log('err => ', err);
    })
    
  }

  onLocationClick(location) {
    // console.log('onLocationClick => ',location);
    this.router.navigate(['list', `${location.dealers_id}`, `default`, `default`])
  }

  onBranchClick(e, location, branch) {
    e.stopPropagation(); // To stop event bubbling
    // console.log('onBranchClick => ',branch);
    this.router.navigate(['list', `${location.dealers_id}`,`${branch.branch_id}`, `default`]);
  }

}
