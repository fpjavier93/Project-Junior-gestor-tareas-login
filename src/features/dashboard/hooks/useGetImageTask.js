import { useState } from "react";

export function useGetImageTask() {

    const [isShowSelectTask, setIsShowSelectTask] = useState(false);

    function openGetImageDialog() {

        setIsShowSelectTask(true);
    }

    function closeGetImageDialog() {

        setIsShowSelectTask(false);

    }

    return { isShowSelectTask, setIsShowSelectTask, openGetImageDialog, closeGetImageDialog }

}