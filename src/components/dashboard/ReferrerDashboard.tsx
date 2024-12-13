import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReferrerDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold lowercase">your referrals</h2>
      <Card>
        <CardHeader>
          <CardTitle className="lowercase">coming soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The referrer dashboard features are coming soon. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}