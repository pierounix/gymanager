import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUploaderComponent } from './icon-uploader.component';

describe('IconUploaderComponent', () => {
  let component: IconUploaderComponent;
  let fixture: ComponentFixture<IconUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
