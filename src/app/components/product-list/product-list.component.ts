import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  locationsArr: any = [];
  paramLocation: string;
  paramBranch: string;
  paramCategory: string;
  categoriesArr: any = [];
  subcategoriesArr: any = [];
  currLocation: any = {};
  currBranch: any = {};
  // currLocation: object= {};
  constructor(private service: MainService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log('listing page params => ', params);
      ({location: this.paramLocation, branch: this.paramBranch, category: this.paramCategory} = params);
      this.categoriesArr = [];
      this.subcategoriesArr = [];
      this.currBranch = {};
      this.currLocation = {};
      window.scrollTo(0, 0);
      this.getListing();
    })

    this.service.listingObs.subscribe(res => {
      if(res) {
        // console.log('listing updated => ', res);
        this.getListing();
      }
    })
  }


  getListing() {
    if(this.service.locationsArr.length){
      this.locationsArr = [...this.service.locationsArr];
      let currLocation = this.locationsArr.filter(location => location.dealers_id == this.paramLocation)[0];
      // this.currLocation = {...currLocation};
      // console.log('currLocation-> ', currLocation)
      this.currLocation = currLocation; // Current Location name
      for(let i=0; i < currLocation.branches.length; i++) {
        if(this.paramBranch !== 'default' ) {
          if(this.paramBranch == currLocation.branches[i].branch_id) {
            this.currBranch = currLocation.branches[i]; // Current Branch Name if branch is clicked
            this.categoriesArr = [...this.categoriesArr, ...currLocation.branches[i].categories];
          }
        } else {
          this.categoriesArr = [...this.categoriesArr, ...currLocation.branches[i].categories.map(cat => {
            cat.branch_id = currLocation.branches[i].branch_id;
            return cat;
          })];
        }
      }
      if(this.paramCategory !== 'default')
          this.subcategoriesArr = this.categoriesArr.filter(cat => cat.name === this.paramCategory)[0].subcategories;
      // console.log('categories ar => ', this.categoriesArr, this.subcategoriesArr);
    }    
  }

  goToSubCategory(category) {
    // console.log('category ->', category);
    this.router.navigate(['list', this.paramLocation, category.branch_id ? category.branch_id : this.paramBranch, category.name]);
  }

  onLocationClick() {
    // console.log('currLocationOrBranchName -> ', this.currLocationOrBranchName);
    this.router.navigate(['list', this.currLocation.dealers_id, 'default', 'default']);
  }
  onBranchClick() {
    // console.log('currLocationOrBranchName -> ', this);
    this.router.navigate(['list', this.paramLocation, this.currBranch.branch_id, 'default']);
  }



}
