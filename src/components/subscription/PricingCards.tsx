import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardsProps {
  onStartTrial: () => void;
  onSubscribe: (plan: 'monthly' | 'yearly') => void;
  isProcessingPayment: boolean;
}

export function PricingCards({ onStartTrial, onSubscribe, isProcessingPayment }: PricingCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:gap-8 items-start">
      {/* Free Trial Card */}
      <Card className="relative">
        <CardHeader className="text-center">
          <CardTitle>Free Trial</CardTitle>
          <CardDescription>Perfect for getting started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold">2 Months</p>
            <p className="text-sm text-muted-foreground">No credit card required</p>
          </div>
          <Button 
            onClick={onStartTrial} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Start Trial Now
          </Button>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Full access to all features</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Unlimited job postings</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Applicant tracking</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Monthly Plan Card */}
      <Card className="relative">
        <CardHeader className="text-center">
          <CardTitle>Monthly Plan</CardTitle>
          <CardDescription>Flexible month-to-month billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold">$30<span className="text-sm font-normal">/month</span></p>
            <p className="text-sm text-muted-foreground">$360 billed annually</p>
          </div>
          <Button 
            onClick={() => onSubscribe('monthly')} 
            variant="outline" 
            className="w-full"
            disabled={isProcessingPayment}
          >
            Subscribe Monthly
          </Button>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>All Free Trial features</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Advanced analytics</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Annual Plan Card */}
      <Card className="relative border-primary">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary px-3 py-1 text-xs rounded-full text-primary-foreground">
            Best Value
          </span>
        </div>
        <CardHeader className="text-center">
          <CardTitle>Annual Plan</CardTitle>
          <CardDescription>Save 50% with yearly billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold">$179<span className="text-sm font-normal">/year</span></p>
            <p className="text-sm text-muted-foreground">Save $181 compared to monthly</p>
          </div>
          <Button 
            onClick={() => onSubscribe('yearly')} 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isProcessingPayment}
          >
            Subscribe Yearly
          </Button>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>All Monthly features</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>2 months free</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Dedicated account manager</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}