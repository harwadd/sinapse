// components/MethodDropdown.tsx
"use client";
import Select from "react-select";
import { useTheme } from "@/contexts/ThemeContext";

export interface Method {
    method: string;
    description: string;
    layer4: boolean;
    layer7: boolean;
    amplification: boolean;
    premium: boolean;
    proxy: boolean;
}

interface MethodOption {
    value: string;
    label: string;
    premium: boolean;
}

interface MethodDropdownProps {
    methods: Method[];
    value: string;
    onChange: (value: string) => void;
}

export default function MethodDropdown({ methods, value, onChange }: MethodDropdownProps) {
    const { currentTheme } = useTheme();
    
    const options: MethodOption[] = methods.map((m) => ({
        value: m.method,
        label: `${m.method} [${m.description}]`,
        premium: m.premium,
    }));

    const groupedOptions = [
        {
            label: "Normal",
            options: options.filter((o) => !o.premium),
        },
        {
            label: "Premium",
            options: options.filter((o) => o.premium),
        },
    ];

    // Função para obter a cor de fundo baseada no tema
    const getBackgroundColor = () => {
        if (currentTheme.dashboard.cards.includes('zinc-700')) return '#3f3f46';
        if (currentTheme.dashboard.cards.includes('slate-800')) return '#1e293b';
        if (currentTheme.dashboard.cards.includes('zinc-900')) return '#18181b';
        if (currentTheme.dashboard.cards.includes('white')) return '#ffffff';
        return '#3f3f46'; // fallback
    };

    // Função para obter a cor da borda baseada no tema
    const getBorderColor = () => {
        if (currentTheme.dashboard.borders.includes('zinc-600')) return '#52525b';
        if (currentTheme.dashboard.borders.includes('slate-700')) return '#334155';
        if (currentTheme.dashboard.borders.includes('zinc-800')) return '#27272a';
        if (currentTheme.dashboard.borders.includes('zinc-200')) return '#e4e4e7';
        return '#52525b'; // fallback
    };

    // Função para obter a cor do texto baseada no tema
    const getTextColor = () => {
        if (currentTheme.dashboard.text.includes('white')) return '#ffffff';
        if (currentTheme.dashboard.text.includes('zinc-900')) return '#18181b';
        return '#ffffff'; // fallback
    };

    return (
        <Select
            options={groupedOptions}
            value={options.find((opt) => opt.value === value) || null}
            onChange={(opt) => onChange(opt?.value || "")}
            isSearchable
            placeholder="Search method..."
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    color: getTextColor(),
                }),
                singleValue: (base) => ({ ...base, color: getTextColor() }),
                input: (base) => ({ ...base, color: getTextColor() }),
                menu: (base) => ({ ...base, backgroundColor: getBackgroundColor() }),
                option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected
                        ? getBorderColor()
                        : isFocused
                            ? getBorderColor() + '80' // 50% opacity
                            : "transparent",
                    color: getTextColor(),
                }),
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: "#2563eb",
                    primary25: getBorderColor(),
                },
            })}
        />
    );
}
