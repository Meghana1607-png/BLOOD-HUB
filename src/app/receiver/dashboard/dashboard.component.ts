import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ReceiverService } from 'src/app/receiver.service';


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
    { path: 'receiver/rec-awareness', label: 'awareness', icon: 'pi pi-sitemap' },
    { path: 'receiver/rprofile', label: 'profile', icon: 'pi pi-user-plus' },
    // { path: 'admin/teams-table', label: 'teams', icon: 'pi pi-users' },
    { path: 'receiver/view-rec', label: 'viewrecform', icon: 'pi pi-globe' },
    { path: 'receiver/vp', label: 'view-profile', icon: 'pi pi-id-card' },
  ]

  constructor(private router: Router, private activeroute: ActivatedRoute, private recform:ReceiverService ) {
    this.is_slidebar = false;
    // this.roles = this.activeroute.snapshot.queryParams['roles']
    // console.log(this.roles)
    // this.c_role = this.activeroute.snapshot.queryParams['currentrole']
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentRoute = this.menu.find(item => event.url.includes(item.path));
      this.selectedPage = currentRoute ? currentRoute.label : 'Dashboard';
    });
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
    console.log(`Selected role: ${role}`);// Handle role selection logic here

    this.showDropdown = false; 
// Close dropdown after selection
  }
fun(){
const recid=  this.recform.recfetch('').subscribe({
    next: (data) => {
      if (data) {
        this.router.navigate(['/view-rec', data]); 
      } else {
        this.router.navigate(['/rec-form']); 
      }
    },
    error: () => this.router.navigate(['/rec-form']),
  });
}
}

