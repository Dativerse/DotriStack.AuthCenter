import React, { useState, useRef, useEffect } from "react";
import { LogIn, UserPlus, Shield, FileText, Key, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

// Type definitions
interface Position {
  x: number;
  y: number;
}

interface MenuItemState {
  isAuthenticated?: boolean;
  isNewUser?: boolean;
  requiresEmail?: boolean;
  isVerificationRequired?: boolean;
  isRequired?: boolean;
  timestamp?: number;
  token?: string;
  otpExpiryTime?: number;
  otpType?: "email" | "phone" | "2fa";
  otpLength?: number;
  otpAttempts?: number;
  email?: string;
  otp?: string;
}

interface MenuItem<T extends MenuItemState = MenuItemState> {
  icon: React.ReactNode;
  label: string;
  id: string;
  path: string;
  state?: T;
}

const FloatingRadialMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 200, y: 200 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get current active page from route
  const currentPath = location.pathname;
  const activePage = currentPath === "/" ? "home" : currentPath.slice(1);

  useEffect(() => {
    // Retrieve saved position from localStorage if available
    const savedPosition = localStorage.getItem("menuPosition");
    if (savedPosition) {
      try {
        const parsedPosition = JSON.parse(savedPosition);
        setPosition(parsedPosition);
      } catch (error) {
        console.error("Failed to parse saved menu position");
        console.error(error instanceof Error ? error.message : "Unknown error");
      }
    }
  }, []);

  const toggleMenu = (): void => {
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  };

  const navigateTo = (path: string, state?: MenuItemState): void => {
    navigate(path, { state });
    setIsOpen(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      };

      setPosition(newPosition);

      // Save position to localStorage for persistence
      localStorage.setItem("menuPosition", JSON.stringify(newPosition));

      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  const handleMouseUp = (): void => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>): void => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const touch = e.touches[0];

      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });

      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (isDragging) {
      const touch = e.touches[0];
      const newPosition = {
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      };

      setPosition(newPosition);
      localStorage.setItem("menuPosition", JSON.stringify(newPosition));

      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  const handleTouchEnd = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const menuItems: MenuItem[] = [
    {
      icon: <LogIn size={20} />,
      label: "Login",
      id: "login",
      path: "/login",
      state: { isAuthenticated: false },
    },
    {
      icon: <UserPlus size={20} />,
      label: "Register",
      id: "register",
      path: "/register",
      state: { isNewUser: true },
    },
    {
      icon: <Key size={20} />,
      label: "Reset Password",
      id: "reset-password",
      path: "/reset-password",
      state: {
        requiresEmail: true,
        timestamp: Date.now(),
        otp: "Dummy Otp",
        email: "DummyEmail@gmail.com",
      },
    },
    {
      icon: <Shield size={20} />,
      label: "OTP",
      id: "otp",
      path: "/otp",
      state: {
        isVerificationRequired: true,
        otpType: "email",
        otpLength: 6,
        otpExpiryTime: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
        otpAttempts: 0,
      },
    },
    {
      icon: <FileText size={20} />,
      label: "Terms",
      id: "terms",
      path: "/terms-and-conditions",
      state: { isRequired: true },
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Main button */}
      <Button
        size="icon"
        className="h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={toggleMenu}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        title="Click to open menu, drag to move"
      >
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </Button>

      {/* Menu items */}
      <div className="relative">
        {menuItems.map((item, index) => {
          // Position in a circle
          const angle = (index * (2 * Math.PI)) / menuItems.length;
          const radius = 90;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          // Calculate delay for staggered animation
          const delay = index * 0.05;

          // Check if this menu item is active
          const isActive = item.id === activePage;

          return (
            <div
              key={item.id}
              className={`absolute top-1/2 left-1/2 transition-all duration-300 ${
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0 pointer-events-none"
              }`}
              style={{
                transitionDelay: isOpen ? `${delay}s` : "0s",
                transform: isOpen
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                  : "translate(-50%, -50%) scale(0)",
                zIndex: 50 - index,
              }}
            >
              <Button
                size="icon"
                variant={isActive ? "default" : "secondary"}
                className="h-12 w-12 rounded-full group relative shadow-md"
                onClick={() => navigateTo(item.path, item.state)}
                aria-label={item.label}
              >
                {item.icon}
                <span className="absolute whitespace-nowrap px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingRadialMenu;
