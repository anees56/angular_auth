import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logindata: any;
  currentUser:any;
    
    constructor(private rout: ActivatedRoute,public route:Router,private session:SessionService, private proute: ActivatedRoute) {

     }

  ngOnInit(): void {
    this.rout.queryParams.subscribe((param) => {
      this.logindata = param.username;
      // console.log(this.logindata);
    this.currentUser=this.session.getToken();
    // console.log(this.currentUser);  
  });
  }
  logout(): void {
    this.session.signOut();
    this.route.navigate(['../'], { relativeTo: this.proute });//go to sibling rout
    
  }
}
