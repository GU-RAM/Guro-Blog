import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Post, User } from '../../core/models';
import { ApiService } from '../../core';
import { NgClass } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { CardComponent, ModalComponent } from '../../components';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';

const Modules = [
  RouterLink,
  NgClass,
  NzTableModule,
  NzButtonModule,
  NzToolTipModule,
  NzGridModule,
  NzCardModule,
  NzModalModule,
];

const Components = [CardComponent, ModalComponent];

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [...Modules, ...Components],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [NzModalService],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  userPosts: Post[] = [];
  userId: string = '';
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private nzModal: NzModalService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('userId');
      this.userId = userIdParam || '';

      if (this.userId) {
        this.apiService.getPostsByUserId(this.userId).subscribe((posts) => {
          this.userPosts = posts;
        });

        this.apiService
          .getUserDetails(+this.userId)
          .pipe(tap((x) => console.log(x)))
          .subscribe((user) => {
            this.user = user; // Correctly assign the user object
          });
      } else {
        this.fetchAllPostsWithUserDetails();
      }
    });
  }

  fetchAllPostsWithUserDetails() {
    this.apiService
      .getAllPosts()
      .pipe(
        switchMap((posts: Post[]) => {
          const userObservables = posts.map((post) =>
            this.apiService.getUserDetails(post.userId)
          );

          return forkJoin(userObservables).pipe(
            map((userDetails) => {
              return posts.map((post, index) => ({
                ...post,
                name: userDetails[index].name,
              }));
            })
          );
        })
      )
      .subscribe(
        (combinedPosts) => {
          this.posts.push(...combinedPosts);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  showModal(post: Post): void {
    this.nzModal.create({
      nzTitle: post.title,
      nzContent: ModalComponent,
      nzFooter: null,
      nzData: {
        content: post.body,
      },
    });
  }
}
