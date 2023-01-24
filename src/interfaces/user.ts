export interface IUser {
    id: string;
    email: string;
    phone: string;
    userName: string;
    slug: string;
    userCode: null;
    firstName: string;
    lastName: string;
    bio: string;
    password: string;
    avatar: string;
    institutionName: null;
    gender: string;
    ipAddress: string;
    deviceToken: null;
    isVerified: boolean;
    isActive: boolean;
    lastLoggedIn: Date;
    dob: null;
    createdAt: Date;
    updatedAt: Date;
    roleSlug: string;
    role?: [];
    token?: string;
}
