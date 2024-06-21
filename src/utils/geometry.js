export const getDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

export const getDivArea = (width, height) => {
    return width * height;
};

export const isIntersecting = (markerPos, markerRadius, divPos, divSize) => {
    const markerCenter = { x: markerPos.x, y: markerPos.y };
    const divCenter = {
        x: divPos.left + divSize.width / 2,
        y: divPos.top + divSize.height / 2,
    };

    const distance = getDistance(markerCenter, divCenter);
    const divDiagonal = Math.sqrt(divSize.width * divSize.width + divSize.height * divSize.height) / 2;

    return distance < markerRadius + divDiagonal;
};
