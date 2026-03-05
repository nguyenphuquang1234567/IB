"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CreditCard,
  Sparkles,
  Check,
  Zap,
  Crown,
  Building2,
  Shield,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with core features",
    features: [
      "400 IB Book (MCQ & Essay)",
      "3-Statement Sim",
      "DCF Lab",
      "Basic Valuation Labs",
      "Statement Builder",
    ],
    cta: "Current Plan",
    highlighted: false,
    icon: BookOpen,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29",
    period: "/month",
    description: "Full access for serious candidates",
    features: [
      "Everything in Free",
      "Unlimited practice sessions",
      "Advanced analytics & insights",
      "Priority support",
      "Export & offline access",
      "Mock interview simulator",
    ],
    cta: "Upgrade to Premium",
    highlighted: true,
    icon: Crown,
  },
  {
    id: "team",
    name: "Team",
    price: "Custom",
    period: "",
    description: "For universities & bootcamps",
    features: [
      "Everything in Premium",
      "Bulk seat management",
      "Admin dashboard",
      "Custom branding",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
    icon: Building2,
  },
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Settings
        </h1>
        <p className="text-sm text-finstep-brown/60 dark:text-muted-foreground mt-1">
          Manage your profile, subscription, and preferences
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted/50 p-1">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="premium" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Premium
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Pricing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your display name and view your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-2 border-finstep-orange/20">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback className="bg-finstep-orange/10 text-finstep-orange text-xl font-bold">
                      {session?.user?.name?.[0] || session?.user?.email?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="max-w-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground">
                        {session?.user?.email || "—"}
                      </p>
                    </div>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-finstep-orange hover:bg-finstep-orange/90"
                    >
                      {saving ? "Saving..." : saved ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="border-finstep-orange/30 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Upgrade to Premium</CardTitle>
                    <CardDescription>
                      Unlock the full finstep.app experience
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Unlimited practice sessions",
                    "Advanced analytics & insights",
                    "Priority support",
                    "Export & offline access",
                    "Mock interview simulator",
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-finstep-orange/20 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-finstep-orange" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-finstep-orange hover:bg-finstep-orange/90"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade for $29/month
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setActiveTab("pricing")}>
                    View full pricing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Card
                  className={cn(
                    "h-full flex flex-col",
                    plan.highlighted && "border-finstep-orange shadow-lg shadow-finstep-orange/10"
                  )}
                >
                  {plan.highlighted && (
                    <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-lg" />
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <plan.icon className={cn(
                        "w-8 h-8",
                        plan.highlighted ? "text-finstep-orange" : "text-muted-foreground"
                      )} />
                      {plan.highlighted && (
                        <Badge className="bg-finstep-orange">Popular</Badge>
                      )}
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-2">
                      <span className="text-3xl font-varela font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "mt-6 w-full",
                        plan.highlighted
                          ? "bg-finstep-orange hover:bg-finstep-orange/90"
                          : plan.id === "free"
                            ? "bg-muted"
                            : ""
                      )}
                      variant={plan.id === "free" ? "secondary" : "default"}
                      disabled={plan.id === "free"}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <Card className="border-border/40">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="w-5 h-5" />
                <span>
                  Secure payment via Stripe. Cancel anytime. 7-day money-back guarantee.
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
