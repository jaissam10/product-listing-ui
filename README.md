# ProductListingUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Statement
We are going to load data from a JSON file to simulate REST API. The catalog is divided into Locations > Branches > Category > Subcategory . User selects Location and then branches from the menu in header and then corresponding Categories and Subcategories are shown.

User can select Location and Branch from the top menu. The Items in the menu are fetched from catalog.json which is in code.

Both the columns items are tappable which means if I tap on ILLINOIS(name of a location) it should show ALL categories in ILLINOIS.
Also user can select Location and then branch which in turn will show categories in that branch.

When a user clicks on location or branch he will redirected to category list screen.
And when a user clicks on any of category will redirect to subcategory screen where all the subcategories of a particular category is listed out with its image and name.

In category and subcategory listing there is a breadcrumb managed in a way of Location / Branch / Category as :
   If a user clicks on any location or branch then he will see all the categories and then can to subcatgories and when he will be at subcategory page, he will see bread crum as : Location / Branch / Category. He can click on location and branch both.
