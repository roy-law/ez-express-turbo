export enum OrderPriority {
  H = "H",
  M = "M",
  L = "L",
}

export enum OrderType {
  D = "D",
  T = "T",
  P = "P",
}

export enum NotificationPreference {
  Both = "both",
  SMS = "sms",
  Email = "email",
  Off = "off",
}

export enum CreateOrderOperation {
  Create = "CREATE",
  Sync = "SYNC",
  Update = "UPDATE",
  Merge = "MERGE",
}

/**
 * 
Example 
{
    "orderNo": "EZ1700078855792",
    "operation": "CREATE",
    "date": "2023-11-19",
    "duration": 15,
    "priority": "M",
    "type": "D",
    "assignedTo": {"serial": "001"},
    "location": {
        "address": "4486 RADISSON CRESENT, Mississauga, L5M 4C7",
        "acceptPartialMatch": true,
        "locationName": "Balala"
    },
    "timeWindows": [{
        "twFrom": "18:30",
        "twTo": "23:59"
    }],
    "notes": "Just some notes",
    "email": "ezexpress.canada@gmail.com",
    "phone": "(416) 558-7727",
    "customField1": "1",
    "customField2": "North York",
    "notificationPreference": "both"
    }

 */
export type OptimoRouteOrder = {
  orderNo: string; // parcel's id from mongodb
  operation: CreateOrderOperation;
  date: string; // 2023-11-25
  duration: number;
  priority: OrderPriority;
  type: OrderType;
  assignedTo: {
    serial: string;
  };
  location: {
    address: string;
    acceptPartialMatch: boolean;
    locationName: string; // company's name
    longtitude?: number;
    latitude?: number;
  };
  timeWindows: {
    twFrom: string;
    twTo: string;
  }[];
  notes: string;
  email?: string;
  phone: string;
  customField1: string;
  customField2: string;
  notificationPreference: NotificationPreference;
};
