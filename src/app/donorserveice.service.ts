import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class DonorserveiceService {
  private apiUrl = 'http://localhost:3000/donorforminsert';
  private donorinsertInUserapiUrl = 'http://localhost:3000/userforminsert';
  private fetchUserApi = 'http://localhost:3000/userFetch';
  private fetchDonorApi = 'http://localhost:3000/fetchDonor';
  private donorinserturl = 'http://localhost:3000/donorforminsert';
  private sendRequest = 'http://localhost:3000/donor/sendRequest';
  private setFalseApi = 'http://localhost:3000/donor/setDonorFalse';
  private fetchDonorDetailsApi = 'http://localhost:3000/donor/fetchDonorDetails';
  private supabase: SupabaseClient;
  constructor(private http: HttpClient) {
    this.supabase = createClient(
'https://esuzqpwibfnycwmeirtg.supabase.co',   
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc'    );
  }

  Donorinsert(donor: any): Observable<any> {
    console.log('Sending data to API:', donor);
    return this.http.post(this.apiUrl, donor);
  }

  submitRequest(formData: any): Observable<any> {
    return this.http.post(`${this.sendRequest}`, { formData });
  }

  submitDonorForm(formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.donorinserturl, JSON.stringify(formData), {
      headers,
    });
  }

  fetchDonorDetails(userId : any): Observable<any> {
    return this.http.get(`${this.fetchDonorDetailsApi}/${userId}`);
  }

  falseDonor(latestDonor: any): Observable<any> {
    return this.http.put(`${this.setFalseApi}`, { latestDonor });
  }

  userFetch(userId: any): Observable<any> {
    return this.http.get(`${this.fetchUserApi}/${userId}`);
  }

  fetchDonor(userId: any): Observable<any> {
    return this.http.get(`${this.fetchDonorApi}/${userId}`);
  }

  donorinsertInUser(
    userid: any,
    name: any,
    email: any,
    phno: any,
    address: any
  ): Observable<any> {
    return this.http.post(`${this.donorinsertInUserapiUrl}`, {
      userid,
      name,
      email,
      phno,
      address,
    });
  }
  // profilefetch(uid:any){
  //     const res=this.supabase.from('donors').select().eq('donor_id',uid)
  //   return from(res)
  //   }
  get auth() {
    return this.supabase.auth;
  }

  async getuser() {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      console.log('getUser() - Supabase Response:', data);
      if (error) {
        console.error('Error in getUser:', error.message);
        return { data: null, error };
      }
      return { data, error: null };
    } catch (e) {
      console.error('Exception in getUser:', e);
      return { data: null, error: e };
    }
  }
  async profilefetch(userId: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('userid', userId)
      .limit(1);
  
    console.log("Raw Supabase Response:", { data, error }); 
  
    if (error) {
      console.error("Error fetching donor profile:", error);
      return null;
    }
    return data.length > 0 ? data[0] : null; 
  }
  
  
  async updateUser(userid: string, updatedData: any): Promise<any> {
    if (!userid) {
      throw new Error("User ID is required for updating profile.");
    }
  }
  
}
