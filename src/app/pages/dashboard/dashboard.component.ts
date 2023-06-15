import { Component, OnInit } from '@angular/core';
import { IJoueur } from 'src/app/core/interfaces/IJoueur';
import { TamagotchiService } from 'src/app/core/services/tamagotchi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  joueur! : IJoueur;

  constructor(private tamagotchiService : TamagotchiService){}

  ngOnInit(): void {
    this.getJoueur()
  }

  getJoueur(){
    this.tamagotchiService.getJoueur().subscribe(joueurData => {
      if(joueurData.length > 0) this.joueur = joueurData[0]   
    })
  }

  newCycle(actionId : number){
    this.setStatistique(actionId)    
    this.checkStatistique()
    this.updateStatistique()
  }

  setStatistique(actionId : number){
    switch(actionId){
      case 1 :
        this.joueur.Faim += 15
        this.joueur.Fatigue += 10
        this.joueur.Argent -= 50
        break;
      case 2 :
        this.joueur.Fatigue += 40
        this.joueur.Faim -= 10
        break;
      case 3 :
        this.joueur.Amusement += 40
        this.joueur.Fatigue -= 30
        this.joueur.Faim -= 30
        break;
      case 4 :
        this.joueur.Argent += 120
        this.joueur.Fatigue -= 40
        this.joueur.Faim -= 15
    }
    this.joueur.Experience += 20
  }

  checkStatistique(){
    if(this.joueur.Amusement < 0) this.joueur.Amusement = 0
    if(this.joueur.Argent < 0) this.joueur.Argent = 0
    if(this.joueur.Experience > 250){
      this.joueur.Experience = 0
      this.joueur.Niveau += 1
    } 
    if(this.joueur.Faim < 0) this.joueur.Faim = 0
    if(this.joueur.Fatigue < 0) this.joueur.Fatigue = 0
    if(this.joueur.Niveau > 999) this.joueur.Fatigue = 999

    if(this.joueur.Amusement > 100) this.joueur.Amusement = 100
    if(this.joueur.Argent > 9999) this.joueur.Argent = 9999
    if(this.joueur.Faim > 100) this.joueur.Faim = 100
    if(this.joueur.Fatigue > 100) this.joueur.Fatigue = 100

  }

  updateStatistique(){
    this.tamagotchiService.updateJoueur(this.joueur).subscribe(joueurData => {
      this.joueur = joueurData 
    })
  }

  resetTamagotchi(){
    this.joueur.Amusement = 60
    this.joueur.Argent = 1400
    this.joueur.Experience = 0;
    this.joueur.Faim = 75
    this.joueur.Fatigue = 75;
    this.joueur.Niveau = 1
  }
}
