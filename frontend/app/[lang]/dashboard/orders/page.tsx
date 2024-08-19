import VerticalLayout from "../../layout/vertical";
import DashboardOrdersPage from "@/components/modules/Dashboard/pages/Orders";

export default async function DashboardOrders() {
  return (
    <VerticalLayout>
      <DashboardOrdersPage />
    </VerticalLayout>
  )
}