import { useState } from "react";
import { useCreatePancoco, usePancoco, useDeletePancoco, useUpdatePancoco } from "../api/pancoco.queries";

export default function PancocoPage() {
    const { data = [], isLoading, isError, error, refetch } = usePancoco();
    const createMut = useCreatePancoco();
    const updateMut = useUpdatePancoco();
    const deleteMut = useDeletePancoco();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [originalData, setOriginalData] = useState({ name: "", code: "" });

    const hasChanges = name !== originalData.name || code !== originalData.code;


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (editingId !== null) {
            await updateMut.mutateAsync({
                id: editingId,
                dto: {
                    name,
                    code
                }
            });

            setEditingId(null);

        } else {
            await createMut.mutateAsync({
                name,
                code
            });
        }

        setName("");
        setCode("");
    }

    function onEdit(c: any) {
        setEditingId(c.id);
        setName(c.name);
        setCode(c.code);

        setOriginalData({
            name: c.name,
            code: c.code,
        });
    }

    return (
        <div className="bg-slate-50">
            <header className="border-b bg-black">
                <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-white">BREADS</h1>
                    <button className="rounded-lg border px-3 py-2 text-white" onClick={() => refetch()}>
                        Reintentar/Refrescar
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">
                <form onSubmit={onSubmit} className="rounded-xl border bg-white p-4 space-y-3">
                    <p className="text-sm text-slate-600">
                        <b>Mutation (POST)</b>: crea pancoco y luego invalida cache para refrescar listado.
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre</label>
                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Code</label>
                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                            disabled={createMut.isPending || updateMut.isPending || (editingId !== null && !hasChanges)}
                        >
                            {editingId
                                ? updateMut.isPending
                                    ? "Actualizando..."
                                    : "Actualizar"
                                : createMut.isPending
                                    ? "Creando..."
                                    : "Crear"
                            }
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="rounded-lg border px-4 py-2"
                                onClick={() => {
                                    setEditingId(null);
                                    setName("");
                                    setCode("");
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>

                    {createMut.isError && (
                        <p className="text-sm text-red-600">Error creando: {String(createMut.error)}</p>
                    )}
                </form>

                <div className="rounded-xl border bg-white">
                    <div className="p-4 border-b">
                        {isLoading && <p className="text-sm text-slate-600">Cargando…</p>}
                        {isError && <p className="text-sm text-red-600">Error: {String(error)}</p>}
                        {!isLoading && !isError && (
                            <p className="text-sm text-slate-600">{data.length} registro(s)</p>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-left">
                                <tr>
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Code</th>
                                    <th className="p-3 w-40 text-center">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((c) => (
                                    <tr key={c.id} className="border-t">
                                        <td className="p-3">{c.name}</td>
                                        <td className="p-3">{c.code}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    className="rounded-md border border-black px-3 py-1 text-black hover:bg-gray-400"
                                                    onClick={() => onEdit(c)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="rounded-md border border-black px-3 py-1 text-black hover:bg-gray-400 disabled:opacity-50"
                                                    disabled={deleteMut.isPending}
                                                    onClick={() => {
                                                        if (!confirm("¿Seguro que deseas borrar este customer?")) return;
                                                        deleteMut.mutate(c.id);
                                                    }}
                                                >
                                                    Borrar
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {!isLoading && !isError && data.length === 0 && (
                                    <tr>
                                        <td className="p-6 text-center text-slate-500" colSpan={3}>
                                            No hay registros.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {deleteMut.isError && (
                        <div className="p-4">
                            <p className="text-sm text-red-600">Error borrando: {String(deleteMut.error)}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}