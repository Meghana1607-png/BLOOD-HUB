import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showDropdown = false;

 is_slidebar: boolean;
  isclick:boolean=false;
  selectedPage = 'Blood-Hub'
  // roles: any[];
  det:any=[];
  c_role:any;
  menu = [
    { path: 'admin/dashboard', label: 'dashboard', icon: 'pi pi-home' },
    { path: 'donor/awareness', label: 'awareness', icon: 'pi pi-sitemap' },
    { path: 'donor/profile', label: 'profile', icon: 'pi pi-user-plus' },
    // { path: 'admin/teams-table', label: 'teams', icon: 'pi pi-users' },
    // { path: 'admin/create-org', label: 'organisation', icon: 'pi pi-globe' },
    // { path: 'admin/profile', label: 'profile', icon: 'pi pi-id-card' },
  ]

  constructor(private router: Router, private activeroute: ActivatedRoute ) {
    this.is_slidebar = false;
    // this.roles = this.activeroute.snapshot.queryParams['roles']
    // console.log(this.roles)
    // this.c_role = this.activeroute.snapshot.queryParams['currentrole']
  }
  ngOnInit(): void {
    // this.fetchuser();
  }

  NavToPage(path: any) {
    this.router.navigate(['/' + path])
    this.is_slidebar = false
  }

  onPageChange(page: string) {
    console.log(page)
    this.selectedPage = page
  }

  show_slidebar() {
    this.is_slidebar = true;
  }

  hide_slidebar() {
    this.is_slidebar = false;
  }
  switchRole(){
    console.log("Button clicked!")
  }


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectRole(role: string) {
    console.log(`Selected role: ${role}`);

    // Handle role selection logic here

    this.showDropdown = false; 
    // Close dropdown after selection
  }
  // fetchuser(){
  //   console.log('called')
  //  const id= localStorage.getItem('userid');
  //  console.log(id)
    // this.supabase.fetchuserdet(id).subscribe((res)=>
    // {
    //   console.log(res)
    //   this.det=res.data[0];
    //   console.log(this.det)
    // });
  // }

}

