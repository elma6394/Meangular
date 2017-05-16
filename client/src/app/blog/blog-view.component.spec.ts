/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { BlogViewComponent } from './blog-view.component';
import { BlogService } from './blog.service';
import { AuthService } from '../user/auth.service';

const blogEntry = {
  title: 'Test blog entry',
  content: 'Test content',
  created: new Date(),
  _id: 'objectid',
  user: {
    profile: {
      name: 'Test User'
    },
    _id: 'objectid'
  }
};
let fixture;
let component;

describe('BlogViewComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlogViewComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: {navigate: function() {}}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {resolveData: blogEntry}
            }
          }
        },
        {
          provide: AuthService,
          useValue: {}
        },
        {
          provide: BlogService,
          useValue: {
            deleteBlogEntry: blogEntryInput => Observable.from([1])
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(BlogViewComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the blog view component', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with blog entry from route resolve', () => {
    component.ngOnInit();
    expect(component.blogEntry).toEqual(blogEntry);
  });

  // TODO: Fix component not using injected service
  // it('calls BlogService deleteBlogEntry method for component method', () => {
  //   const blogService = TestBed.get(BlogService);
  //   component.ngOnInit();
  //   spyOn(blogService, 'deleteBlogEntry');
  //   component.deleteBlogEntry();
  //   expect(blogService.deleteBlogEntry).toHaveBeenCalledWith(blogEntry);
  // });
});
