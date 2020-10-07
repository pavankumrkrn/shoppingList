import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 
  userSub: Subscription;
  isAuthenticated = false;
  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }

  logout(){
    this.authService.logOut();
  }

  saveData(){
    this.dataStorage.savedata();
  }

  fetchData(){
    this.dataStorage.fetchdata().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
