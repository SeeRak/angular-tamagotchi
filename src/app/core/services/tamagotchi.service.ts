import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJoueur } from '../interfaces/IJoueur';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TamagotchiService {

  constructor(public http: HttpClient) { }

  getJoueur() : Observable<IJoueur[]>{
    return this.http.get<IJoueur[]>(environment.API_URL_TAMAGOTCHI)
  }

  updateJoueur(joueur : IJoueur) : Observable<IJoueur>{
    return this.http.put<IJoueur>(environment.API_URL_TAMAGOTCHI+"/"+joueur.Id, joueur)
  }
}
