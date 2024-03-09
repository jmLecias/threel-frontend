import React, { useRef, useEffect } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

const HorizontalList = ({ title, children }) => {
    const listRef = useRef();
    
    const { events } = useDraggable(listRef); 

    return (
        <div className='h-list-grid'>
            <span className='h-list-text'>{title}</span>
            <div className='h-list-content' {...events} ref={listRef}>
                {children}
            </div>
        </div>
    );
}

export default HorizontalList;
