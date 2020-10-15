import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRoomDialogComponent } from './make-room-dialog.component';

describe('MakeRoomDialogComponent', () => {
  let component: MakeRoomDialogComponent;
  let fixture: ComponentFixture<MakeRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
