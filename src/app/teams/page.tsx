"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { teamService } from "@/services";
import type { TeamMember } from "@/services";
import { seedTeam } from "@/lib/adminStore";
import { useSeoMeta } from "@/hooks/useSeoMeta";

// ── Group members by designation keywords ─────────────────────────────────────
function groupMembers(members: TeamMember[]): [string, TeamMember[]][] {
  const order = [
    "Management Team",
    "Project Manager Team",
    "Design Team",
    "Development Team",
    "Marketing Team",
    "Operations Team",
    "Our Team",
  ];

  const map: Record<string, TeamMember[]> = {};

  members.forEach((m) => {
    const d = m.designation.toLowerCase();
    let group = "Our Team";

    if (
      d.includes("chief") || d.includes("ceo") || d.includes("cto") ||
      d.includes("founder") || d.includes("head of")
    ) {
      group = "Management Team";
    } else if (
      d.includes("manager") || d.includes("coordinator") ||
      d.includes("vp") || d.includes("vice president") ||
      d.includes("operations") || d.includes("president")
    ) {
      group = "Project Manager Team";
    } else if (
      d.includes("design") || d.includes("creative") ||
      d.includes("interior") || d.includes("architect") ||
      d.includes("visual") || d.includes("art director")
    ) {
      group = "Design Team";
    } else if (
      d.includes("develop") || d.includes("engineer") ||
      d.includes("software") || d.includes("tech") ||
      d.includes("programmer")
    ) {
      group = "Development Team";
    } else if (
      d.includes("market") || d.includes("sales") ||
      d.includes("brand") || d.includes("communication") ||
      d.includes("media") || d.includes("digital")
    ) {
      group = "Marketing Team";
    } else if (
      d.includes("admin") || d.includes("hr") ||
      d.includes("human resources") || d.includes("finance") ||
      d.includes("account") || d.includes("executive")
    ) {
      group = "Operations Team";
    }

    if (!map[group]) map[group] = [];
    map[group].push(m);
  });

  // Return in defined order, only groups that have members
  return order
    .filter((g) => map[g]?.length)
    .map((g) => [g, map[g]]);
}

// ── Member Card ────────────────────────────────────────────────────────────────
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex flex-col items-center text-center group"
    >
      {/* Circle photo */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-full overflow-hidden border-4 border-border group-hover:border-primary/50 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-105">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Users size={30} className="text-muted-foreground/40" />
          </div>
        )}
      </div>

      <p className="text-sm font-semibold text-primary leading-snug px-1">
        {member.name}
      </p>
      <p className="text-xs text-muted-foreground mt-1 leading-snug px-1">
        {member.designation}
      </p>
    </motion.div>
  );
}

// ── Group Section ──────────────────────────────────────────────────────────────
function GroupSection({
  groupName,
  members,
  groupIndex,
}: {
  groupName: string;
  members: TeamMember[];
  groupIndex: number;
}) {
  return (
    <div>
      {/* Heading with watermark behind */}
      <div className="relative mb-10">
        {/* Watermark ghost text */}
        <span
          className="absolute -top-4 left-0 pointer-events-none select-none font-heading font-black leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            color: "hsl(var(--foreground) / 0.04)",
          }}
          aria-hidden
        >
          {groupName}
        </span>

        {/* Visible heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
          className="relative z-10"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">
            Our People
          </p>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            {groupName}
          </h3>
          <div className="mt-3 w-10 h-1 bg-primary rounded-full" />
        </motion.div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
        {members.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TeamsPage() {
  useSeoMeta("teams");
  const { data: apiTeams, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: teamService.getAllTeams,
    staleTime: 5 * 60 * 1000,
  });

  const members = (
    apiTeams && apiTeams.length > 0 ? apiTeams : seedTeam
  ) as TeamMember[];

  const groups = groupMembers(members);

  return (
    <Layout>
      {/* ── Hero / page title ── */}
      <section className="pt-28 pb-14 bg-muted/20">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Who We Are"
            title={
              <>
                Meet Our <span className="text-primary">Team</span>
              </>
            }
            description="The talented professionals behind every stunning interior. Driven by passion, guided by expertise."
          />
        </div>
      </section>

      {/* ── Team groups ── */}
      <section className="py-16 bg-background">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading team…
            </div>
          ) : groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <Users size={40} className="opacity-25" />
              <p>No team members found.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {groups.map(([groupName, groupMems], gi) => (
                <GroupSection
                  key={groupName}
                  groupName={groupName}
                  members={groupMems}
                  groupIndex={gi}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
