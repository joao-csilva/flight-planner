import { Injectable } from '@angular/core';

import { FlightPlan } from '../models/map';

@Injectable({
  providedIn: 'root'
})

export class PlannerService {

  savedFlightPlans: FlightPlan[] = [];

  constructor() { }

  getSavedPlans() {
    const storedFlightPlanes = localStorage.getItem('savedFlightPlans');
    if (storedFlightPlanes) {
      this.savedFlightPlans = JSON.parse(storedFlightPlanes);
    }
  }

  saveNewPlan(newFlightPlan: FlightPlan) {
    this.savedFlightPlans.push(newFlightPlan);
    localStorage.setItem('savedFlightPlans', JSON.stringify(this.savedFlightPlans));
  }
}
