# SCA Technical Screening - Step 2 & 3 Notes

## Dependencies

1. NodeJS Latest CURRENT installation
2. Run command: npm install -g @angular\cli
3. Run command: npm install -g rimraf (to more quickly delete folders, specifically node_modules)

## Tech Stack & Tooling

+ Angular 6
+ Angular Material 6
+ Bootstrap 4.1
+ font-awesome
+ material-design-icons (generally used with ng-mat-2 components)
+ xlsx (for creating XSLX files from JSON)
+ file-saver (used in conjunction with xlsx to save the resulting file)

## NPM RUN COMMANDS

+ start - runs the ng-cli dev server with aot on
+ build - builds the ng-cli app with aot and build-optimizer
+ test - runs ng test

## Observations

1. I used this as a learning exercise to get up to speed on ng 6, ng-mat-6, and bootstrap 4, and made the task more difficult than it had to be given that I had to spend a fair amount of time learning, researching, and banging my head against the code at times (particularly trying to test against the HttpClient)
2. Made judgment calls on how far to take some aspects of writing this UI, and chose to hold back on how much testing I wrote -- specifically, I leaned away from integration testing the components using ng-mat

## Unit Tests

+ Could not get the Error `Error: Illegal state: Could not load the summary for directive NoticeDialogComponent.` and chose to ignore this failing test in favor of getting something done (yes, it annoys me to not have resolved this...yet)
+ Only exercised the components as opposed to the components + the views

# Web API with EF 6 Code First

The entire application is contained in the web project rather than having built out a layered architecture. The database is embedded within the application
under the App_Start folder, which makes it easier to run and test. All testing is integration testing.

The Angular `environment` variable was extended with properties to provide the URLs to the APIs, making it 
very simple to swap out the API references in the Angular applications.

Dependency injection configuration can be found under App_Start\WebApiConfig.cs._

As can be observed, the Angular CLI application is embedded within the ASP.NET Web API 2 project. To make this work, 
I added the index.html file found under the 'dist' folder to the project. 

## Running the ASP.NET Project

To run this project, make sure that the properties --> Web: Start Action: Specific Page is set to `dist/index.html`

## ASP.NET Project Tech

+ Entity Framework 6
+ Autofac
+ Web API 2

Tests were written using NUnit.
