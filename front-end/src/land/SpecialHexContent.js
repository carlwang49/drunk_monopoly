import React from 'react';
import Shot from '../imgs/booze-svgrepo-com.svg';
import Jail from '../imgs/prison-svgrepo-com.svg';

const SpecialHexContent = ({ q, r, x, y }) => {
    if (q === 0 && r === -6) {
        return (
            <image
                href={Jail}
                x={x - 20} // Adjust the positioning based on the size of your star SVG
                y={y - 20}
                width={40} // Adjust the size based on your preference
                height={40}
                className="jail"
            />
        );
    } else if (
        (q === 1 && r === -6) ||
        (q === -5 && r === -1) ||
        (q === -6 && r === 5) ||
        (q === -1 && r === 6) ||
        (q === 5 && r === 1) ||
        (q === 6 && r === -5)
    ) {
        return (
            <image
                href={Shot}
                x={x - 20} // Adjust the positioning based on the size of your star SVG
                y={y - 20}
                width={40} // Adjust the size based on your preference
                height={40}
                className="shot"
            />
        );
    } else if (
        (q === 6 && r === -6) ||
        (q === 3 && r === -6) ||
        (q === -6 && r === 1) ||
        (q === -6 && r === 6) ||
        (q === -3 && r === 6) ||
        (q === 6 && r === 0)
    ) {
        return (
            <text
                x={x}
                y={y}
                textAnchor="middle"
                dy=".4em"
                className="chance"
            >
                ?
            </text>
        );
    } else if (
        (q === 4 && r === -6) ||
        (q === -3 && r === 3) ||
        (q === -6 && r === 3) ||
        (q === -4 && r === 6) ||
        (q === 3 && r === 3) ||
        (q === 6 && r === -3)||
        (q === -3 && r === -3)
    ) {
        return (
            <text
                x={x}
                y={y}
                textAnchor="middle"
                dy=".4em"
                className="destiny"
            >
                !
            </text>
        );
    }

    return null;
};

export default SpecialHexContent;
