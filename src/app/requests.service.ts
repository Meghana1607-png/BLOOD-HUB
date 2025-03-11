import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private supabase: SupabaseClient;

  private apiurl= 'http://localhost:3000/requests'
  private apiurl1= 'http://localhost:3000/requests/:org_id'
  private apiurl2= 'http://localhost:3000/requests/:id'
  constructor(private http:HttpClient) { 
    this.supabase = createClient("https://esuzqpwibfnycwmeirtg.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc")
      }

   createRequest(userid: any, org_id: string) :Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiurl, { userid, org_id },{headers});
  }

  getPendingRequests(org_id: any) :Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiurl1,org_id);
  }

  
  updateRequestStatus(id: string, status: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http .put(this.apiurl2,id ,status );
  }


  // getOrgIdByName(orgName: string): Observable<any> {
  //   return new Observable(observer => {
  //     this.supabase
  //       .from('organizations')  // Assuming 'organizations' is your table name
  //       .select('id')  // Only fetching the 'id' column
  //       .eq('name', orgName)  // Assuming 'name' is the field you use to identify the org
  //       .single()  // Get the first match (orgName should be unique)
  //       .then(response => {
  //         if (response.error) {
  //           observer.error(response.error.message);
  //         } else {
  //           observer.next(response.data);  // Return the org_id
  //         }
  //       });
  //   });
  // }
  get auth() {
    return this.supabase.auth;
  }

  submitRequest(requestData: any): Observable<any> {
    console.log('Submitting request with data:', requestData); 
  
    return new Observable(observer => {
      this.supabase
        .from('request')
        .insert([requestData])
        .then(({ data, error }) => {
          if (error) {
            console.error('Supabase Error:', error.details, error.message);
            observer.error(error.message);
          } else {
            observer.next(data);
            observer.complete();
          }
        });
    });
  }
  
  

  async createRequest1(requestData: any) {
    return await this. supabase.from('request').insert([requestData]);
  }
}
