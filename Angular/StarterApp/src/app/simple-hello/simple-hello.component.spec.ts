import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHelloComponent } from './simple-hello.component';

describe('SimpleHelloComponent', () => {
  let component: SimpleHelloComponent;
  let fixture: ComponentFixture<SimpleHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleHelloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
