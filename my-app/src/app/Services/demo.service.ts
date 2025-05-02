import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  addDemo(demo: any) {
    return this.httpClient.post(`${this.baseUrl}/form`, demo);
  }

  getAllDemos() {
    return this.httpClient.get(`${this.baseUrl}/form`);
  }
  // async getAllDemosAsPromise(): Promise<any> {
  //   return await firstValueFrom(this.httpClient.get(`${this.baseUrl}/form`));
  // }
  updateDemo(id: number, demo: any) {
    return this.httpClient.put(`${this.baseUrl}/form/${id}`, demo);
  }

  deleteDemo(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/form/${id}`);
  }
}
