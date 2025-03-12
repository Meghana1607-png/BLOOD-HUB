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
  org: any;
  organisation: any;
  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private orgService: OrgService
  ) {
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organisation');
    if (this.org) {
      this.organisation = JSON.parse(this.org);
    }
    console.log(
      'organisation details in sending message module',
      this.organisation
    );
  }
  menu = [
    { path: 'org-dashboard', label: 'Blood Hub', icon: 'pi pi-users' },
    { path: 'org/donorsList', label: 'Donors list', icon: 'pi pi-users' },
    {
      path: 'org/donorList/requests',
      label: 'Donor Requests',
      icon: 'pi pi-users',
    },
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
    // Optionally, you can use the Location service to go back to the previous page
    // this.location.back();
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
