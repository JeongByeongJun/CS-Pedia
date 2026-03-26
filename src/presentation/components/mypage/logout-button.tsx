"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";

interface LogoutButtonProps {
  isKorean?: boolean;
}

export function LogoutButton({ isKorean = true }: LogoutButtonProps) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          fontSize: "13px",
          fontWeight: 500,
          borderRadius: "10px",
          border: "1px solid rgba(0,0,0,0.08)",
          background: "white",
          color: "#71717a",
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        className="logout-btn-hover"
      >
        <LogOut style={{ width: "14px", height: "14px" }} />
        {isKorean ? "로그아웃" : "Log out"}
      </button>
    </form>
  );
}
