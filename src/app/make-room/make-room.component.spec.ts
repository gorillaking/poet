import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRoomComponent } from './make-room.component';

describe('MakeRoomComponent', () => {
  let component: MakeRoomComponent;
  let fixture: ComponentFixture<MakeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
