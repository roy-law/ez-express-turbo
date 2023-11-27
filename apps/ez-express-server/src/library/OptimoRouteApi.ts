import axios from "axios"
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

type Order = {
  orderNo: string; // parcel's id from mongodb
  operation: "CREATE" | "SYNC" | "UPDATE" | "MERGE";
  date: string; // 2023-11-25
  duration: number;
  priority: "H" | "M" | "L";
  type: "D" | "T" | "P";
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
  notificationPreference: "both" | "sms" | "email" | "off";
};

export class OptimoRouteApi {
  async syncOrder(order: Omit<Order, "operation">) {
    const res = await axios.post(`https://api.optimoroute.com/v1/create_order?key=${process.env.OPTIMOROUTE_API_KEY}`, {
        ...order,
        operation: "SYNC"
    })

    return res
  }

  async deleteOrder(orderNo: string) {
    const res = await axios.post(`https://api.optimoroute.com/v1/delete_order?key=${process.env.OPTIMOROUTE_API_KEY}`, {
        orderNo
    })

    return res
  }

  async getOrdersCompletion(orders: Pick<Order, 'orderNo'>[]) {
    const res = await axios.post(`https://api.optimoroute.com/v1/get_completion_details?key=${process.env.OPTIMOROUTE_API_KEY}`, {
        orders
    })

    return res
  }

   async updateOrdersCompletion(orders: Pick<Order, 'orderNo'>[]) {
    const res = await axios.post(`https://api.optimoroute.com/v1/update_completion_details?key=${process.env.OPTIMOROUTE_API_KEY}`, {
        orders
    })

    return res
  }
}

export const optimoRouteClient = new OptimoRouteApi();
