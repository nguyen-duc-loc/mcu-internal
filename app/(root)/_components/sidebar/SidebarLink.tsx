import { TablerIcon } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useSidebar } from "@/contexts/sidebar";
import { logout } from "@/lib/api/actions/auth";
import { cn } from "@/lib/utils";

export interface Links {
  id: string;
  label: string;
  href: string;
  icon: TablerIcon;
  iconFilled?: TablerIcon;
}

interface SidebarLinkProps {
  link: Links;
  className?: string;
  props?: LinkProps;
}

const linkClassName =
  "flex items-center justify-start group/sidebar py-3 px-4 rounded-lg";
const iconClassName = "size-5 shrink-0";
const textClassName =
  "!m-0 !ml-3 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200";

const SidebarLink = ({ link, className, ...props }: SidebarLinkProps) => {
  const { open, animate, setOpen } = useSidebar();
  const [hover, setHover] = React.useState(false);
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return link.id === "logout" ? (
    <span
      className={cn(
        linkClassName,
        "cursor-pointer",
        hover && "bg-primary/15",
        className
      )}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={async () => {
        setOpen(false);
        await logout();
      }}
    >
      {hover ? (
        <link.icon className={`${iconClassName} stroke-primary`} />
      ) : (
        <link.icon className={iconClassName} />
      )}

      <motion.div
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={textClassName}
      >
        <span
          className={`${(hover || isActive) && "font-semibold text-primary"}`}
        >
          {link.label}
        </span>
      </motion.div>
    </span>
  ) : (
    <div onClick={() => setOpen(!open)}>
      <Link
        href={link.href}
        className={cn(
          linkClassName,
          (hover || isActive) && "bg-primary/15",
          className
        )}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(false)}
        aria-label={`${link.label}`}
      >
        {hover || isActive ? (
          link.iconFilled ? (
            <link.iconFilled className={`${iconClassName} text-primary`} />
          ) : (
            <link.icon className={iconClassName} />
          )
        ) : (
          <link.icon className={iconClassName} />
        )}

        <motion.div
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className={textClassName}
        >
          <p
            className={`${(hover || isActive) && "font-semibold text-primary"}`}
          >
            {link.label}
          </p>
        </motion.div>
      </Link>
    </div>
  );
};

export default SidebarLink;
