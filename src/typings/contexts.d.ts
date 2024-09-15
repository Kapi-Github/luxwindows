interface GlobalContextDef {
    defaultLanguage: Language;
    setDefaultLanguage: React.Dispatch<SetStateAction<Language>>;
    data: any;
    moveToPage: (key: string) => void;
}

interface MenuContextDef {
    setOpen: (value: Tab | null, key: string) => void;
    setClose: (key?: string) => void;
    handleListElementClick: (key: string) => void;
    openedTabs: TabOpened;
    setOpenedTabs: React.Dispatch<SetStateAction<TabOpened>>;
}
