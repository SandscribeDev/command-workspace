import { useEffect, useState } from "react";

type ThemeKey = "default" | "cryptix" | "linear" | "light";

const themes: { key: ThemeKey; label: string; dot: string }[] = [
    { key: "default", label: "Default", dot: "#4361EE" },
    { key: "cryptix", label: "Cryptix", dot: "#00E67A" },
    { key: "linear", label: "Linear", dot: "#7C6EF0" },
    { key: "light", label: "Light", dot: "#E2E8F0" },
];

export function ThemeSwitcher() {
    const [active, setActive] = useState<ThemeKey>(() => {
        return (localStorage.getItem("theme") as ThemeKey) ?? "default";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (active === "default") {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", active);
        }
        localStorage.setItem("theme", active);
    }, [active]);

    return (
        <div className="flex flex-col gap-1 px-3 py-2">
            <span className="text-label uppercase tracking-wider text-muted-foreground mb-1">Theme</span>
            <div className="flex gap-1.5">
                {themes.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setActive(t.key)}
                        title={t.label}
                        className={`flex h-6 w-6 items-center justify-center rounded-full ring-1 transition-all ${active === t.key
                                ? "ring-foreground/60 scale-110"
                                : "ring-border/40 hover:ring-foreground/30"
                            }`}
                        style={{ backgroundColor: t.dot }}
                    />
                ))}
            </div>
        </div>
    );
}
