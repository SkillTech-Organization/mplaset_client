export class User {
  public isAuthenticated: boolean;
  public id: number;
  public name: string;
  public fullname: string;
  public roles: string[];
  public redirectUrl: string;
  public canUseRestartButton: boolean;
  public canSetManualTPCompletion: boolean;
  public canExportUserTrackingCSV: boolean;
}
