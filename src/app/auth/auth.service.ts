import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router){}

    signUp(email:String, password:String){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6kevgniyyvUcSB7gw7RPq7XOs6GbNZ_A',{
            email : email,
            password : password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError), tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId,
                resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6kevgniyyvUcSB7gw7RPq7XOs6GbNZ_A',{
            email : email,
            password : password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError), tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId,
                resData.idToken, +resData.expiresIn);
        }));
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['./auth']);
    }

    private handleError(errorResponse: HttpErrorResponse){
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorResponse);
        }
            let errorMessage = 'An error occured !!! Error Message : '+errorResponse.error.error.message;
            console.log(errorResponse);
            return throwError(errorMessage);
    }

    private handleAuthentication(email: string,
                                 userId: string,
                                 token: string,
                                 expiresIn: number){
        const expirationDate =  new Date(new Date().getTime() + expiresIn * 1000);
        const cUser = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(cUser);
                                 }
}