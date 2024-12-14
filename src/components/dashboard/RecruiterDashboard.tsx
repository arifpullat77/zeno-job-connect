import { SubscriptionCheck } from "./SubscriptionCheck";
import { DashboardTabs } from "./DashboardTabs";
import { RealtimeUpdates } from "./RealtimeUpdates";

export function RecruiterDashboard() {
  return (
    <div className="space-y-8">
      <RealtimeUpdates />
      <SubscriptionCheck>
        <DashboardTabs />
      </SubscriptionCheck>
    </div>
  );
}