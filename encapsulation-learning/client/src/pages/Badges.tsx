import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { BADGES } from "@shared/badges";

export default function BadgesPage() {
  const { data: myBadges, isLoading } = trpc.badges.getMyBadges.useQuery();
  
  const earnedBadgeIds = myBadges?.map((b: any) => b.badgeId) || [];
  const allBadges = Object.values(BADGES);
  
  // Group badges by category
  const badgesByCategory = allBadges.reduce((acc: any, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {});

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400 bg-gray-50';
      case 'rare':
        return 'border-blue-400 bg-blue-50';
      case 'epic':
        return 'border-purple-400 bg-purple-50';
      case 'legendary':
        return 'border-yellow-400 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">Common</span>;
      case 'rare':
        return <span className="text-xs px-2 py-1 bg-blue-200 text-blue-700 rounded-full">Rare</span>;
      case 'epic':
        return <span className="text-xs px-2 py-1 bg-purple-200 text-purple-700 rounded-full">Epic</span>;
      case 'legendary':
        return <span className="text-xs px-2 py-1 bg-yellow-200 text-yellow-700 rounded-full">Legendary</span>;
      default:
        return null;
    }
  };

  const categoryNames: Record<string, string> = {
    milestone: 'Milestone Achievements',
    mastery: 'Mastery Badges',
    streak: 'Streak Rewards',
    special: 'Special Honors',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-blue-500/10">
        <div className="container py-12">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="w-12 h-12 text-yellow-500" />
            <div>
              <h1 className="text-4xl font-bold">Achievement Badges</h1>
              <p className="text-lg text-muted-foreground">
                Earn badges by completing challenges and mastering concepts
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="px-4 py-2 bg-background/80 rounded-lg">
              <div className="text-2xl font-bold">{earnedBadgeIds.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="px-4 py-2 bg-background/80 rounded-lg">
              <div className="text-2xl font-bold">{allBadges.length - earnedBadgeIds.length}</div>
              <div className="text-sm text-muted-foreground">Badges Remaining</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-6xl">
        {Object.entries(badgesByCategory).map(([category, badges]: [string, any]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{categoryNames[category] || category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge: any) => {
                const isEarned = earnedBadgeIds.includes(badge.id);
                const earnedBadge = myBadges?.find((b: any) => b.badgeId === badge.id);
                
                return (
                  <Card
                    key={badge.id}
                    className={`relative overflow-hidden transition-all ${
                      isEarned 
                        ? `border-2 ${getRarityColor(badge.rarity)} shadow-lg` 
                        : 'opacity-60 grayscale'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-5xl">{isEarned ? badge.icon : '🔒'}</div>
                        {getRarityBadge(badge.rarity)}
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        {badge.name}
                        {!isEarned && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    {isEarned && earnedBadge && (
                      <CardContent>
                        <div className="text-xs text-muted-foreground">
                          Earned on {new Date(earnedBadge.earnedAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
