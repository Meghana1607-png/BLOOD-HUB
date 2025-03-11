import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedPage: string = 'Blood Hub';
  showPopup: boolean = false;
  popupMessage: string = '';
  showDropdown: boolean = false;
  showSidebar: boolean = false;
  userId: number = 1; 

  menu = [
    { path: 'admin/dashboard', label: 'dashboard', icon: 'pi pi-home' },
    { path: 'receiver/rec-awareness', label: 'awareness', icon: 'pi pi-sitemap' },
    { path: 'receiver/rprofile', label: 'profile', icon: 'pi pi-user-plus' },
    { path: 'receiver/view-rec', label: 'viewrecform', icon: 'pi pi-globe' },
    { path: 'receiver/vp', label: 'view-profile', icon: 'pi pi-id-card' },
  ]
  show_slidebar() {
    this.showSidebar = !this.showSidebar;
  }

  openProfile(userId: number) {
    console.log('Opening profile for user ID:', userId);
    // Navigate to profile page
  }

  openAddBloodGroupModal() {
    this.showPopupMessage('Add Blood Group feature coming soon!');
  }

  modifyBloodGroup(bloodGroup: any) {
    this.showPopupMessage(`Modify Blood Group: ${bloodGroup.bloodGroup}`);
  }

  NavToPage(path: string) {
    console.log('Navigating to:', path);
    // Implement router navigation logic here
  }

  onPageChange(label: string) {
    this.selectedPage = label;
  }

  showPopupMessage(message: string) {
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }
}
