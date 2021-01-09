import React, { useEffect, useRef } from 'react'

function ClickHandler(ref, outsideHandler) {
    useEffect(() => {

        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                outsideHandler();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [ref]);
}


const OutsideAlerter = ({ outsideHandler, component }) => {
    const wrapperRef = useRef(null);
    ClickHandler(wrapperRef, outsideHandler);
    return (
        <div ref={wrapperRef}>{component}</div>
    )
}

export default OutsideAlerter
