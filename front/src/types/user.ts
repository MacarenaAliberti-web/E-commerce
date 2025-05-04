export interface RegisterUserType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: string;
}

export interface FormDataLoginType {
    email: string;
    password: string;
};