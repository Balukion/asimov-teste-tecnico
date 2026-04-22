import clsx from "clsx";

type ButtonVariant = "primary" | "outline";

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "default" | "sm";
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-block rounded-btn px-btn-x font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-dark text-white hover:opacity-90",
  outline: "border border-dark bg-transparent hover:bg-dark hover:text-white",
};

const sizes = {
  default: "text-[20px] py-5",
  sm: "text-[18px] py-[18px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className,
  href,
  ...rest
}: ButtonProps) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
