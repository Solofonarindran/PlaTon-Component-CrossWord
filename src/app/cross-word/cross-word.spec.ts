import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossWord } from './cross-word';

describe('CrossWord', () => {
  let component: CrossWord;
  let fixture: ComponentFixture<CrossWord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossWord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossWord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
