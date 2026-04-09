# Employee Management App

## Description

Employee Management App is an Angular v21 administrative interface for managing employee records and company analytics. It includes reactive forms, editable employee details, summary dashboards, charts, and a API integrations with backend powered by `json-server`.

## What is covered

- Angular 21 with Angular Material
- Header component with logo, navigation, and dummy user info
- Dashboard with D3 charts
- Employee List page with:
  - table view
  - card view
  - toggle between views
  - search/filter support
  - pagination
  - edit/delete actions
- Card flip for “View More” details
- Add Employee page with reactive form
- Reactive FormArray support for multiple addresses
- Edit employee via modal popup
- Delete confirmation dialog
- Pending changes guard for unsaved form navigation
- Loader display during fetch/process
- API service layer with `employee.service.ts`
- Mock backend using `json-server`
- Reusable shared components and clean folder structure
- Global state store with NgRx Signals
- Project documentation in `README.md`

## Tech Stack

- Angular 21.x
- Angular Material 21.x
- NgRx Store & Signals 21.x
- D3.js 7.x
- TypeScript 5.9.x
- json-server 0.17.x

## Packages Used (Manually Installed)

- `@angular/cdk` ^21.2.5
- `@angular/material` ^21.2.5
- `@ngrx/store` ^21.1.0
- `@ngrx/signals` ^21.1.0
- `d3` ^7.9.0
- `json-server` ^0.17.4
- `@types/d3` ^7.4.3

## Installation UI

1. Open a terminal in the project root.
2. Install frontend dependencies:

```bash
npm install
```

3. Start the Angular development server:

```bash
npm start
```

4. Visit `http://localhost:4200/` in your browser.

## Installation Backend

1. Change to the backend folder:

```bash
cd backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Start the mock backend server:

```bash
npm start
```

4. The mock API will run on the configured backend port.

## Project Architecture

```
src
│
└── app
    │
    ├── core
    │   ├── guards
    │   ├── pipes
    │   ├── services
    │   └── types
    │
    ├── features
    │   ├── dashboard
    │   └── employees
    │
    ├── layout
    │   ├── header
    │   └── layout-component
    │
    ├── shared
    │   ├── components
    │   └── constants
    │
    ├── store
    │   └── global
    │
    └── styles
        └── base
```

## Folder Responsibilities

- `core/`: application-wide services, route guards, global state stores, pipes, and shared core types
- `shared/`: reusable UI components, constants, and cross-feature presentation utilities
- `features/`: feature-specific pages and workflows such as dashboard and employee management
- `layout/`: shell components and top-level layout controls like header and app scaffolding
- `store/`: centralized global state management and shared application stores

## Local Build 

![Running Console Output](public/assets/build-1.png)

![Successful Build](public/assets/build-2.png)

## User Interface Preview

![Dashboard Page](public/assets/image.png)

![Dashboard Charts with labels](public/assets/image-1.png)

![Employee Listing Table](public/assets/image-2.png)

![Employee Listing Card View](public/assets/image-12.png)

![Employee Listing Flip Card ](public/assets/image-13.png)

![Employee Listing Search](public/assets/image-10.png)

![Employee Listsing Filters](public/assets/image-11.png)

![Edit Employee 1](public/assets/image-15.png)

![Edit Employee 2](public/assets/image-16.png)

![Delete Confirmation](public/assets/image-14.png)

![Add Employee 1](public/assets/image-3.png)

![Add Employee 2](public/assets/image-4.png)

![Add Employee Validation 1](public/assets/image-5.png)

![Add Employee Validation 2](public/assets/image-6.png)

![Add Employee Validation 3](public/assets/image-7.png)

![Unsaved Changes Confirmation](public/assets/image-8.png)

![Add Employee Success](public/assets/image-9.png)


## Future Improvements

- Add authentication with login/logout flows
- Implement RBAC (role-based access control)
- Replace mock backend with a real API service
- Extend state management
- Add comprehensive unit and integration tests
