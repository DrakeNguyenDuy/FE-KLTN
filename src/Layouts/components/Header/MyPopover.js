import React, { useState } from 'react';
import { Popover, Button } from 'react-bootstrap';

function MyPopover() {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => setShowPopover(!showPopover);

    return (
        <div onBlur={() => setShowPopover(false)}>
            <Button onClick={togglePopover}>Mở Popover</Button>
            <Popover show={showPopover} onHide={() => setShowPopover(false)}>
                <Popover.Header>
                    <Popover.Title>Popover Title</Popover.Title>
                </Popover.Header>
                <Popover.Body>This is the content of the Popover.</Popover.Body>
            </Popover>
        </div>
    );
}

export default MyPopover;
