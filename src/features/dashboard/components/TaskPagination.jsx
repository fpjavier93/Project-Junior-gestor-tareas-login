import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaskPagination({ currentPage, totalPages, hasPreviousPage, hasNextPage, onPageChange }) {

    if (totalPages <= 1) return null;

    return (
        <nav
            className="flex items-center justify-between gap-4"
            aria-label="Paginación de tareas"
        >
            <Button
                type="button"
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
            >
                <ChevronLeft />
                Anterior
            </Button>

            <p className="text-sm text-muted-foreground" aria-live="polite">
                Página {currentPage + 1} de {totalPages}
            </p>

            <Button
                type="button"
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                Siguiente
                <ChevronRight />
            </Button>
        </nav>
    );

}