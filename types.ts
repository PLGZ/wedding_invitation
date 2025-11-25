export interface RsvpFormData {
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isAttending: string; // 'yes' | 'no'
  needsElectronicInvite: string; // 'yes' | 'no'
  adultCount: number;
  childCount: number;
  needsHighChair: boolean;
  isVegetarian: boolean;
  notes: string;
}

export const RELATIONSHIP_OPTIONS = [
  "男方親友 (Groom's Friend/Family)",
  "女方親友 (Bride's Friend/Family)",
  "共同好友 (Common Friend)",
  "同事 (Colleague)",
  "其他 (Other)"
];