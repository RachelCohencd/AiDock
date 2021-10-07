# Angular Sorting

Steps to achieve sorting in angular project are as below:

1. Install the required packages

    ```sh
    npm install ng2-order-pipe --save
    ```

2. Import Ng2OrderModule

    app.module.ts

    ```js
    import { Ng2OrderModule } from 'ng2-order-pipe';
    @NgModule({
      ...
      ...
      imports: [
        Ng2OrderModule
      ]
    })
    export class AppModule { }
    ```

3. Create a mock list which one we want to sort

    app.component.ts

    ```js
    heroes = [
        { id: 11, name: 'Mr. Nice', country: 'India' },
        ...
        ...
      ];
    ```

4. Show/iterate this list in our html page

    ```html
    <div class="container">
      <div class="row">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Id</th>
            <th>Hero Name</th>
            <th>Country</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let hero of heroes>
            <td>{{hero.id}}</td>
            <td>{{hero.name}}</td>
            <td>{{hero.country}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    ```

5. Create key and reverse varibales
  key = default field based on which we want to sort our list
  reverse = sorting in ascending or descending order

    app.component.ts

    ```js
    key = 'name';  // means i want to apply sorting on name as default
    reverse = false;
    ```

5. Write the sorting logic in a function
will send the key from UI to this function, based on which we want to sort our list

    ```js
    sortList(key) {
        this.key = key;
        this.reverse = !this.reverse;
      }
    ```

6. Lets create onclick functions which will send the key to our sorting function

    ```html
    <span (click)="sortList('name')" class="by-name">Name</span>
    <span (click)="sortList('country')" class="by-country">Country</span>
    ```
7. Actual plugin sorting logic to be applied on the list iteration

    ```html
    *ngFor="let hero of heroes | orderBy: key : reverse"
    ```
  
  ## Demo
  https://stackblitz.com/edit/angular-sorting


