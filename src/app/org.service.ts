import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  from(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private supabase: SupabaseClient;

  private apiurl = 'http://localhost:3000/orgforminsert';
  private api = 'http://localhost:3000/orgSignIn';
  private apiSignUp = 'http://localhost:3000/orgSignUp';
  private bloodGroupFetchApi = 'http://localhost:3000/api/organization';
  private profileFetchUrl = 'http://localhost:3000/api/organization';
  private fetchPendingReceiversApi =
    'http://localhost:3000/org/receivers/pending';
  private fetchApprovedReceiversApi =
    'http://localhost:3000/org/receivers/approved';
  private fetchRejectedReceiversApi =
    'http://localhost:3000/org/receivers/rejected';
  private fetchAllReceiversApi = 'http://localhost:3000/org/receivers';
  private fetchPendingDonorsApi = 'http://localhost:3000/org/donors/pending';
  private fetchApprovedDonorsApi = 'http://localhost:3000/org/donors/approved';
  private fetchRejectedDonorsApi = 'http://localhost:3000/org/donors/rejected';
  private fetchAllDonorsApi = 'http://localhost:3000/org/donors';
  private updateBloodGroupApi = 'http://localhost:3000/blood-groups/update';
  private addBloodGroupApi = 'http://localhost:3000/blood-groups/addBloodGroup';
  private fetchReceiverDetailsApi = 'http://localhost:3000/org/ReceiverDetails';
  private acceptReceiverApi = 'http://localhost:3000/org/acceptReceiver';
  private acceptDonorApi = 'http://localhost:3000/org/acceptDonor';
  private rejectReceiverApi = 'http://localhost:3000/org/rejectReceiver';
  private fetchDonorDetailsApi = 'http://localhost:3000/org/DonorDetails';
  private rejectDonorApi = 'http://localhost:3000/org/rejectDonor';
  private requestDonorapi = 'http://localhost:3000/org/requestDonor';
  private fetchFeedbacksApi = 'http://localhost:3000/org/feedbacks';
  private fetchIndividualFeedbacksApi =
    'http://localhost:3000/org/feedbacks/individualFeedback';
  showPopup: boolean = false;
  is_slidebar: boolean = false;
  addBloodGroupModal = false;

  constructor(private http: HttpClient) {
    auth: {
      persistSession: false;
      //  Disables session persistence and lock
    }
    this.supabase = createClient(
      'https://esuzqpwibfnycwmeirtg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc'
    );
  }

  Orginsert(org: any): Observable<any> {
    return this.http.post(this.apiurl, org);
  }

  openAddBloodGroupModal() {
    this.addBloodGroupModal = true;
  }

  requestDonor(
    user: any,
    message: any,
    donorEmail: any,
    data: any,
    organistaion: any,
    donorName: any
  ): Observable<any> {
    console.log('data in org.service', data, user, message, organistaion);
    return this.http.post(`${this.requestDonorapi}/${user}`, {
      data,
      message,
      donorEmail,
      organistaion,
      donorName,
    });
  }

  OrgSignIn(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  OrgSignUp(data: any): Observable<any> {
    return this.http.post(this.apiSignUp, data);
  }

  fetchorgform(id: any): Observable<any> {
    return from(
      this.supabase
        .from('organization')
        .select()
        .then((response) => {
          console.log('Supabase Response:', response);
          return response;
        })
    );
  }

  async getAuthId(): Promise<string | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data?.user?.id ?? null;
  }

  async getOrgId(): Promise<string | null> {
    const UID = await this.getAuthId();
    if (!UID) return null;

    const { data, error } = await this.supabase
      .from('organization')
      .select()
      .eq('auth_id', UID)
      .single();

    if (error) {
      console.error('Error fetching org_id:', error);
      return null;
    }

    return data?.org_id ?? null;
  }

  fetchFeedbacks(orgId: any): Observable<any> {
    return this.http.get(`${this.fetchFeedbacksApi}/${orgId}`);
  }

  fetchIndividualFeedbacks(orgId: any, donorReceiverId: any): Observable<any> {
    console.log('donorReceiverId', donorReceiverId);
    return this.http.get(
      `${this.fetchIndividualFeedbacksApi}/${orgId}/${donorReceiverId}`
    );
  }

  fetchProfileByOrg(orgId: string): Observable<any> {
    return this.http.get(`${this.profileFetchUrl}/${orgId}`);
  }

  acceptReceiver(
    userId: string,
    receiverEmail: any,
    organisation: any,
    receiverName: any
  ): Observable<any> {
    return this.http.put(`${this.acceptReceiverApi}/${userId}`, {
      receiverEmail,
      organisation,
      receiverName,
    }); // Call to backend API
  }

  acceptDonor(
    userId: string,
    donor: any,
    organisation: any,
    donorName: any
  ): Observable<any> {
    return this.http.put(`${this.acceptDonorApi}/${userId}`, {
      donor,
      organisation,
      donorName,
    }); // Call to backend API
  }

  fetchPendingReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchPendingReceiversApi}/${orgId}`);
  }

  fetchApprovedReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchApprovedReceiversApi}/${orgId}`);
  }

  fetchReceiverDetails(userId: string): Observable<any> {
    return this.http.get(`${this.fetchReceiverDetailsApi}/${userId}`);
  }

  fetchDonorDetails(userId: string): Observable<any> {
    return this.http.get(`${this.fetchDonorDetailsApi}/${userId}`);
  }

  fetchRejectedReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchRejectedReceiversApi}/${orgId}`); // Call to backend API
  }

  fetchAllReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchAllReceiversApi}/${orgId}`); // Call to backend API
  }

  fetchPendingDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchPendingDonorsApi}/${orgId}`); // Call to backend API
  }

  fetchApprovedDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchApprovedDonorsApi}/${orgId}`); // Call to backend API
  }

  fetchRejectedDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchRejectedDonorsApi}/${orgId}`); // Call to backend API
  }

  fetchAllDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchAllDonorsApi}/${orgId}`); // Call to backend API
  }

  getBloodGroups(userId: any): Observable<any> {
    return this.http.get(`${this.bloodGroupFetchApi}/${userId}`); // Fetch blood group data
  }

  // addBloodGroup(bloodGroup: string, quantity: number, userId: string): Observable<any> {
  //   return this.http.put(`${this.addBloodGroupApi}/addBloodGroup/${userId}`, {
  //     bloodGroup: bloodGroup.toLowerCase(),
  //     quantity: quantity,
  //   });}
  addBloodGroup(
    bloodGroup: string,
    quantity: number,
    userId: string
  ): Observable<any> {
    if (!bloodGroup || quantity <= 0) {
      console.error('Invalid blood group or quantity');
      return new Observable((observer) => observer.error('Invalid input'));
    }

    console.log(
      'blood group and blood quantity in org.service',
      bloodGroup,
      quantity
    );
    return this.http.put(`${this.addBloodGroupApi}/${userId}`, {
      bloodGroup: bloodGroup.toUpperCase(), // Convert to uppercase
      quantity: quantity,
    });
  }

  rejectReceiver(
    userId: string,
    message: string,
    receiverEmail: any,
    organisation: any,
    receiverName: any
  ): Observable<any> {
    return this.http.put(`${this.rejectReceiverApi}/${userId}`, {
      message,
      receiverEmail,
      organisation,
      receiverName,
    }); // Call to backend API
  }

  rejectDonor(
    userId: string,
    message: string,
    donorEmail: string,
    organisation: any,
    donorName: any
  ): Observable<any> {
    return this.http.put(`${this.rejectDonorApi}/${userId}`, {
      message,
      donorEmail,
      organisation,
      donorName,
    }); // Call to backend API
  }

  nodeMailer(email: any, password: any) {
    return this.http.post('http://localhost:3000/nodeMailer', {
      email,
      password,
    });
  }

  updateBloodGroupQuantity(
    bloodGroup: any,
    updatedQuantity: number,
    userId: any
  ): Observable<any> {
    return this.http.put(`${this.updateBloodGroupApi}/${userId}`, {
      bloodGroup: bloodGroup,
      quantity: updatedQuantity,
    });
  }
}
