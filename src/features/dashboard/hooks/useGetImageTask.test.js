import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGetImageTask } from "./useGetImageTask";

describe("useGetImageTask", () => {
    it("abre el diálogo de selección de imágenes", () => {
        const { result } = renderHook(() => useGetImageTask());

        expect(result.current.isShowSelectTask).toBe(false);

        act(() => {
            result.current.openGetImageDialog();
        });

        expect(result.current.isShowSelectTask).toBe(true);
    });

    it("cierra el diálogo de selección de imágenes", () => {
        const { result } = renderHook(() => useGetImageTask());

        act(() => {
            result.current.openGetImageDialog();
            result.current.closeGetImageDialog();
        });

        expect(result.current.isShowSelectTask).toBe(false);
    });
});