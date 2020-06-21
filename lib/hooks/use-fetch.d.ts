declare type InitialParams = {
    [key: string]: any;
};
export declare const useFetch: <T>(initialUrl: string, initialParams?: InitialParams, skip?: boolean) => {
    data: T | undefined;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string;
    updateUrl: import("react").Dispatch<import("react").SetStateAction<string>>;
    updateParams: import("react").Dispatch<import("react").SetStateAction<InitialParams>>;
    refetch: () => void;
};
export {};
