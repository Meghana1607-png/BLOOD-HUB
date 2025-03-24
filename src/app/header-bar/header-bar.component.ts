import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ReceiverService } from 'src/app/receiver.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {
  showDropdown = false;

  is_slidebar: boolean;
   isclick:boolean=false;
   selectedPage = 'Blood-Hub'
   // roles: any[];
   det:any=[];
   c_role:any;
   showConfirmLogoutPopup: any;
   menu = [
     { path: 'rec-dashboard', label: 'Blood Hub', icon: 'pi pi-home' },
     { path: 'receiver/view-rec', label: 'Recent request ', icon: 'pi pi-globe' },
     { path: 'receiver/rec-table', label: 'All requests', icon: 'pi pi-user-plus' },
     { path: 'receiver/rec-awareness', label: 'awareness', icon: 'pi pi-sitemap' },
     // { path: 'admin/teams-table', label: 'teams', icon: 'pi pi-users' },
      {path:'receiver/rec-form' ,label:'new form',}
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
   closeDropdown() {
     this.showDropdown = false;
   }
 
   hide_slidebar() {
     this.is_slidebar = false;
   }
   switchRole(){
     console.log("Button clicked!")
   }
 
   toggleDropdown(event: Event) {
     event.stopPropagation(); // Prevents click event from closing immediately
     this.showDropdown = !this.showDropdown;
   }
   
 
   selectRole(role: string) {
     console.log(`Selected role: ${role}`);// Handle role selection logic here
 
     this.showDropdown = false; 
 // Close dropdown after selection
   }

   logout() {
    this.showConfirmLogoutPopup = !this.showConfirmLogoutPopup;
  }

  confirmLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    this.showConfirmLogoutPopup = false;
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }

  cancelLogout() {
    this.showConfirmLogoutPopup = false;
  }
}
