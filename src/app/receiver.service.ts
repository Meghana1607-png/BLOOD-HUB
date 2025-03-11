import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  
  private supabase: SupabaseClient;

  private apiurl= 'http://localhost:3000/receiverforminsert';

  constructor(private http:HttpClient) { 
    this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc')
  
    }
    get auth() {
      return this.supabase.auth;
    }

     recfetch(uid:any){
        const res=this.supabase.from('receivers').select('*').eq('userid',uid)
      return from(res)
      }

    submitReceiverForm(formData: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.apiurl, JSON.stringify(formData), { headers });
    }
    async getuser() {
      try {
        const { data, error } = await this.supabase.auth.getUser();
        console.log("getUser() - Supabase Response:", data);
        if (error) {
          console.error("Error in getUser:", error.message);
          return { data: null, error };
        }
        return { data, error: null };
      } catch (e) {
        console.error("Exception in getUser:", e);
        return { data: null, error: e };
      }
    }
}
