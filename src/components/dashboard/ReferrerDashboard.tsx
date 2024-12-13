import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Users, DollarSign } from "lucide-react";

// Mock data for shared jobs
const MOCK_SHARED_JOBS = [
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp",
    linkClicks: 45,
    applicants: 8,
    referralBonus: 5000,
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    company: "InnovateCo",
    linkClicks: 32,
    applicants: 5,
    referralBonus: 4000,
  },
];

// Mock data for referrals
const MOCK_REFERRALS = [
  {
    id: "1",
    name: "John Smith",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp",
    status: "interviewing",
    resumeUrl: "/resumes/john-smith.pdf",
    appliedDate: "2024-02-20",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    jobTitle: "Product Manager",
    company: "InnovateCo",
    status: "hired",
    resumeUrl: "/resumes/sarah-johnson.pdf",
    appliedDate: "2024-02-18",
  },
  {
    id: "3",
    name: "Michael Brown",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp",
    status: "applied",
    resumeUrl: "/resumes/michael-brown.pdf",
    appliedDate: "2024-02-22",
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "hired":
      return "bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20";
    case "interviewing":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
  }
};

export function ReferrerDashboard() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="shared-jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="shared-jobs" className="lowercase">shared jobs</TabsTrigger>
          <TabsTrigger value="referrals" className="lowercase">referrals</TabsTrigger>
          <TabsTrigger value="earnings" className="lowercase">earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="shared-jobs">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold lowercase">shared jobs tracking</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>job title</TableHead>
                    <TableHead>company</TableHead>
                    <TableHead>link clicks</TableHead>
                    <TableHead>applicants</TableHead>
                    <TableHead>referral bonus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_SHARED_JOBS.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.jobTitle}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4 text-gray-500" />
                          {job.linkClicks}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          {job.applicants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-[#10b981]" />
                          {job.referralBonus}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold lowercase">referral status monitoring</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>name</TableHead>
                    <TableHead>job title</TableHead>
                    <TableHead>company</TableHead>
                    <TableHead>applied date</TableHead>
                    <TableHead>status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_REFERRALS.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>{referral.name}</TableCell>
                      <TableCell>{referral.jobTitle}</TableCell>
                      <TableCell>{referral.company}</TableCell>
                      <TableCell>{new Date(referral.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(referral.status)}>
                          {referral.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="earnings">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold lowercase">earnings overview</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium lowercase">total earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-[#10b981]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$9,000</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium lowercase">pending earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,500</div>
                  <p className="text-xs text-muted-foreground">From 3 pending referrals</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium lowercase">successful referrals</CardTitle>
                  <Users className="h-4 w-4 text-[#10b981]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Total hired candidates</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}