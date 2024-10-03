interface Language {
    name: string;
    source: string;
}

interface Tab {
    name: string;
    key: string;
    subtabs: Tab[];
}

interface TabOpened {
    name: string | null;
    first: string | null;
    second: string | null;
    third: string | null;
}

interface Route {
    name: string;
    element?: string;
    key: string;
}
