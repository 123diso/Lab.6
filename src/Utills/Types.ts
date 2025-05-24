type userType = {
    id: string;
    username: string;
}

type PostType = {
    id: string;
    content: string;
    createdAt:string;
    userId: string;
}

declare interface WindowEventMap {
    'user-authenticated': CustomEvent<{
        uid: string;
        email: string | null;
    }>;
}

export type {userType,PostType, WindowEventMap}