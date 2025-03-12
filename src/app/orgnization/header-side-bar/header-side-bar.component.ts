import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-side-bar',
  templateUrl: './header-side-bar.component.html',
  styleUrls: ['./header-side-bar.component.css'],
})
export class HeaderSideBarComponent {
  userId: any;
  selectedPage = 'Blood Hub';
  showConfirmLogoutPopup = false;
  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private orgService: OrgService
  ) {
    this.userId = localStorage.getItem('userId');
  }
  menu = [
    { path: 'org-dashboard', label: 'Blood Hub', icon: 'pi pi-users' },
    { path: 'org/donorsList', label: 'Donors list', icon: 'pi pi-users' },
    //{ path: 'org/receiversList', label: 'Receivers list', icon: 'pi pi-users' },
    {
      path: 'org/donorsList/pending',
      label: 'Donor pending list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/donorsList/approved',
      label: 'Donor approved list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/donorsList/rejected',
      label: 'Donor rejected list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/receiversList/pending',
      label: 'Receiver pending list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/receiversList/approved',
      label: 'Receiver approved list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/receiversList/rejected',
      label: 'Receiver rejected list',
      icon: 'pi pi-users',
    },
    { path: 'org/feedbacks', label: 'feedbacks', icon: 'pi pi-users' },
  ];

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
    this.router.navigate(['/org/Profile']);
  }

  NavToPage(path: any) {
    this.router.navigate(['/' + path]);
    this.orgService.is_slidebar = false;
  }

  logout() {
    if (this.showConfirmLogoutPopup) {
      this.showConfirmLogoutPopup = false;
    } else {
      this.showConfirmLogoutPopup = true;
    }
  }

  confirmLogout() {
    // Call your logout API here
    this.showConfirmLogoutPopup = false;
    this.router.navigate(['/']);
  }

  cancelLogout() {
    this.showConfirmLogoutPopup = false;
  }
}
