import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecruiterLogin from "./pages/RecruiterLogin";
import ReferrerLogin from "./pages/ReferrerLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import ReferrerSignup from "./pages/ReferrerSignup";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/recruiter" element={<RecruiterLogin />} />
          <Route path="/login/referrer" element={<ReferrerLogin />} />
          <Route path="/signup/recruiter" element={<RecruiterSignup />} />
          <Route path="/signup/referrer" element={<ReferrerSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;