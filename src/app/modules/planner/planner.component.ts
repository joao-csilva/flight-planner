import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Pin } from './models/map';

import { PlannerService } from './services/planner.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent {

  @ViewChild('map') map: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: any;
  flightPlan: Pin[] = [];

  clearPlanLabel: string = "Clear Flight Plan";
  planNameLabel: string = "Choose a name for your Flight Plan";
  planNamePlaceholder: string = "Flight Plan name";
  formNewPlanSubmitLabel: string = "Save";
  listTitle: string = "Saved Flight Plans";
  noSavedFlightPlansLabel: string = "You don't have any flight plans saved.";

  formNewPlan: FormGroup = new FormGroup({
    planName: new FormControl('', [Validators.required]),
  }); 

  constructor(
    public plannerService: PlannerService
  ) {}

  ngAfterViewInit() {
    this.canvas = this.map.nativeElement;
    this.ctx = this.canvas.getContext("2d");
  }

  ngOnInit() {
    this.plannerService.getSavedPlans();
  }

  drawPin(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  drawLine(pins: Pin[]) {
    this.ctx.moveTo(pins[0].x, pins[0].y);
    this.ctx.lineTo(pins[1].x, pins[1].y);
    this.ctx.stroke();
  }

  setPin(event: MouseEvent) {
    this.drawPin(event.offsetX, event.offsetY);
    this.flightPlan.push({
      x: event.offsetX,
      y: event.offsetY
    });

    if (this.flightPlan.length > 1) {
      this.drawLine(this.flightPlan.slice(-2));
    }
  }

  clearPlan() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.flightPlan = [];
  }

  saveNewPlan() {
    this.plannerService.saveNewPlan({
      plan: this.flightPlan,
      name: this.formNewPlan.value.planName
    });
    this.clearPlan();
    this.formNewPlan.reset();
  }

  openFlightPlan(plan: Pin[]) {
    this.clearPlan();
    plan.forEach((pin: Pin, index: number) => {
      this.drawPin(pin.x, pin.y);
      this.flightPlan.push(pin);

      if (index > 0) {
        this.drawLine([plan[index - 1], pin]);
      }
    });
  }
}
