import axios from "axios";
import { OptimoRouteOrder } from "./OptimoRouteApi/types";

export class OptimoRouteApi {
  async syncOrder(order: Omit<OptimoRouteOrder, "operation">) {
    const res = await axios.post(
      `https://api.optimoroute.com/v1/create_order?key=${process.env.OPTIMOROUTE_API_KEY}`,
      {
        ...order,
        operation: "SYNC",
      }
    );

    return res;
  }

  async deleteOrder(orderNo: string) {
    const res = await axios.post(
      `https://api.optimoroute.com/v1/delete_order?key=${process.env.OPTIMOROUTE_API_KEY}`,
      {
        orderNo,
      }
    );

    return res;
  }

  async getOrdersCompletion(orders: Pick<OptimoRouteOrder, "orderNo">[]) {
    const res = await axios.post(
      `https://api.optimoroute.com/v1/get_completion_details?key=${process.env.OPTIMOROUTE_API_KEY}`,
      {
        orders,
      }
    );

    return res;
  }

  async updateOrdersCompletion(orders: Pick<OptimoRouteOrder, "orderNo">[]) {
    const res = await axios.post(
      `https://api.optimoroute.com/v1/update_completion_details?key=${process.env.OPTIMOROUTE_API_KEY}`,
      {
        orders,
      }
    );

    return res;
  }
}

export const optimoRouteClient = new OptimoRouteApi();
