import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userId: any;
  selectedPage = 'Blood Hub';
  showConfirmLogoutPopup = false;
  org: any;
  organisation: any;
  showDropdown: boolean = false;
  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private orgService: OrgService
  ) {
    this.userId = localStorage.getItem('userid');
  }
  menu = [
    { path: 'donor/dashboard', label: 'Home', icon: 'pi pi-home' },
    { path: 'donor/awareness', label: 'Awareness', icon: 'pi pi-sitemap' },
    {
      path: 'donor/profile',
      label: 'Organisation pending requests',
      icon: 'pi pi-user-plus',
    },
    {
      path: 'donor/profile',
      label: 'Organisation approved requests',
      icon: 'pi pi-user-plus',
    },
    {
      path: 'donor/profile',
      label: 'Organisation rejected requests',
      icon: 'pi pi-user-plus',
    },
  ];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectRole(role: string) {
    console.log(`Selected role: ${role}`);

    // Handle role selection logic here

    this.showDropdown = false;
    // Close dropdown after selection
  }

  show_slidebar() {
    this.orgService.is_slidebar = true;
  }

  hide_slidebar() {
    this.orgService.is_slidebar = false;
  }

  onPageChange(page: string) {
    this.selectedPage = page;
  }

  openProfile(orgId: string): void {
    this.router.navigate(['/donor/profile']);
  }

  NavToPage(path: any) {
    this.router.navigate(['/' + path]);
    this.orgService.is_slidebar = false;
  }

  logout() {
    this.showConfirmLogoutPopup = !this.showConfirmLogoutPopup;
  }

  confirmLogout() {
    console.log("logging out")
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('donorId');
    this.showConfirmLogoutPopup = false;
    localStorage.removeItem('donorId');
    this.router.navigate(['/']);
  }

  cancelLogout() {
    this.showConfirmLogoutPopup = false;
  }
}
