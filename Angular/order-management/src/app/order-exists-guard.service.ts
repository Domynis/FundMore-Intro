import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { OrderService } from './order.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderExistsGuardService implements CanActivate{

  constructor(private orderService : OrderService, private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const orderId = +route.params['id'];
    return this.orderService.orderExists(orderId).pipe(
      map(orderExists => {
        if(!orderExists) {
          this.router.navigate(['/orders']);
        }
        return orderExists;
      })
    );
  }
}
