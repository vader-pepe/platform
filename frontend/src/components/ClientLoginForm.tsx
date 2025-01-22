"use client";

import dynamic from "next/dynamic";

const DynamicLoginForm = dynamic(
    () => import("./LoginForm").then((mod) => mod.LoginForm),
    {
        ssr: false,
    },
);

export default function ClientLoginForm() {
    return <DynamicLoginForm />;
}
