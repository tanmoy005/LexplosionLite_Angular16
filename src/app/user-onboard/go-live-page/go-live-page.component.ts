import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as GoliveInterFaces from 'src/app/shared/menu-items/go-live-inerfaces';
import { LawsTableData } from '../common-components/laws-table/laws-table.component';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const WORKSAPCE_DATA: GoliveInterFaces.WorkSpaceDetails[] = [];
export interface WorkspaceDetails {
  serialNumber: number;
  workSpaceName: string;
  adminName: string;
}
interface EntityLawCount {
  id: number;
  noOfLaws: number;
}

function summarizeLaws(data: ApplicableLaws[]): EntityLawCount[] {
  const entityLawMap: { [key: number]: number } = {};

  data.forEach((item) => {
    const entityId = item.entity.id;

    if (!entityLawMap[entityId]) {
      entityLawMap[entityId] = 0;
    }

    entityLawMap[entityId]++;
  });

  return Object.keys(entityLawMap).map((key) => ({
    id: +key,
    noOfLaws: entityLawMap[+key],
  }));
}

interface Entity {
  id: number;
  name: string;
}

interface Law {
  id: number;
  name: string;
}

interface OperatingUnit {
  id: number;
  name: string;
}

interface RestructuredData {
  entity: Entity;
  komriskLaws: Law[];
  lawApplicability: number[];
  operatingUnit: OperatingUnit;
}

function groupByEntity(data: any[]): any[] {
  const entityMap = new Map<number, any[]>();

  data.forEach((item) => {
    const entityId = item.entity.id;

    const filteredItem = {
      entity: item.entity,
      komriskLaws: item.komriskLaws,
      lawApplicability: item.lawApplicability,
      operatingUnit: item.operatingUnit,
    };

    if (!entityMap.has(entityId)) {
      entityMap.set(entityId, []);
    }

    entityMap.get(entityId)?.push(filteredItem);
  });

  return Array.from(entityMap.values());
}

interface Law {
  entity: {
    id: number;
    name: string;
  };
  komriskLaws: {
    id: number;
    name: string;
  }[];
  lawApplicability: number;
  operatingUnit: {
    id: number;
    name: string;
  };
}

function processLaws(
  inputLaws: any[],
  companyId: number
): {
  appLaws: any[];
  companyId: number;
  entity: number;
  operatingUnit: number[];
} {
  const appLaws: any[] = [];

  inputLaws.forEach((item) => {
    const lawObject = {
      entity: {
        id: item.entity.id,
        name: item.entity.name,
      },
      komriskLaws: item.komriskLaws,
      lawApplicability: [item.lawApplicability],
      operatingUnit: {
        id: item.operatingUnit.id,
        name: item.operatingUnit.name,
      },
    };

    appLaws.push(lawObject);
  });

  // Extract the entity from the first item (assuming all entities are the same)
  const entity = inputLaws.length > 0 ? inputLaws[0].entity.id : null;

  // Use a Set to get unique operating unit ids
  const operatingUnitIds = Array.from(
    new Set(inputLaws.map((item) => item.operatingUnit.id))
  );

  return {
    appLaws: appLaws,
    companyId: companyId,
    entity: entity,
    operatingUnit: operatingUnitIds,
  };
}

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}

function getFirstName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userFirstName = user.firstName;

  return userFirstName;
}
function getLastName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userLastName = user.lastName;

  return userLastName;
}
function getEmail() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userEmail = user.email;

  return userEmail;
}

function getCompanyName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyName =
    userCompanies.length > 0 ? userCompanies[0]['name'] : '';
  return userCompanyName;
}

@Component({
  selector: 'app-go-live-page',
  templateUrl: './go-live-page.component.html',
  styleUrls: ['./go-live-page.component.scss'],
})
export class GoLivePageComponent {
  paymentMode: any = 'online';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {
    const data = this.router.getCurrentNavigation()?.extras.state;

    this.paymentMode = data?.['mode'];
  }

  screenWidth: number;
  workSpaceColumns = ['serialNumber', 'workSpaceName', 'adminName'];
  dataSource: WorkspaceDetails[] = [];
  showWorkspaceSetupMessage: boolean = false;
  workspaceSetupMessage: string = '';

  getCardSize(defaultHeight: number | string, defaultWidth: string | number) {
    if (this.screenWidth <= 1280) {
      return { height: '100%', width: '100%' };
    } else {
      return { height: defaultHeight, width: defaultWidth };
    }
  }
  ApplicableLawsItems: ApplicableLaws[] = [];
  LawSummary: any = [];
  isLoading: boolean = false;

  fetchLawsList() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    this.isLoading = true;
    const payload = {
      company: getCompanyId(),
    };

    try {
      this.apiService.postApplicableLaws(payload).subscribe((response) => {
        if (response) {
          this.ApplicableLawsItems = response.data;

          const summary = groupByEntity(response.data);

          this.LawSummary = summary;

          const processedSummaries = summary.map((item) =>
            processLaws(item, getCompanyId())
          );

          const apiCalls = processedSummaries.map((summaryItem) =>
            this.apiService.postSaveLawsList(summaryItem).pipe(
              catchError((error) => {
                this.isLoading = false;
                this.snackbar.showError('An error occurred while saving laws');

                return throwError(() => error);
              })
            )
          );

          forkJoin(apiCalls).subscribe(
            (apiResponses) => {
              const adminPayload = {
                domainName: 'lexplosionlogictic22.com',
                companyName: getCompanyName(),
                engineCompanyId: getCompanyId(),
                userFirstName: getFirstName(),
                userLastName: getLastName(),
                userEmail: getEmail(),
              };

              this.apiService.postCreateWorkSpace(adminPayload).subscribe(
                (adminResponse) => {
                  this.isLoading = false;
                  if (adminResponse.success === true) {
                    this.snackbar.showSuccess('Workspace Created Successfully');
                    this.handleSuccessfulWorkspaceCreation();
                  }
                },
                (error) => {
                  this.isLoading = false;
                }
              );
            },
            (error) => {
              this.isLoading = false;
            }
          );
        }
      });
    } catch (e) {
      this.isLoading = false;
      this.snackbar.showError('Some error occurred while fetching Laws');
    }
  }

  ngOnInit() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const loginDetails = encryptStorage.getItem('login-details');

    if (loginDetails) {
      if ('isPublished' in loginDetails) {
        if (loginDetails.isPublished) {
          this.dataSource = [
            {
              serialNumber: 1,
              workSpaceName: getCompanyName(),
              adminName: getFirstName() + ' ' + getLastName(),
            },
          ];
        } else {
          this.dataSource = [];
          this.showWorkspaceSetupMessage = true;
          this.workspaceSetupMessage = `Your workspace is being set up. You will receive an email with the
details shortly.`;
        }
      } else {
        this.dataSource = [];
        this.showWorkspaceSetupMessage = true;
        this.workspaceSetupMessage = 'No Data Available.';
      }
    } else {
      this.dataSource = [];
      this.showWorkspaceSetupMessage = true;
      this.workspaceSetupMessage = 'No Data Available.';
    }
  }

  goToSubscription() {
    this.router.navigate(['/payment']);
  }
  navigateToPaymentPage() {
    this.router.navigate(['/payment']);
  }
  handleCreateWorkspece() {
    this.fetchLawsList();
  }
  handleSuccessfulWorkspaceCreation() {
    this.dataSource = [];
    this.showWorkspaceSetupMessage = true;
    this.workspaceSetupMessage = `Your workspace is being set up. You will receive an email with the
details shortly.`;
  }
  handleGotoWorkSpace(): void {
    const url = 'https://lexplosionlogictic22.com/';
    window.open(url, '_blank');
  }
}
