import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pancocoApi, type CreatePancocoDto, type UpdatePancocoDto } from "./pancoco";
const keys = {
    all: ["pancoco"] as const,
};
export function usePancoco() {
    return useQuery({
        queryKey: keys.all,
        queryFn: pancocoApi.list,
    });
}
export function useCreatePancoco() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreatePancocoDto) => pancocoApi.create(dto),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}
export function useUpdatePancoco() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdatePancocoDto }) =>
            pancocoApi.update(id, dto),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}
export function useDeletePancoco() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => pancocoApi.remove(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}