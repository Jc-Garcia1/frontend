import { http } from "./http";
export type Pancoco = {
    id: number;
    name: string;
    code: string;
    isActive: boolean;
    createdAt: string;
};

export type CreatePancocoDto = {
    name: string;
    code: string;
};

export type UpdatePancocoDto = Partial<CreatePancocoDto>;

export const pancocoApi = {
    list: () => http<Pancoco[]>("/pancoco"),
    create: (dto: CreatePancocoDto) =>
        http<Pancoco>("/pancoco", { method: "POST", body: JSON.stringify(dto) }),

    update: (id: number, dto: UpdatePancocoDto) =>
        http<Pancoco>(`/pancoco/${id}`, {
            method: "PATCH", body: JSON.stringify(dto)
        }),

    remove: (id: number) => http<void>(`/pancoco/${id}`, { method: "DELETE" }),
};
