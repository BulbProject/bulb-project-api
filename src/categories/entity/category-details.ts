export class CategoryDetails {
  public id: string;

  public version: string;

  public date: string;

  public status: 'active' | 'pending';

  public title: string;

  public description: string;

  public image?: string;
}
