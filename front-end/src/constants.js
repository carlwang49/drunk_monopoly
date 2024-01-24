// The path sequence defined as an array of q, r coordinates
export const HEX_PATH = [
    // Start at the top left and move down the leftmost column
    {q: -6, r:  0}, {q: -6, r:  1}, {q: -6, r:  2}, {q: -6, r:  3}, 
    {q: -6, r:  4}, {q: -6, r:  5}, {q: -6, r:  6},
    
    // Move inwards along the bottom rows
    {q: -5, r:  6}, {q: -4, r:  6}, {q: -3, r:  6}, {q: -2, r:  6}, 
    {q: -1, r:  6}, {q:  0, r:  6},
    
    // Move up the rightmost column
    {q:  1, r:  5}, {q:  2, r:  4}, {q:  3, r:  3}, {q:  4, r:  2}, 
    {q:  5, r:  1}, {q:  6, r:  0},
    
    // Move back along the top rows
    {q:  6, r: -1}, {q:  6, r: -2}, {q:  6, r: -3}, {q:  6, r: -4}, 
    {q:  6, r: -5}, {q:  6, r: -6},
    
    // Fill in the remaining left side
    {q:  5, r: -6}, {q:  4, r: -6}, {q:  3, r: -6}, {q:  2, r: -6}, 
    {q:  1, r: -6}, {q:  0, r: -6}, 
    
    // Fill in the bottom left corner
    {q: -1, r: -5}, {q: -2, r: -4}, {q: -3, r: -3}, {q: -4, r: -2}, 
    {q: -5, r: -1}
  ];