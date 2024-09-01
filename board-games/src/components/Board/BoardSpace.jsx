import PropTypes from "prop-types"

/**
 * Compnent Renders A Single Space On The Board
 * - used to track the space the mouse is currently hovering over
 * - will call onMouseEnter with the space's row and col number 
 */
export default function BoardSpace({row, col, onMouseEnter=()=>{}, onClick=()=>{}, children, className=""}) {
    return (
      <div className={className} onMouseEnter={() => onMouseEnter(row, col)} onClick={() => onClick(row, col)}>
        {children}
      </div>
    );
}

BoardSpace.propTypes = {
    row: PropTypes.number.isRequired, // the row number 
    col: PropTypes.number.isRequired, // the column number 
    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func, 
    children: PropTypes.node, 
    className: PropTypes.string 
}
